const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    name: String,
    contact: String,
    latitude: String,
    longitude: String,
    promo: String,
  },
  product: {
    name: String,
    mrp: Number,
    disRate: Number,
    quantity: Number,
  },
});

const order = mongoose.model("Order", orderSchema);
module.exports = order;
