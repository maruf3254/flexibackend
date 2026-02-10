import express from "express";
import multer from "multer";
import fs from "fs";
import Vehicle from "../models/vehicleModel.js";
import {
    vendorGoogle,
    vendorSignin,
    vendorSignout,
    vendorSignup,
} from "../controllers/vendorControllers/vendorController.js";

import { vendorBookings } from "../controllers/vendorControllers/vendorBookingsController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads"); // folder to save images
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage: storage });

/* =====================
   CREATE VEHICLE
===================== */
router.post("/vendorAddVehicle", upload.single("image"), async (req, res) => {
    try {
        const {
            registeration_number,
            model,
            Seats,
            description,
            division,
            district,
            upazila,
            zone,
            addedBy,
        } = req.body;

        if (!req.file) return res.status(400).json({ success: false, message: "Image is required" });

        const vehicle = new Vehicle({
            registeration_number,
            model,
            Seats,
            description,
            division,
            district,
            upazila,
            zone,
            addedBy,
            imagePath: req.file.filename,
        });

        await vehicle.save();

        res.status(201).json({ success: true, message: "Vehicle added successfully", data: vehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/* =====================
   GET ALL VEHICLES
===================== */
router.get("/allVehicles", async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate("addedBy", "name email");
        res.json({ success: true, data: vehicles });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

/* =====================
   GET SINGLE VEHICLE
===================== */
router.get("/:id", async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id).populate("addedBy", "name email");
        if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
        res.json({ success: true, data: vehicle });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

/* =====================
   UPDATE VEHICLE
===================== */
router.put("/update/:id", upload.single("image"), async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });

        // If new image uploaded, delete old image
        if (req.file) {
            const oldImagePath = `public/uploads/${vehicle.imagePath}`;
            fs.unlink(oldImagePath, (err) => { if (err) console.error(err); });
            vehicle.imagePath = req.file.filename;
        }

        // Update other fields
        const { registeration_number, model, Seats, description, division, district, upazila, zone } = req.body;
        vehicle.registeration_number = registeration_number || vehicle.registeration_number;
        vehicle.model = model || vehicle.model;
        vehicle.Seats = Seats || vehicle.Seats;
        vehicle.description = description || vehicle.description;
        vehicle.division = division || vehicle.division;
        vehicle.district = district || vehicle.district;
        vehicle.upazila = upazila || vehicle.upazila;
        vehicle.zone = zone || vehicle.zone;

        await vehicle.save();
        res.json({ success: true, message: "Vehicle updated successfully", data: vehicle });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

/* =====================
   DELETE VEHICLE
===================== */
router.delete("/delete/:id", async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });

        // Delete image from server
        const filePath = `public/uploads/${vehicle.imagePath}`;
        fs.unlink(filePath, (err) => { if (err) console.error(err); });

        await vehicle.deleteOne();
        res.json({ success: true, message: "Vehicle deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.post("/vendorsignup", vendorSignup);
router.post("/vendorsignin", vendorSignin);
router.get("/vendorsignout", verifyToken, vendorSignout);

export default router;


