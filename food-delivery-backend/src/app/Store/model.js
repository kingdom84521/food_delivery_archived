const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const storeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  rating: {
    type: Number,
    default: 0,
    max: 5
  },
  commit_num: {
    type: Number,
    default: 0,
    min: 0
  },
  intro: {
    type: String,
    default: ""
  },
  work_time: [{
    type: String
  }],
  location: {
    type: pointSchema,
    required: true
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true
  },
  menus: [{
    type: Schema.Types.ObjectId,
    ref: "Menu"
  }]
});

storeSchema.methods.fixRating = function ( rating ) {
  var totalRating = this.rating * this.commit_num + rating;
  
  this.commit_num += 1;
  var newRating = totalRating / this.commit_num;
  this.rating = newRating;
};

storeSchema.methods.setLocation = function ( coordinates ) {
  var location = { 
    type: "Point",
    coordinates: coordinates
  };
  this.location = location;
};

module.exports = mongoose.model("Store", storeSchema);