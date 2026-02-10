// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   vehicleId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Vehicle",
//     required: true,
//   },
//   pickupDate: { type: Date, required: true },
//   dropOffDate: { type: Date, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional, if needed
//   pickUpLocation: { type: String, required: true },
//   dropOffLocation: { type: String, required: true },
//   totalPrice: { type: Number, required: true },
//   razorpayOrderId: { type: String, required: true },
//   razorpayPaymentId: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   status:{
//     type:String,
//     enum:["notBooked","booked","onTrip","notPicked","canceled","overDue","tripCompleted"],
//     default:"notBooked"
//   }
// });

// const Booking = mongoose.model("Booking", userSchema);

// export default Booking;

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
  pickupLocation: {
    division: String,
    district: String,
    upazila: String,
    zone: String,
  },
  pickupTime: { type: Date, required: true },
  destination: { type: String, required: true },
  notes: { type: String },
  status: { type: String, default: "booked" },
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
