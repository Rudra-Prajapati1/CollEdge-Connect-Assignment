import "dotenv/config";
import express from "express";
import cors from "cors";
import contactRouter from "./routes/contactRoutes.js";
import connectDB from "./config/db.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is live!");
});

app.use("/health", (req, res) => {
  res.status(200).send("Server is running fine.");
});

app.use("/api", contactRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
