const express = require("express");
const path = require("path")
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload({
  createParentPath: true
}));

//static paths
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.static(path.join(__dirname, "upload", "image")));
app.use(express.static(path.join(__dirname, "tmp")));

/* Error handling middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});


app.get("/uploads/image/*", (req, res) => {
  console.log(req.url)//check if exists
  res.sendFile(path.join(__dirname, req.url))
})


require('./src/routes/tmp.route')(app);
require('./src/routes/post.route')(app)
require('./src/routes/reactserve.route')(app)


app.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`);
});