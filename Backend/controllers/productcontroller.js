const productmodel = require("../models/productmodel");
const cartmodel = require("../models/cartmodel");
const mongoose = require("mongoose");

exports.addProduct = async (req, res) => {
  try {
    const product = new productmodel({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title.toLocaleLowerCase(),
      selling_price: req.body.selling_price,
      cost_price: req.body.cost_price,
      description: req.body.description,
      quantity: req.body.quantity,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const result = await product.save();
    res.status(200).json({
      message: "Product added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const result = await productmodel.findOneAndUpdate(
      { _id: req.params.id } || { title: req.params.title },
      {
        $set: {
          title: req.body.title,
          selling_price: req.body.selling_price,
          cost_price: req.body.cost_price,
          description: req.body.description,
          quantity: req.body.quantity,
        },
      },
      { new: true }
    );
    res.status(200).json({
      message: "Product updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const result = await productmodel.findOneAndDelete(
      { $or: [{ _id: req.params.id }, { title: req.params.id }] },
      {
        $set: {
          deleted_at: new Date(),
        },
      },
      { new: true }
    );
    res.status(200).json({
      message: "Product deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};
exports.readQR = async (req, res) => {
  try {
    const result = await productmodel.findOne({
      QR_hashcode: req.params.hashcode,
    });
    res.status(200).json({
      message: "Product read successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};
exports.readAllProducts = async (req, res) => {
  try {
    const result = await productmodel.find({ deleted_at: null });
    res.status(200).json({
      message: "Products read successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};
exports.createBill = async (req, res) => {
  try {
    const cart = req.body.cart;
    const bill = new billmodel({
      _id: new mongoose.Types.ObjectId(),
      cart: cart,
      created_at: new Date(),
    });
    const result = await bill.save();
    res.status(200).json({
      message: "Bill created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};
var Jimp = require("jimp");
var fs = require("fs");
var qrCode = require("qrcode-reader");

// Read the image and create a buffer
// (Here image.png is our QR code)
// var buffer = fs.readFileSync(__dirname + "/image.png");

// Parse the image using Jimp.read() method
// Jimp.read(buffer, function (err, image) {
//   if (err) {
//     console.error(err);
//   }
//   let qrcode = new qrCode();
//   qrcode.callback = function (err, value) {
//     if (err) {
//       console.error(err);
//     }
//     console.log(value.result);
//   };
//   qrcode.decode(image.bitmap);
// });
