const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

/* ---------- DATABASE ---------- */
connectDB();

/* ---------- ROUTES ---------- */
app.use("/api/auth", require("./Router/authrouter"));
app.use("/api/jobs", require("./Router/jobroutes"));
app.use("/api/applications", require("./Router/applicationroutes"));

/* ---------- TEST ROUTE ---------- */
app.get("/", (req, res) => {
  res.send("Job Portal API running on Vercel 🚀");
});

/* ---------- EXPORT FOR VERCEL ---------- */
module.exports = app;
