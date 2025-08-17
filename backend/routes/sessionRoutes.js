import express from 'express';
import { createSession, getSessionById,getMySessions,deleteSession } from '../controllers/sessionController.js';
import  protect  from '../middleware/authMiddleware.js';


const sessionRouter = express.Router();


sessionRouter.post("/create", protect, createSession);
sessionRouter.get("/my-sessions", protect, getMySessions);
sessionRouter.get("/:id", protect, getSessionById);
sessionRouter.delete("/:id", protect, deleteSession);

export default sessionRouter;