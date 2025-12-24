const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// ✅ MANUAL HEADERS (Vercel-safe)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  // 🔥 Handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/auth", require("./Router/authrouter"));
app.use("/api/jobs", require("./Router/jobroutes"));
app.use("/api/applications", require("./Router/applicationroutes"));

app.get("/", (req, res) => {
  res.send("Job Portal API running on Vercel 🚀");
});

module.exports = app;
