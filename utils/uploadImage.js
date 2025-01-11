import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads",
    });
    return result.secure_url;
  } catch (error) {
    throw new Error("Cloudinary upload failed");
  }
};
