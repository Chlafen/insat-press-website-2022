const express = require("express");
const app = express();
const path = require("path")
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const index = require('./src/routes/index');
const indexupload = require('./src/routes/index.uploads'); 

require('./src/utils/dataImport/importDB');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload({createParentPath: true}));

global.__basedir = __dirname;
global.__errlogclr = "\x1b[31m%s\x1b[0m"; //usage console.log(__errlogclr, err);
//static paths
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "client", "build")));

//requests logger middleware
if(process.env.NODE_ENV === 'development') {
  console.log(process.env.NODE_ENV);
  app.use((req, res, next) => {
    console.log("\n\x1b[32m%s\x1b[0m request for \x1b[36m%s \n\x1b[0m--body:  \x1b[33m%s\x1b[0m",
      req.method, req.originalUrl, JSON.stringify(req.body)
    );
    //log query params
    console.log("--query: \x1b[35m%s\x1b[0m", JSON.stringify(req.query));
    
    next();
  });
}

app.use('/api', index);
app.use('/uploads', indexupload);


app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});




app.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}\n\n`);
});