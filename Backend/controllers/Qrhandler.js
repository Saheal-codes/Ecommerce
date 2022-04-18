const Jimp = require("jimp");
const jsQR = require("jsqr");
const fs = require("fs");
const path = require("path");
const productmodel = require("../models/productmodel");
const qrCode = require("qrcode");

// Jimp.read(path.join()) // image path use path.join(__dirname,'/fileName')
//   .then((image) => {
//     const code = jsQR(
//       image.bitmap.data,
//       image.bitmap.width,
//       image.bitmap.height
//     );

//     if (code) {
//       console.log("Found QR code", code);
//     }
//   })
//   .catch((err) => {
//     console.error(err);
//   });
exports.generateQr = async (text) => {
  try {
    const qr = await qrCode.toDataURL(text);
    return qr;
  } catch (error) {
    console.log(error);
  }
};
