const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
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
