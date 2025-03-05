import express from "express";
import {
  getUsername,
  profile,
  getRecords,
  getSharedRecords,
  createShareableLink,
  getPatientProfile,
  uploadFile,
} from "../controllers/userController.js";
import { authenticateUser } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/profile", profile);
router.get("/getUsername", getUsername);
router.get("/getRecords", getRecords);
router.get("/shared/:shareId", getSharedRecords);
router.get('/getPatientProfile', getPatientProfile);
router.post("/share", createShareableLink);
router.post('/upload', authenticateUser, upload.single('file'), uploadFile);

export default router;
