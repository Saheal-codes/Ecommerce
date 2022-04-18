const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    product: [
      {
        productID: { type: Schema.Types.ObjectId, required: true },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  },
});

module.exports = mongoose.model("Cart", cartSchema);
