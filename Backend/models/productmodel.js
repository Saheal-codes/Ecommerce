const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  selling_price: {
    type: Number,
    required: true,
  },
  cost_price: {
    type: Number,
    required: true,
  },
  QR_hashcode: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  deleted_at: {
    type: Date,
    default: null,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("product", productSchema);
