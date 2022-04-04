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

const app = express();

app.use(fileUpload({
  createParentPath: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.static(path.join(__dirname, "upload", "image")));

console.log(__dirname)



app.post('/upload/temp', (req, res) => {
  if(!req.files){
    res.send({
      status:false,
      message: 'no file uploaded'
    }); 
  }else {
    let file = req.files.lefile
    let filePath = Date.now() + '_' + file.name.replace('/\s+/g', '');
    file.mv('./upload/image/' + filePath);
    res.send('/upload/image/'+ filePath)
    console.log(filePath)
  }
})

app.get("/upload/image/*", (req, res) => {
  console.log(req.url)
  res.sendFile(path.join(__dirname, req.url))
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
