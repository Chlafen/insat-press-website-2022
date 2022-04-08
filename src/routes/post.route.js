const postController = require('../controllers/post.controller');

module.exports = function(app) {
  app.get("/api/post", postController.get)
  app.post("/api/publish", postController.create)
  app.put("/api/post", postController.update)
  app.delete("/api/post", postController.deletePost)
}

