// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import userRoute from "./routes/userRoute.js";
// import authRoute from "./routes/authRoute.js";
// import adminRoute from "./routes/adminRoute.js";
// // import vendorRoute from "./routes/venderRoute.js";
// // import disRoute from "./routes/disRoute.js";
// import cors from "cors";
// import multer from "multer";
// import cookieParser from "cookie-parser";
// import { cloudinaryConfig } from "./utils/cloudinaryConfig.js";
// import imageRoute from "./routes/imageRoute.js";
// import path from "path";
// import vendorRoute from "./routes/vendorRoute.js";




// const App = express();

// App.use(express.json({ limit: "10mb" }));
// App.use(cookieParser());

// App.use(express.urlencoded({ extended: true }));
// App.use(express.static('public/uploads')); 

// dotenv.config();
// const port = 3000;

// mongoose
//   .connect(process.env.mongo_uri)
//   .then(console.log("connected"))
//   .catch((error) => console.error(error));

// // console.log(process.env.mongo_uri);

// App.listen(port, () => {
//   console.log("server listening !");
// });

// const allowedOrigins = ["http://localhost:5173" , "https://flexikar.com" ]; // Add allowed origins here

// App.use(
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
//     credentials: true, // Enables the Access-Control-Allow-Credentials header
//   })
// );

// // App.use("*", cloudinaryConfig);

// // App.get('/*', (req, res) => res.sendFile(resolve(__dirname, '../public/index.html')));

// App.use("/api/user", userRoute);
// App.use("/api/auth", authRoute);
// App.use("/api/admin", adminRoute);
// // App.use("/api/vendor", vendorRoute);
// // App.use("/api/upload", imageRoute);

// App.use("/api/vendor", vendorRoute);
// App.use("/uploads", express.static("public/uploads"));


// // App.use("/api/district", disRoute);



// App.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "internal server error";
//   return res.status(statusCode).json({
//     succes: false,
//     message,
//     statusCode,
//   });
// });



// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// Routes
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import vendorRoute from "./routes/vendorRoute.js";
import imageRoute from "./routes/imageRoute.js";

// Utils
// import { cloudinaryConfig } from "./utils/cloudinaryConfig.js";

dotenv.config();
const App = express();

// Middleware
App.use(express.json({ limit: "10mb" }));
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser());
App.use(express.static("public/uploads"));

// CORS setup
const allowedOrigins = ["http://localhost:5173", "https://flexikar.com"];
App.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// --------------------------
// MongoDB Connection (Cached)
// --------------------------
const MONGO_URI = process.env.mongo_uri;

if (!MONGO_URI) {
  throw new Error("Please set MONGO_URI in environment variables!");
}

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  console.log("MongoDB connected!");
  return cached.conn;
}

// Connect immediately
connectDB().catch((err) => console.error("MongoDB connection error:", err));

// --------------------------
// Routes
// --------------------------
App.use("/api/user", userRoute);
App.use("/api/auth", authRoute);
App.use("/api/admin", adminRoute);
App.use("/api/vendor", vendorRoute);
App.use("/api/upload", imageRoute);

// Serve uploaded files
App.use("/uploads", express.static("public/uploads"));

// Error handler
App.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    succes: false,
    message,
    statusCode,
  });
});

// --------------------------
// Server start
// --------------------------
const port = process.env.PORT || 3000;
App.listen(port, () => console.log(`Server listening on port ${port}`));