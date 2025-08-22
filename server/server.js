import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cron from "node-cron";
import axios from "axios";

import clientRoutes from './routes/ClientRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://freelancer-crm-omega.vercel.app"],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/clients', clientRoutes);

// Sample Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB and Start Server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Runs every minute
cron.schedule("* * * * *", async () => {
  console.log("⏰ Checking due follow-ups (every minute)...");
  try {
    const response = await axios.get("https://freelancer-crm-backend.onrender.com/api/clients/follow-ups/due");
    console.log("✅ Minute check complete. Found:", response.data);
  } catch (err) {
    console.error("❌ Error in minute follow-up job:", err.message);
  }
});
