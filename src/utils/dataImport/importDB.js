const { 
    PostModel,
    UserModel,
    AttachmentModel,
    CategoryModel,
    PostCategoryModel,
    LogModel,
    EmailActivationModel,
    PostTagModel,
    UserMetaModel,
    UserTypeModel
} = require('../../models');

const users = require('./oldDB/users.json');
const userTypes = require('./oldDB/usertypes.json');
const posts = require('./oldDB/posts.json');
const attachments = require('./oldDB/attachments.json');
const categories = require('./oldDB/categories.json');
const tags = require('./oldDB/post_tags.json');
const post_categories = require('./oldDB/post_categories.json');

// Needs to create tables first.
// Set to false then start server to create tables.
// Set to false & run again to import.
const IMPORT = false;

if(IMPORT){
    userTypes.forEach((type)=>{
        UserTypeModel.create(type);
    });

    users.forEach((user)=>{
        UserModel.create(user);
    });

    categories.forEach((cat) =>{
        CategoryModel.create(cat);
    });

    posts.forEach((post)=>{
        PostModel.create(post);
    })

    tags.forEach((tag)=>{
        PostTagModel.create(tag);
    });

    attachments.forEach((attach)=>{
        AttachmentModel.create(attach);
    });

    post_categories.forEach((post_cat)=>{
        PostCategoryModel.create(post_cat);
    });
}
