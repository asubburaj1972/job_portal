const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

/* ✅ CONNECT DB */
connectDB();

/* ✅ CORS CONFIG (FIXED) */
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://job-portal-90jdt5pxb-asubburaj1972s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

/* ✅ BODY PARSER */
app.use(express.json());

/* ✅ TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Job Portal API running on Vercel 🚀");
});

/* ✅ ROUTES (USE ONLY /api PREFIX — BEST PRACTICE) */
app.use("/api/auth", require("./Router/authrouter"));
app.use("/api/jobs", require("./Router/jobroutes"));
app.use("/api/applications", require("./Router/applicationroutes"));

/* ✅ EXPORT FOR VERCEL */
module.exports = app;

/* ✅ LOCAL DEVELOPMENT ONLY */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
