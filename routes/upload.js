import express from "express";
import { uploadFile } from "../controllers/UploadController.js";
import { protect } from "../Middlewares/auth.js";
import { upload } from "../Middlewares/Upload.js";

const router = express.Router();


router.post("/profile-picture",protect, upload.single("file"), uploadFile);



export default router;


