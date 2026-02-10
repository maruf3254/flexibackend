import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
// import vendorRoute from "./routes/venderRoute.js";
// import disRoute from "./routes/disRoute.js";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import { cloudinaryConfig } from "./utils/cloudinaryConfig.js";
import imageRoute from "./routes/imageRoute.js";
import path from "path";
import vendorRoute from "./routes/vendorRoute.js";




const App = express();

App.use(express.json({ limit: "10mb" }));
App.use(cookieParser());

App.use(express.urlencoded({ extended: true }));
App.use(express.static('public/uploads')); 

dotenv.config();
const port = 3000;

mongoose
  .connect(process.env.mongo_uri)
  .then(console.log("connected"))
  .catch((error) => console.error(error));

// console.log(process.env.mongo_uri);

App.listen(port, () => {
  console.log("server listening !");
});

const allowedOrigins = ["http://localhost:5173" , "https://flexikar.com" ]; // Add allowed origins here

App.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    credentials: true, // Enables the Access-Control-Allow-Credentials header
  })
);

// App.use("*", cloudinaryConfig);

// App.get('/*', (req, res) => res.sendFile(resolve(__dirname, '../public/index.html')));

App.use("/api/user", userRoute);
App.use("/api/auth", authRoute);
App.use("/api/admin", adminRoute);
// App.use("/api/vendor", vendorRoute);
// App.use("/api/upload", imageRoute);

App.use("/api/vendor", vendorRoute);
App.use("/uploads", express.static("public/uploads"));


// App.use("/api/district", disRoute);



App.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    succes: false,
    message,
    statusCode,
  });
});
