const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    default: "admin",
  },
});

module.exports = mongoose.model("Admin", adminSchema);
