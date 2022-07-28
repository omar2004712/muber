const mongoose = require("mongoose");
const { Schema } = mongoose;

const pointSchema = new Schema({
  type: {
    type: String,
    default: "Point",
    coordinates: { type: [Number], index: "2dsphere" },
  },
});

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  driving: {
    type: Boolean,
    default: false,
  },
  location: PointSchema,
});

const Driver = mongoose.model("driver", DriverSchema);

module.exports = Driver;
