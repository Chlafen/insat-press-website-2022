const Sequelize = require('sequelize');
const db = require('../configs/db.config');
const { responseHandler } = require('../helpers/handlers');
const { UserModel, UserTypeModel, EmailActivationModel } = require('../models');
const bcrypt = require('bcrypt');
const config = require('../configs/general.config');
const crypto = require('crypto');
const transporter = require('../configs/email.config');
const emailTemplate = require('../configs/emailTemplate');
const { generateAuthToken } = require('../utils/jwt');

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
        console.log(err);
        return result(responseHandler(false, 500, 'Server Error', null), null);
      });
  } catch (err) {
    console.log(err);
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
    console.log(err);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
    if(trsct) {
      await trsct.rollback();
    }
  }
};

exports.login = async (user, result) => {
  try {
    console.log(user);
    await UserModel.findOne({
      where: {
        username: user.username,
      },
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
        console.log(err);
        return result(responseHandler(false, 500, 'Server Error', null), null);
      });
    
  } catch (err) {
    console.log(err);
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
    console.log(err);
    return result(responseHandler(false, 500, 'Server Error', null), null);
  }
}