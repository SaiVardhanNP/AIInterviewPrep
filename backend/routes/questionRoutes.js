import express from "express";
import {togglePinQuestion, updateQuestionNote, addQuestionsToSession} from "../controllers/questionController.js";
import  protect  from "../middleware/authMiddleware.js";


const questionRouter = express.Router();

questionRouter.post("/add", protect, addQuestionsToSession);
questionRouter.post("/:id/pin", protect, togglePinQuestion);
questionRouter.post("/:id/note", protect, updateQuestionNote);

export default questionRouter;