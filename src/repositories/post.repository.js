const { format } = require('path');
const Sequelize = require('sequelize');
const db = require('../configs/db.config');
const { responseHandler } = require('../helpers/handlers');
const { PostModel, PostTagModel, UserModel, CategoryModel, PostCategoryModel, AttachmentModel } = require('../models');
const axios = require('axios');

exports.createPost = async (newPost, result) => {
  let trsct;

  try {
    trsct = await db.transaction();
    //filter tags
    const tags = newPost.tags.map((e) => e.trim());
    let newTags = [];
    for (const tagName of tags) {
      if (tagName && tagName.length >= 2) {
        newTags.push({tag_name: tagName});
      }
    }
    console.log('Tags: ', newTags);
    //filter attachments
    const attachments = newPost.attachments.map((att) => 
    {
      return {
        mime_type : att.mime_type,
        attachment_path : att.attachment_path,
      }
    });
    console.log('Attachments: ', attachments);

    const primaryCat = newPost.categories.primary;
    const secondaryCats = newPost.categories.secondary;

    //create post
    const post = await PostModel.create({
      post_title: newPost.post_title,
      post_content: newPost.post_content,
      author_id: newPost.author_id,
      post_edit: newPost.post_edit,
      post_date: newPost.post_date,
      view_count: 1,
      image_path: newPost.image_path,
      type: newPost.type,
      post_tags: newTags,
      attachments: attachments,
    },
    {
      include: [
        {
          model: PostTagModel,
          attributes: ['tag_name'],
        },
        {
          model: AttachmentModel,
          attributes: ['mime_type', 'attachment_path'],
        },
      ],
    }, 
    { transaction: trsct })
    .catch((error) => {
      console.log(__errlogclr, error);
      result(responseHandler(false, 500, 'Something went wrong', null), null);
      return null;
    });
    
    if(post == null) {
      result(responseHandler(false, 500, 'Something went wrong', null), null);
      return null;
    }

    //find primary category
    const primaryCategory = await CategoryModel.findOne({
      where: {
        category_slug: primaryCat,
      },
    }, { transaction: trsct })
    .catch((error) => {
      console.log(__errlogclr, error);
      result(responseHandler(false, 500, 'Something went wrong', null), null);
      return null;
    });

    if(primaryCategory == null) {
      result(responseHandler(false, 500, 'Something went wrong', null), null);
      return null;
    }

    //link post with primary category
    await post.addCategory(
      primaryCategory,
      {
        through: {
          type: "primary",
        },
      },
      { transaction: trsct }
    ).catch((error) => {
      console.log(__errlogclr, error);
      result(responseHandler(false, 500, 'Something went wrong', null), null);
      return null;
    });

    //link post with secondary categories
    for (const secondaryCat of secondaryCats) {
      const secondaryCategory = await CategoryModel.findOne({
        where: {
          category_slug: secondaryCat,
        },
      }, { transaction: trsct })
      .catch((error) => {
        console.log(__errlogclr, error);

        result(responseHandler(false, 500, 'Something went wrong', null), null);
        return null;
      });

      if(secondaryCategory == null) {
        result(responseHandler(false, 500, 'Something went wrong', null), null);
        return null;
      }

      await post.addCategory(
        secondaryCategory,
        {
          through: {
            type: "secondary",
          },
        },
        { transaction: trsct }
      ).catch((error) => {
        console.log(__errlogclr, error);
        result(responseHandler(false, 500, 'Something went wrong', null), null);
        return null;
      });
    }
    //done successfully
    await trsct.commit();
    result(null, responseHandler(true, 200, 'Post Created', {"post_id":post.post_id}));
  } catch (error) {
    console.log(__errlogclr, error);
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
        attributes: ['user_id', 'username', 'first_name', 'last_name', 'profile_pic'],
      },
      {
        model: CategoryModel,
        attributes: ['category_name', 'category_slug'],
      },
    ],
  }).catch(err => {
    console.log(__errlogclr, err);
    result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  if(queryResult == null) {
    result(responseHandler(false, 404, 'There isn\'t any post by this id', null), null);
  }else
    queryResult = queryResult.toJSON();

  return result(null, responseHandler(true, 200, 'Success', queryResult));
}

exports.getPostsByCategory = async (slug, limit, offset, result) => {
  let queryResult = await PostModel.findAll({
    attributes: ['post_id', 'post_title', 'post_content', 'image_path', 'post_date', 'view_count'],
    distinct: true, 
    limit: limit, 
    offset: offset,
    order: [['post_date', 'DESC']],
    where: {
      type: 'public'
    },
    include: [
      {
        model: UserModel,
        attributes: ['user_id', 'first_name', 'last_name'],
      },
      {
        model: CategoryModel,
        attributes: ['category_name'],
        where: {
          category_slug: slug
        }
      },
    ]
  }).catch(err => {
    console.log(__errlogclr, err);
    result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  if(queryResult == null) 
    result(responseHandler(false, 404, 'There isn\'t any post by this category', null), null);
  else
    return result(null, responseHandler(true, 200, 'Success', queryResult));
}

exports.getVideos = async (limit, result) => {
  limit = limit || 999999;
  let queryResult = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${process.env.PRESS_YT_KEY}&key=${process.env.GOOGLE_API_KEY}&part=snippet&maxResults=${limit}`)
    .catch(err => {
      console.log(__errlogclr, err);
      result(responseHandler(false, 500, 'Something went wrong!', null), null);
    });
  if(queryResult == null)
  result(responseHandler(false, 404, 'There isn\'t any video', null), null);
  else{
    //get views for each video
    const videoIds = queryResult.data.items.map((e) => e.snippet.resourceId.videoId);

    const videoViews = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoIds.join(',')}&key=${process.env.GOOGLE_API_KEY}&part=statistics`)
      .catch(err => {
        console.log(__errlogclr, err);
        result(responseHandler(false, 500, 'Something went wrong!', null), null);
      });
    if(videoViews == null)
      result(responseHandler(false, 404, 'There isn\'t any video', null), null);
    else{
      //merge views with video data
      queryResult.data.items.forEach((e, i) => {
        e.snippet.statistics = videoViews.data.items[i].statistics;
      } );
      let res = queryResult.data.items.map((e) => 
      {
        return { 
          title: e.snippet.title,
          description: e.snippet.description,
          thumbnail: e.snippet.thumbnails.medium.url, 
          views: e.snippet.statistics.viewCount,
          url: `https://www.youtube.com/watch?v=${e.snippet.resourceId.videoId}`
        }
      })
      return result(null, responseHandler(true, 200, 'Success', res.slice(0, limit)));
    }
  }
}

exports.getLatest = async (start, limit, result) => { 
  let queryResult = await PostModel.findAll({
    attributes: ['post_id', 'post_title', 'post_content', 'image_path', 'post_date', 'view_count'],
    offset: start,
    limit: limit,
    order: [['post_date', 'DESC']],
    where: {
      type: 'public'
    },
    include: [
      {
        model: UserModel,
        attributes: ['user_id', 'first_name', 'last_name'],
      },
      {
        model: CategoryModel,
        attributes: ['category_name'],
      },
    ]
  }).catch(err => {
    console.log(__errlogclr, err);
    result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });
  if(queryResult == null) 
    result(responseHandler(false, 404, 'No posts', null), null);
  else
    return result(null, responseHandler(true, 200, 'Success', queryResult));
}

exports.getPopular = async (start, limit, result) => {
  let queryResult = await PostModel.findAll({
    attributes: ['post_id', 'post_title', 'post_content', 'image_path', 'post_date', 'view_count'],
    offset: start,
    limit: limit,
    order: [['view_count', 'DESC']],
    where: {
      type: 'public'
    },
    include: [
      {
        model: UserModel,
        attributes: ['user_id', 'first_name', 'last_name'],
      },
      {
        model: CategoryModel,
        attributes: ['category_name'],
      },
    ]
  }).catch(err => {
    console.log(__errlogclr, err);
    result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });
  if(queryResult == null) 
    result(responseHandler(false, 404, 'No posts', null), null);
  else
    return result(null, responseHandler(true, 200, 'Success', queryResult));
}

exports.getPostsByUser = async (userId, limit,fromSource=false, result) => {

  let where = {};
  console.log(fromSource);
  if(!fromSource)//if not from source, just get public posts
    where["type"] = 'public';
  where["author_id"] = userId;


  let queryResult = await PostModel.findAll({
    attributes: ['post_id', 'post_title', 'post_content', 'image_path', 'post_date', 'view_count', 'type'],
    limit: limit,
    order: [['post_date', 'DESC']],
    where: where,
    include: [
      {
        model: UserModel,
        attributes: ['user_id', 'first_name', 'last_name'],
      },
      {
        model: CategoryModel,
        attributes: ['category_name'],
      },
    ]
  }).catch(err => {
    console.log(__errlogclr, err);
    result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });
  if(queryResult == null) 
    result(responseHandler(false, 404, 'No posts', null), null);
  else
    return result(null, responseHandler(true, 200, 'Success', queryResult));
}

exports.deletePost = async (postId, result) => {
  let queryResult = await PostModel.destroy({
    where: {
      post_id: postId
    }
  }).catch(err => {
    console.log(__errlogclr, err);
    result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });
  if(queryResult == null) 
    result(responseHandler(false, 404, 'No posts', null), null);
  else
    return result(null, responseHandler(true, 200, 'Success', queryResult));
}

exports.publishPost = async (postId, isAdmin, result) => {
  let queryResult = await PostModel.update({
    type: (isAdmin?'public':'unapproved')
  }, {
    where: {
      post_id: postId
    }
  }).catch(err => {
    console.log(__errlogclr, err);
    result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });
  if(queryResult == null) 
    result(responseHandler(false, 404, 'No posts', null), null);
  else
    return result(null, responseHandler(true, 200, 'Success', queryResult));
}