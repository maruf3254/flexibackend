// const mongoose = require("mongoose");
// const ImageUploadSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: [true, "Please provide a title"],
//     },
//     imagePath: {
//         type: String,
//         required: [true, "Please provide an image"],
//     },
// }, { timestamps: true, });

// const ImageUpload = mongoose.model("ImageUpload", ImageUploadSchema);

// module.exports = ImageUpload;

// models/imageUploadModel.js
import mongoose from "mongoose";

const imageUploadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imagePath: { type: String, required: true },
}, { timestamps: true }); 

const ImageUpload = mongoose.model("ImageUpload", imageUploadSchema);

export default ImageUpload;
