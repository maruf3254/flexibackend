


import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  registeration_number: { type: String, required: true },
  model: { type: String, required: true },
  Seats: { type: String, required: true },
  description: { type: String },
  division: { type: String, required: true },
  district: { type: String, required: true },
  upazila: { type: String, required: true },
  zone: { type: String, required: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imagePath: { type: String, required: true }, // store filename
}, { timestamps: true });

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
