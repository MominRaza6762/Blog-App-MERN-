import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import postRouter from "./routes/Post.js";
import userRouter from "./routes/User.js";
import mongoose from "mongoose";
import { checkForAuthentication, ristrictTo } from "./middleware/auth.js";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/Admin.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(checkForAuthentication);
app.use("/user", userRouter);
app.use("/posts", ristrictTo(["NORMAL", "ADMIN"]), postRouter);
app.use("/admin", ristrictTo(["ADMIN"]), adminRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Successfully Connected To Database`);
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });

export default app; // ✅ Use this instead of app.listen()
