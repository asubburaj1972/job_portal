// api/index.js
const express = require("express");
require("dotenv").config();
const connectDB = require("../api/config/db");

const app = express();

// 🔹 MANUAL CORS (Vercel-safe)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // You can adjust this in production
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

// 🔹 DB connection
connectDB();

// 🔹 Routes
app.use("/api/auth", require("../api/Router/authrouter"));
app.use("/api/jobs", require("../api/Router/jobroutes"));
app.use("/api/applications", require("../api/Router/applicationroutes"));

app.get("/", (req, res) => {
  res.send("Job Portal API running on Vercel 🚀");
});

// Export the Express app as a serverless function
module.exports = (req, res) => {
  app(req, res); // Pass the request and response to Express
};
