const express = require("express");
const path = require("path")
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { Console } = require("console");
const req = require("express/lib/request");
const res = require("express/lib/response");
const PORT = process.env.PORT || 3001;
const fs = require('fs')

const app = express();

app.use(fileUpload({
  createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.static(path.join(__dirname, "upload", "image")));
app.use(express.static(path.join(__dirname, "tmp")));

console.log(__dirname)



app.post('/tmp', (req, res) => {
  if(!req.files){
    res.send({
      status:false,
      message: 'no file uploaded'
    }); 
  }else {
    let file = req.files.contentImg
    let filePath = Date.now() + '_' + file.name.replace('/\s+/g', '');
    file.mv('./tmp/' + filePath);
    res.send('/tmp/'+ filePath)
    console.log(filePath)
  }
})

app.get("/upload/image/*", (req, res) => {
  console.log(req.url)//check if exists
  res.sendFile(path.join(__dirname, req.url))
})

app.get("/tmp/*", (req, res) => {
  console.log(req.url)//check if exists

  res.sendFile(path.join(__dirname, req.url))
})



app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
