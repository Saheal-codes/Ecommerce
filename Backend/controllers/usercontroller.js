const mongoose = require("mongoose");
const usermodel = require("../models/usermodel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
  try {
    const newuser = await usermodel.create({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.hpass
      ).toString(),
    });
    res.send({ message: "User added successfully", data: newuser }, 201);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
exports.loginUser = async (req, res) => {
  try {
    const user = await usermodel.findOne({
      username: req.body.username,
    });
    if (!user) {
      res.status(404).send({ message: "User not found" });
    } else {
      const decrypted = CryptoJS.AES.decrypt(
        user.password,
        process.env.hpass
      ).toString(CryptoJS.enc.Utf8);
      if (decrypted === req.body.password) {
        const { password, ...others } = user._doc;
        const accesstoken = jwt.sign(others, process.env.jwtpass, {
          expiresIn: "6h",
        });
        res.send(
          { message: "User logged in successfully", data: others, accesstoken },
          200
        );
      } else {
        res.status(401).send({ message: "Invalid Credentials !" });
      }
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const user = await usermodel.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send({ message: "User not found" });
    } else {
      res
        .status(200)
        .send({ message: "User deleted successfully", data: user });
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
