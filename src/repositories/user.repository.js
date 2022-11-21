const Sequelize = require('sequelize');
const db = require('../configs/db.config');
const { responseHandler } = require('../helpers/handlers');
const { UserModel, UserTypeModel, EmailActivationModel, PostModel, Log } = require('../models');
const bcrypt = require('bcrypt');
const config = require('../configs/general.config');
const crypto = require('crypto');
const transporter = require('../configs/email.config');
const emailTemplate = require('../configs/emailTemplate');
const { generateAuthToken } = require('../utils/jwt');
const { or } = require('sequelize');

exports.retrieveOne = async (id, result) => {
  try {

    await UserModel.findOne({
      attributes: ['user_id', 'username', 'email', 'first_name', 'last_name', 'profile_pic'],
      where: {
        user_id:id,
      },
      include: [
        {
          model: UserTypeModel,
          attributes: ['type_id', 'title'],
        },
      ],
    })
      .then((data) => {
        if (!data) {
          return result(responseHandler(false, 404, 'User not found', null), null);
        }
        return result(null, responseHandler(true, 200, 'User found', data));
      })
      .catch((err) => {
        console.log(__errlogclr, err);
        return result(responseHandler(false, 500, 'Server Error', null), null);
      });
  } catch (err) {
    console.log(__errlogclr, err);
    return result(responseHandler(false, 500, 'Server Error', null), null);
  }
};

exports.retrieveAll = async (result) => {
  try {

    await UserModel.findAll({
      attributes: ['user_id', 'username', 'email', 'first_name', 'last_name', 'profile_pic', 'is_verified'],
      include: [
        {
          model: UserTypeModel,
          attributes: ['type_id'],
        },
      ],
    })
      .then((data) => {
        if (!data) {
          return result(responseHandler(false, 404, 'No users not found', null), null);
        }
        return result(null, responseHandler(true, 200, 'User found', data));
      })
      .catch((err) => {
        console.log(err);
        return result(responseHandler(false, 500, 'Server Error', null), null);
      });
  } catch (err) {
    console.log(err);
    return result(responseHandler(false, 500, 'Server Error', null), null);
  }
};

exports.register = async (user, result) => {
  let trsct;
  try {
    trsct = await db.transaction();
    //hash pwd
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const newUser = await UserModel.create({
      username: user.username,
      email: user.email,
      password: user.password,
      first_name: user.first_name,
      last_name: user.last_name,
      join_date: user.join_date,
      profile_pic: user.profile_pic,
      is_verified: false,
      type_id: 4
    }, { transaction: trsct });
    
    //email verif
    const expiresIn = new Date(Date.now() + (config.emailExpireHours *1000*60*60));
    const emailToken = crypto.randomBytes(64).toString('hex');

    await EmailActivationModel.create({
      user_id: newUser.user_id,
      email_activation_token: emailToken,
      expiration_date: expiresIn.toISOString().replace('T', ' ').substring(0, 19),
    }, { transaction: trsct }) 
    
    await transporter.sendMail({
      from: process.env.M_MAIL,
      to: user.email,
      subject: "Verify your email",
      html: emailTemplate(user.url+'/api/auth/verify/'+emailToken)
    });


    await trsct.commit();
    
    result(null, responseHandler(true, 200, 'User created', null));
  }catch(err){
    console.log(__errlogclr, err);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
    if(trsct) {
      await trsct.rollback();
    }
  }
};

exports.login = async (user, result) => {
  try {
    //check if user.username is email or username
    const isEmail = user.username.includes('@');
    const where = isEmail ? { email: user.username } : { username: user.username };
    await UserModel.findOne({
      where: where,
    })
      .then((data) => {
        if (!data) {
          return result(responseHandler(false, 404, 'User not found', null), null);
        }
        if (bcrypt.compareSync(user.password, data.password)) {
          //TODO: session management
          const token = generateAuthToken(data);

          return result(null, responseHandler(true, 200, 'User logged in', {'accessToken': token}));
        }else{
          return result(responseHandler(false, 401, 'Wrong password', null), null);
        }
      })
      .catch((err) => {
        console.log(__errlogclr, err);
        return result(responseHandler(false, 500, 'Server Error', null), null);
      });
    
  } catch (err) {
    console.log(__errlogclr, err);
    return result(responseHandler(false, 500, 'Server Error', null), null);
  }
};

exports.verifyEmail = async (token, result) => {
  try {
    const data = await EmailActivationModel.findOne({
      where: {
        email_activation_token: token,
      },
    });

    if(!data) {
      return result(responseHandler(false, 404, 'Token not found', null), null);
    }
    if(data.expiration_date < new Date()) {
      await EmailActivationModel.destroy({
        where: {
          email_activation_token: token,
        },
      });
      return result(responseHandler(false, 400, 'Token expired', null), null);
    }else{
      await UserModel.update({
        is_verified: true,
      }, {
        where: {
          user_id: data.user_id,
        },
      });
      return result(null, responseHandler(true, 200, 'User verified', null));

    }

      
  } catch (err) {
    console.log(__errlogclr, err);
    return result(responseHandler(false, 500, 'Server Error', null), null);
  }
};
  
exports.retrieveTeam = async (teamType, limit, result) => {
  try {
    let where = {};
    let userTypes = [1,2,3,4];
    if(userTypes.includes(teamType * 1)) {
      where = { 'type_id': teamType };
    }
    const users = await UserModel.findAll({
      attributes: ['user_id', 'username', 'first_name', 'last_name', 'profile_pic'],
      where: {...where},
      include: [
        {
          model: UserTypeModel,
          attributes: ['type_id', 'title'],
        },
      ],
    });

    if(!users) {
      return result(responseHandler(false, 404, 'Users not found', null), null);
    }

    //get each user's post count
    const usersWithPostCount = await Promise.all(users.map(async (user) => {
      const postCount = await PostModel.count({
        where: {
          author_id: user.dataValues.user_id,
        },
      });
      return {
        ...user.dataValues,
        post_count: postCount || 0,
      };
    })); 
    //get each user's view count
    const usersWithViewCount = await Promise.all(usersWithPostCount.map(async (user) => {
      const viewCount = await PostModel.sum('view_count', {
        where: {
          author_id: user.user_id,
        },
      });
      return {
        ...user,
        view_count: viewCount || 0,
      };
    }));
    console.log(usersWithViewCount.length);

    const sortedUsers = usersWithViewCount.sort((a, b) => {
      if(a.view_count === b.view_count) {
        return b.post_count - a.post_count;
      }
      return b.view_count - a.view_count;
      
    });
    //limit
    const limitedUsers = sortedUsers.slice(0, limit);
    return result(null, responseHandler(true, 200, 'Users found', limitedUsers));





  } catch (err) {
    console.log(__errlogclr, err);
    return result(responseHandler(false, 500, 'Server Error', null), null);
  }
}