const qrCode = require("qrcode");

exports.generateQr = async (text) => {
  try {
    console.log(text);
    const qr = await qrCode.toDataURL(text);
    console.log(qr);
    return qr;
  } catch (error) {
    console.log(error);
  }
};
