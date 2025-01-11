export const imageValidator = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({ message: "No image was uploaded." });
  }
  const file = req.file;
  const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!validFileTypes.includes(file.mimetype)) {
    return res
      .status(400)
      .send({ message: "Invalid file type. Only JPEG, JPG or PNG file" });
  }
  next();
};
