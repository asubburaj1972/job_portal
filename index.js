const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

connectDB();

/* ✅ CORS CONFIG (MOST IMPORTANT PART) */
/* ✅ CORS CONFIG (MOST IMPORTANT PART) */
const corsOptions = {
  origin: [
    "http://localhost:5173",   // Vite frontend (local)
    "https://job-portal-90jdt5pxb-asubburaj1972s-projects.vercel.app" // frontend deployed
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests explicitly



/* ✅ MIDDLEWARE */
app.use(express.json());

/* ✅ TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Job Portal API running on Vercel 🚀");
});

/* ✅ ROUTES */
// Handle direct paths
app.use("/auth", require("./Router/authrouter"));
app.use("/jobs", require("./Router/jobroutes"));
app.use("/applications", require("./Router/applicationroutes"));

// Handle /api prefixed paths (common in Vercel deployments)
app.use("/api/auth", require("./Router/authrouter"));
app.use("/api/jobs", require("./Router/jobroutes"));
app.use("/api/applications", require("./Router/applicationroutes"));

/* ✅ THIS LINE IS REQUIRED FOR VERCEL */
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
