const {encode} = require("blurhash");
const sharp = require("sharp");



const encodeImageToBlurhash = (path) => {
  // console.log("path: ", path);
  return new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: "inside" })
      .toBuffer((err, buffer, dim) => {
        if (err) {
          reject(err);
        } else {
          const blurhash = encode(new Uint8ClampedArray(buffer), dim?.width, dim?.height, 4, 4);
          resolve(blurhash);
        }
      });
    });
};
    
module.exports = encodeImageToBlurhash;