// import express from "express";
// import {
//   allDistricts,
//   upazilasOf,
//   upazilaData
// } from "@bangladeshi/bangladesh-address";
// import { v4 as uuidv4 } from "uuid";

// const router = express.Router();

// // Build the result list
// const result = [];

// // Loop through all districts
// allDistricts().forEach((districtName) => {
//   // Get upazilas for this district
//   const upazilas = upazilasOf(districtName);
 
//   upazilas.forEach((upa) => {
//     // upa.upazila is the upazila name from this package
//     result.push({
//       id: uuidv4(),
//       district: districtName, 
//       location: upa.upazila,
//       type: "location"
//     });
//   });
// });

// // GET /api/district → returns all
// router.get("/", (req, res) => {
//   res.json(result);
// });

// export default router;
