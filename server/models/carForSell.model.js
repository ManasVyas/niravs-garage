const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carForSellSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, require: true },
    registration: { type: String, required: true },
    cost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    sold: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const CarForSell = mongoose.model("CarForSell", carForSellSchema);

module.exports = CarForSell;
