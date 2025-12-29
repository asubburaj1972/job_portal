const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

/* ✅ CORS MUST BE FIRST */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://job-portal-pauj3d5wu-asubbujaraj1972s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

/* ✅ HANDLE PREFLIGHT */
app.options("/", cors());

app.use(express.json());

connectDB();

/* ✅ ROUTES */
app.use("/api/auth", require("./Router/authrouter"));
app.use("/api/jobs", require("./Router/jobroutes"));
app.use("/api/applications", require("./Router/applicationroutes"));

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

/* ✅ EXPORT FOR VERCEL */
module.exports = app;
