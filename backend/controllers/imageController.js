import ImageUpload from "../models/ImageUpload.js";


export const uploadImage = async (req, res, next) => {
  // console.log(req.file);
  try {
    const image = new ImageUpload({
      title: req.body.title,
      imagePath: req.file.filename,
    });
    await image.save();
    res.send('Image uploaded successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
};
