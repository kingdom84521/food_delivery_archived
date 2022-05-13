const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menuSchema = new Schema({
  name: {
    type: String,
    default: ""
  },
  intro: {
    type: String,
    default: ""
  },
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: "Store",
    required: true
  },
  dishes: [{
    type: Schema.Types.ObjectId,
    ref: "Dish"
  }]
});

module.exports = mongoose.model("Menu", menuSchema);