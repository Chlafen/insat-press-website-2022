const  path  = require('path');
const fs = require('fs');

async function getTmp(req, res) {
  fs.access(path.join(__dirname,'../../', req.url), fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send('File Not found');
    } else {
      res.sendFile(path.join(__dirname,'../../', req.url));
    }
  });
}


async function uploadTmp(req, res) {
  //check if authenticated
  if (!req.files) {
    res.send({
      status: false,
      message: 'no file uploaded'
    });
  } else {
    let file = req.files.contentImg
    let filePath = 'tmp_' + Date.now() + '_' + file.name.replace('/\s+/g', '');
    file.mv('./tmp/' + filePath);
    res.send('/tmp/' + filePath);
  }
}

module.exports = {
  getTmp,
  uploadTmp
}