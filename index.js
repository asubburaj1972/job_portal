const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

/* ---------- CORS FIX ---------- */
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

/* ---------- IMPORTANT ---------- */
app.options("*", cors()); // 👈 ALLOW PREFLIGHT

app.use(express.json());

/* ---------- DB ---------- */
connectDB();

/* ---------- ROUTES ---------- */
app.use("/api/auth", require("./Router/authrouter"));
app.use("/api/jobs", require("./Router/jobroutes"));
app.use("/api/applications", require("./Router/applicationroutes"));

app.get("/", (req, res) => {
  res.send("Job Portal API running on Vercel 🚀");
});

/* ✅ REGISTER ROUTE */
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  res.json({ message: "User registered successfully" });
});

module.exports = app;









