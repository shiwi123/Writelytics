const mongoose = require("mongoose");

// Calling Schema(table) class
const { Schema, model } = mongoose;

// Creating Structure of the collection
const postSchema = new Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        
    }
  },
  {
    timestamps: true,
  }
);

// Creating collection(database)
const postModel = model("Posts", postSchema);

module.exports = postModel;
