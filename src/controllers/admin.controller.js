const { responseHandler, asyncHandler } = require('../helpers');
const { adminService, userService } = require('../services');

exports.allowAccess = asyncHandler(async (req, res) => {
    return res.status(200);
});

exports.listUsers = asyncHandler(async (req, res) => {
    try{
        userService.retrieveAll(
            (err, data) => {
                if (err) {
                  console.log(err);
                  return res.status(err.code).json(err);
                }
                return res.status(data.code).json(data);
            }
        )
    } catch(err){
        console.log(err);
        return res
            .status(500)
            .json(responseHandler(false, 500, 'Server Error', null));
    }
    return res.status(200);
});