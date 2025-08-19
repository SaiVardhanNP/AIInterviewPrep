import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
export const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/profile', protect, getUserProfile);


authRouter.post("/upload-image", upload.single("image"), async (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "Upload failed" });
  }

  res.status(200).json({ imageUrl: req.file.path });
});
