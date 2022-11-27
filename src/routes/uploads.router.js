const express = require('express');
const path = require('path');
const router = express.Router(); 
const { auth } = require("../middlewares");

const fs = require('fs');
const encodeImageToBlurhash = require('../utils/encodeImgToBlurhash');

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
      file.mv(filepath)
        .then(() => {
          const fileurl = '/uploads/' + year.toString() + '/' + month.toString() + '/' + fileName ;
          let filedata = {
            fileurl: fileurl,
          }
          encodeImageToBlurhash(filepath)
            .then((blurhash) => {
              filedata.blurhash = blurhash;
              //save blurhash to db


              console.log("data");
              console.log(filedata);
              return res.status(200).json(filedata);
            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json({ msg: 'Server Error' });
            });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ msg: 'Server Error' });
        });
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
        //TODO: check if file is image
        //TODO: get blurhash from db
        encodeImageToBlurhash(filepath)
          .then((blurhash) => {
            res.status(200).json({ 
              filepath: filepath,
              blurhash: blurhash
            });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send('Server Error');
          });
      }
    })
  });

module.exports = router;
