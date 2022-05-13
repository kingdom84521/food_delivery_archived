const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ""
  },
  grains: {
    type: Number,
    default: 0
  },
  greens: {
    type: Number,
    default: 0
  },
  protiens: {
    type: Number,
    default: 0
  },
  dairies: {
    type: Number,
    default: 0
  },
  fruits: {
    type: Number,
    default: 0
  },
  nuts: {
    type: Number,
    default: 0
  },
  tag: [{
    type: String
  }],
  price: {
    type: Number,
    required: true,
    default: 0
  },
  menu_id: {
    type: Schema.Types.ObjectId,
    ref: "Menu",
    required: true
  }
});

module.exports = mongoose.model("Dish", dishSchema);