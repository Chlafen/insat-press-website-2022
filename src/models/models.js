const Attachment = require('./attachment.model')
const Category = require('./category.model')
const EmailActivation = require('./emailActivation.model')
const Log = require('./log.model')
const Post = require('./post.model')
const PostCategory = require('./postCategory.model')
const PostTag = require('./postTag.model')
const User = require('./user.model')
const UserMeta = require('./userMeta.model')
const UserType = require('./userType.model')


UserType.sync().then(() => {
  console.log('UserType table created')
}).catch(err => console.log(err));

Log.sync().then(() => {
  console.log('Log table created')
}).catch(err => console.log(err));

Category.sync().then(() => { 
  console.log('Category table created')
}).catch(err => console.log(err));

User.hasMany(Post, {foreignKey: {
  name: 'author_id',
  allowNull: false,
  as: 'author_id'
}});

User.hasMany(UserMeta, {foreignKey: {
  name: 'user_id',
  allowNull: false,
  as: 'user_id'
  },  
  onDelete: 'cascade'
});

User.hasMany(EmailActivation, {foreignKey: {
  name: 'user_id',
  allowNull: false,
  as: 'user_id'
}});

UserType.hasMany(User, {foreignKey: {
  name: 'user_id',
  allowNull: false,
  as: 'user_id'
}});

User.sync().then(() => {
  console.log('User table created')
}).catch(err => console.log(err))

Post.hasMany(PostTag, {foreignKey: {
  name: 'post_id',
  allowNull: false,
  as: 'post_id'
  }, onDelete: 'cascade'
});

Post.hasMany(Attachment, {foreignKey: {
    name: 'post_id',
    allowNull: false ,
    as: 'post_id',
  },
  onDelete: 'CASCADE'
});

Post.belongsToMany(Category, {through: PostCategory});
Category.belongsToMany(Post, {through: PostCategory});

Post.sync().then(() => {
  console.log('Post table created')
}).catch(err => console.log(err));


Attachment.sync().then(() => {
  console.log('Attachment table created')
}).catch(err => console.log(err));

UserMeta.sync().then(() => {
  console.log('UserMeta table created')
}).catch(err => console.log(err));

EmailActivation.sync().then(() => {
  console.log('EmailActivation table created')
}).catch(err => console.log(err));

PostTag.sync().then(() => {
  console.log('PostTag table created')
}).catch(err => console.log(err));

PostCategory.sync().then(() => {
  console.log('PostCategory table created')
}).catch(err => console.log(err));

Category.sync().then(() => {
  console.log('Category table created')
}).catch(err => console.log(err));


module.exports = {
  User,
  Post,
  UserMeta,
  EmailActivation,
  PostTag,
  Attachment,
  Log,
  Category,
  // PostCategory
}


