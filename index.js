const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// 🔹 MANUAL CORS (Vercel-safe)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// 🔹 Body parser
app.use(express.json());

// 🔹 DB
connectDB();

// 🔹 Routes
app.use("/api/auth", require("./Router/authrouter"));
app.use("/api/jobs", require("./Router/jobroutes"));
app.use("/api/applications", require("./Router/applicationroutes"));

app.get("/", (req, res) => {
  res.send("Job Portal API running on Vercel 🚀");
});

module.exports = app;
