import cloudinary from "../utils/cloudinary";

export default {
  upload(filePath) {
    return cloudinary.uploader.upload(filePath);
  },
};
