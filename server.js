const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let users = []; // temporary storage (in memory)

// =============================
// Register API
// =============================
app.post("/api/auth/register", (req, res) => {
  const { email, password } = req.body;
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ email, password });
  res.json({ message: "Registration successful" });
});

// =============================
// Login API
// =============================
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  res.json({ message: "Login successful" });
});

// =============================
// Chatbot API
// =============================
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are MediBot, a helpful AI medical assistant." },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    res.status(500).json({ reply: "⚠️ Something went wrong while contacting MediBot." });
  }
});

// =============================
// Root
// =============================
app.get("/", (req, res) => {
  res.send("🚀 MediBot API is running...");
});

// =============================
// Start Server
// =============================
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
// In your server.js file, make sure you have:
const symptomsRoutes = require('./routesss/symptoms');
app.use('/api/symptoms', symptomsRoutes);