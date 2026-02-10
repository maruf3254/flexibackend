// routes/imageRoute.js
import express from "express";
import multer from "multer";
import fs from "fs";
import ImageUpload from "../models/imageUploadModel.js"; // Make sure your model is ES module compatible

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // or you can add timestamp: `${Date.now()}-${file.originalname}`
    },
});

// console.log("dfsdf")

const upload = multer({ storage: storage });

// Upload single image
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const image = new ImageUpload({
            title: req.body.title,
            imagePath: req.file.filename,
        });
        await image.save();
        res.json({ success: true, message: "Image uploaded successfully", data: image });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});


// Get all images
router.get("/", async (req, res) => {
    try {
        const images = await ImageUpload.find();
        res.json({ success: true, data: images });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// DELETE /api/upload/:id
router.delete("/:id", async (req, res) => {
  try {
    const image = await ImageUpload.findById(req.params.id);
    if (!image) return res.status(404).json({ success: false, message: "Image not found" });

    // Delete the file from the server
    const filePath = `public/uploads/${image.imagePath}`;
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    // Remove from database
    await image.deleteOne();

    res.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



export default router;
