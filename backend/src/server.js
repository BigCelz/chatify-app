import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookieParser from 'cookie-parser';
import cors from 'cors'


const app = express();
const PORT = ENV.PORT;

// middleware
app.use(express.json({ limit: "5MB" }));
app.use(cookieParser());
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}))

// routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// health check 
app.get("/", (req, res) => {
  res.send("Chatify backend is live 🚀");
});

// start server only after DB connects
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  });
