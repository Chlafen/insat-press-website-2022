const {User} = require('../models/user.model');
const {asyncHandler, responseHandler} = require('../helpers/handlers');
const {userService} = require('../services');


exports.getOneUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id * 1 || 0;
    if(!id) {
      return res.status(400).json({error: 'Invalid user id'});
    }
    await userService.retrieveOne(
      id,
      (err, data) => {
        if (err) {
          console.log(__errlogclr, err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      },
    );
  } catch (err) {
    console.log(__errlogclr, err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

exports.register = asyncHandler(async (req, res) => {
  try { 
    console.log(req.body);
    const rand = Math.floor(Math.random() * 8) + 1;
    const path = '/uploads/users/default_user'+rand+'.png';
    await userService.register(
      {
        username: req.body.username, 
        email: req.body.email, 
        password: req.body.password, 
        first_name: req.body.fname, 
        last_name: req.body.lname, 
        join_date: new Date(),
        profile_pic: path,
        url: req.protocol + '://' + req.get('host'),
      },
      (err, data) => {
        if (err) {
          console.log(__errlogclr, err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      },
    );
  } catch (err) {
    console.log(__errlogclr, err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

exports.userInfo = asyncHandler(async (req, res) => {
  try{
    await userService.retrieveOne(
      req.user.user_id,
      (err, data) => {
        if (err) {
          console.log(__errlogclr, err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      },
    );
  }catch(err){
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

exports.getTeam = asyncHandler(async (req, res) => {
  try{
    const teamType = req.query.type || -1; //-1 for all
    const limit = req.query.limit || 10;
    await userService.retrieveTeam(
      teamType,
      limit,
      (err, data) => {
        if (err) {
          console.log(__errlogclr, err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      },
    );
  }catch(err){
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});