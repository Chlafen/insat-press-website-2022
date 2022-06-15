const { CategoryModel } = require("../models");
const {responseHandler} = require('../helpers');


exports.getAll = async (limit, result) => {
  const categories = await CategoryModel.findAll({
    attributes: ["category_name", "category_slug"],
    limit: limit,
  }).catch((err) => {
    console.log(err);    
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  return result(null, responseHandler(true, 200, 'Success', categories));
}