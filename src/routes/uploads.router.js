const express = require('express');
const path = require('path');
const router = express.Router(); 
const { auth } = require("../middlewares");

const fs = require('fs');

router.route('/')
  .post( 
    (req, res) => {
      if (req.files.file === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
      const file = req.files.file;

      const date = new Date();
      const n = Date.now().toString();
      const year = date.getFullYear();
      const month = date.getMonth();

      const fileName = n + '-' + file.name;

      const filepath = path.join(__basedir, 'uploads', year.toString(), month.toString(), fileName);

      console.log(filepath);
      file.mv(filepath);
      const fileurl = '/uploads/' + year.toString() + '/' + month.toString() + '/' + fileName ;
      res.send(fileurl);
    }
  );

router.route('/*')
  .delete(
    auth.isUserAuthed,
    (req, res) => {
      console.log(req.body);
      const filepath = path.join(__basedir, 'uploads', req.url);
      //delete file from server
      fs.unlink(filepath.replace('/', '\\') , (err) => {
        if (err) {
          console.error(err)
          res.status(500).send('Server Error');
          return
        }else{
          res.send('File deleted successfully');
        }
        //file removed
      }) 
  });

router.route('/*')
  .get((req, res) => {
    const filepath = path.join(__basedir, 'uploads', req.path);
    //check if file exists
    fs.access(filepath, fs.F_OK, (err) => {
      if(err){
        console.log(__errlogclr, err);
        res.status(404).send('File not found');
        return;
      }else{
        res.sendFile(filepath);
      }
    })
  });

module.exports = router;
