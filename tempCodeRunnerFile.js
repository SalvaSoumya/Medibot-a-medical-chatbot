const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// 🔍 Debugging line (add here)
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routesss/auth"));
app.use("/api/symptoms", require("./routesss/symptoms"));
app.use("/api/chat", require("./routesss/chat"));
app.use("/api/health", require("./routesss/health"));
app.use("/api/records", require("./routesss/records"));
app.use("/api/notifications", require("./routesss/notifications"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
