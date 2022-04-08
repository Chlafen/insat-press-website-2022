const uploadController = require("../controllers/upload.controller")

module.exports = function(app) {
  app.get("/uploads/image/*", uploadController.get)
  app.post("/uploads/image/*", uploadController.create)
  app.delete("/uploads/image/*", uploadController.delete)
}