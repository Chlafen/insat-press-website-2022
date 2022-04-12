const { Post, PostModel } = require('./post.model');
const { Attachment, AttachmentModel } = require('./attachment.model');
const { Category, CategoryModel } = require('./category.model');
const { PostCategory, PostCategoryModel } = require('./postCategory.model');
const { User, UserModel } = require('./user.model');
const { Log, LogModel } = require('./log.model');
const { EmailActivation, EmailActivationModel } = require('./emailActivation.model');
const { PostTag, PostTagModel } = require('./postTag.model');
const { UserMeta, UserMetaModel } = require('./userMeta.model');
const { UserType, UserTypeModel } = require('./userType.model');

//-----------------------------------------------------------------------------
UserModel.hasMany(PostModel, 
  { foreignKey: {name: 'author_id', allowNull: false} });
PostModel.belongsTo(UserModel, 
  { foreignKey: {name: 'author_id', allowNull: false} });
//-----------------------------------------------------------------------------
UserModel.hasMany(EmailActivationModel,
  { foreignKey: {name: 'user_id', allowNull: false} });
EmailActivationModel.belongsTo(UserModel,
  { foreignKey: {name: 'user_id', allowNull: false} });
//-----------------------------------------------------------------------------
UserModel.hasMany(UserMetaModel,
  { foreignKey: {name: 'user_id', allowNull: false} });
UserMetaModel.belongsTo(UserModel,
  { foreignKey: {name: 'user_id', allowNull: false} });
//-----------------------------------------------------------------------------
UserTypeModel.hasMany(UserModel,
  { foreignKey: {name: 'type_id', allowNull: false} });
UserModel.belongsTo(UserTypeModel,
  { foreignKey: {name: 'type_id', allowNull: false} });
//-----------------------------------------------------------------------------
PostModel.hasMany(AttachmentModel,
  { foreignKey: {name: 'post_id', allowNull: false} });
AttachmentModel.belongsTo(PostModel,
  { foreignKey: {name: 'post_id', allowNull: false} });
//-----------------------------------------------------------------------------
PostModel.hasMany(PostTagModel,
  { foreignKey: {name: 'post_id', allowNull: false} });
PostTagModel.belongsTo(PostModel,
  { foreignKey: {name: 'post_id', allowNull: false} });
//-----------------------------------------------------------------------------
PostModel.belongsToMany(CategoryModel, { through: PostCategoryModel, foreignKey: { name:'post_id', allowNull:false } });
CategoryModel.belongsToMany(PostModel, { through: PostCategoryModel, foreignKey: { name:'category_id', allowNull:false } });
//-----------------------------------------------------------------------------

module.exports = {
  Post,
  User,
  Attachment,
  Category,
  PostCategory,
  Log,
  EmailActivation,
  PostTag,
  UserMeta,
  UserType,
//------------------------------------------------------------------------------
  PostModel,
  UserModel,
  AttachmentModel,
  CategoryModel,
  PostCategoryModel,
  LogModel,
  EmailActivationModel,
  PostTagModel,
  UserMetaModel,
  UserTypeModel,
};