const express = require("express");
const app = express();
const path = require("path")
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const index = require('./src/routes/index');

require('./src/utils/dataImport/importDB');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload({createParentPath: true}));

//static paths
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.static(path.join(__dirname, "upload", "image")));
app.use(express.static(path.join(__dirname, "tmp")));

app.use('/api', index);

app.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`);
});