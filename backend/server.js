import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import protect from "./middleware/authMiddleware.js";
import { connectDB } from "./config/db.js";
import {authRouter} from "./routes/authRoutes.js";
import sessionRouter from "./routes/sessionRoutes.js";
import questionRouter from "./routes/questionRoutes.js";
import { generateConceptExplanation, generateInterviewQuestions } from "./controllers/aiController.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/questions", questionRouter);
app.use("/api/ai/generate-questions",protect,generateInterviewQuestions);
app.use("/api/ai/generate-explanation",protect,generateConceptExplanation);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

async function run() {
  try {
    await connectDB();
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
    process.exit(1);
  }
}

run();