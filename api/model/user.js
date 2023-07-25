const mongoose = require("mongoose");

// Calling Schema(table) class
const { Schema, model } = mongoose;

// Creating Structure of the collection
const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    min: 4,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

// Creating collection(database)
const userModel = model("User", userSchema);

module.exports = userModel;
