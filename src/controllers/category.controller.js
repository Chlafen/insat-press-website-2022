const {categoryService} = require('../services');
const { asyncHandler } = require('../helpers');

exports.getAll = asyncHandler(async (req, res) => {
  try {
    const limit = req.query.limit ? req.query.limit * 1 : 99;
    await categoryService.getAll(limit, (err, data) => {
      if(err) {
        console.log(err);
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  }catch(error) {
    console.log(error);
    return res.status(error.code).json(error);
  }
});