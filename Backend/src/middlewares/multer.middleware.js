import dotenv from 'dotenv';
dotenv.config();
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "../utils/ApiError.js";

console.log("ENV:");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "event-banners",
    allowed_formats: ["jpg", "jpeg", "png"],
  }),
});

// Export multer upload middleware
export const upload = multer({ storage });


