const tmpController = require('../controllers/tmp.controller');

module.exports = function(app) {
  app.get('/tmp/*', tmpController.getTmp);
  app.post('/tmp', tmpController.uploadTmp);
}