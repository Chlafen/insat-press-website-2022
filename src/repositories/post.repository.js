const { format } = require('path');
const Sequelize = require('sequelize');
const db = require('../configs/db.config');
const { responseHandler } = require('../helpers/handlers');
const { PostModel, PostTagModel, UserModel, CategoryModel, PostCategoryModel } = require('../models');

exports.createPost = async (newPost, result) => {
  let transaction;

  try {
    transaction = await db.transaction();

    const tagNames = newPost.tags.split(',').map((e) => e.trim());
    //insert post
    const post = await PostModel.create({
      post_title: newPost.post_title,
      post_content: newPost.post_content,
      author_id: newPost.author_id,
      post_edit: newPost,
      post_date: newPost.post_date,
      view_count: 1,
      image_path: newPost.image_path,
      type: newPost.type
    })
      .catch((error) => {
        console.log(error);
        result(responseHandler(false, 500, 'Something went wrong', null), null);
        return null;
    });

    let newTags = [];
    //filter tags
    for (const tagName of tagNames) {
      if (!tagName && !tagName.length < 3) {
        newTags.push({
          post_id: post.post_id,
          tag_name: tagName
        });
      }
    }
    //insert tags
    await PostTagModel.bulkCreate(newTags)
      .catch((error) => {
        console.log(error);
        result(responseHandler(false, 500, 'Something went wrong', null), null);
        return null;
    }); 
    //insert attachments





    result(null, responseHandler(true, 200, 'Post Created', post.id));
    
    await transaction.commit();
  } catch (error) {
    console.log(error);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
    if (transaction) {
      await transaction.rollback();
    }
  }


};

exports.retrieveOne = async (postId, result) => {
  //increment view count
  await PostModel.increment('view_count', 
  { 
    by:1,
    where: { post_id: postId } 
  })
  .catch((error) => {
    console.log('error: ', error);
    return result(
      responseHandler(
        false,
        error ? error.statusCode : 404,
        error ? error.message : 'There isn\'t any post by this id',
        null,
      ),
      null,
    );
  });
  
  //retrieve post
  let queryResult = await PostModel.findOne({
    attributes: ['post_content', 'post_title', 'image_path', 'post_date', 'view_count', 'type'],
    distinct: true,
    where: {
      post_id: postId
    },
    include: [
      {
        model: PostTagModel,
        attributes: ['tag_name'],
      },
      {
        model: UserModel,
        attributes: ['username', 'first_name', 'last_name', 'profile_pic'],
      },
      {
        model: CategoryModel,
        attributes: ['category_name'],
      },
    ],
  }).catch(err => {
    console.log(err);
    result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  if(queryResult == null) {
    result(responseHandler(false, 404, 'There isn\'t any post by this id', null), null);
  }
  queryResult = queryResult.toJSON();

  return result(null, responseHandler(true, 200, 'Success', queryResult));
}
