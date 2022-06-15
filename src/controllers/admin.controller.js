const { responseHandler, asyncHandler } = require('../helpers');
const { adminService } = require('../services');

exports.allowAccess = asyncHandler(async (req, res) => {
    return res.status(200);
});