const { format } = require('path');
const Sequelize = require('sequelize');
const db = require('../configs/db.config');
const { responseHandler } = require('../helpers/handlers');
const { PostModel, PostTagModel, UserModel, CategoryModel, PostCategoryModel, AttachmentModel } = require('../models');

exports.createPost = async (newPost, result) => {
  let trsct;

  try {
    trsct = await db.transaction();

    //insert post
    const post = await PostModel.create({
      post_title: newPost.post_title,
      post_content: newPost.post_content,
      author_id: newPost.author_id,
      post_edit: newPost.post_edit,
      post_date: newPost.post_date,
      view_count: 1,
      image_path: newPost.image_path,
      type: newPost.type
    }, { transaction: trsct })
    .catch((error) => {
      console.log(error);
      result(responseHandler(false, 500, 'Something went wrong', null), null);
      return null;
    });

    //filter tags
    const tagNames = newPost.tags.map((e) => e.trim());
    let newTags = [];
    for (const tagName of tagNames) {
      if (tagName && !tagName.length < 3) {
        newTags.push({
          post_id: post.post_id,
          tag_name: tagName
        });
      }
    }
    //insert tags
    await PostTagModel.bulkCreate(newTags, { transaction: trsct })
      .catch((error) => {
        console.log(error);
        result(responseHandler(false, 500, 'Something went wrong', null), null);
        return null;
    }); 

    // insert attachments
    const newAttachments = newPost.attachments.map((e) => 
    {
      return {
        ...e,
        post_id: post.post_id
      }
    });
    console.log(newAttachments);
    await AttachmentModel.bulkCreate(newAttachments, { transaction: trsct })
      .catch((error) => { 
        console.log(error);
        result(responseHandler(false, 500, 'Something went wrong', null), null);
        return null;
      });
    
    // add relation between post and categories
    //   -get category ids
    const slugs = newPost.categories.map((e) => e.category_slug);
    const cat_ids = await CategoryModel.findAll({
      attributes: ['category_id', 'category_slug'],
      where: {
        category_slug: {
          [Sequelize.Op.in]: slugs
        }
      },
      raw: true
    }); 

    const newPostCategories = cat_ids.map((e, i) => {
      //find corresponding type in newPost.categories
      const {type} = newPost.categories.find((e) => e.category_slug === slugs[i]);
      return {
        post_id: post.post_id,
        category_id: e.category_id,
        type: type
      }
    });

    await PostCategoryModel.bulkCreate(newPostCategories, { transaction: trsct })
      .catch((error) => {
        console.log(error);
        result(responseHandler(false, 500, 'Something went wrong', null), null);
        return null;
      });
    //done successfully
    await trsct.commit();
    result(null, responseHandler(true, 200, 'Post Created', {"post_id":post.post_id}));
  } catch (error) {
    console.log(error);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
    if (trsct) {
      await trsct.rollback();
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
  }else
    queryResult = queryResult.toJSON();

  return result(null, responseHandler(true, 200, 'Success', queryResult));
}
