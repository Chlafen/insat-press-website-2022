

async function get(req, res, next) {
  try {
    res.sendfile(path.join(__dirname, req.url))
  } catch (err) {
    console.error(`Error while getting post pid=${req.query.pid || "unspecified"}.\n`, err.message);
  }
}


async function post(req, res, next) {
  if(!req.files){
    res.send({
      status:false,
      message: 'no file uploaded'
    }); 
  }else{
    //save the file to the uploads folder
    let file = req.files.contentImg
    let filePath = Date.now() + '_' + file.name.replace('/\s+/g', '');
    file.mv('./uploads/image/' + filePath);
    res.send('/uploads/image/'+ filePath)
    console.log(filePath)
  }
}
