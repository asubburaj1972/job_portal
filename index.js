const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

/* ✅ CORS MUST BE FIRST */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://job-portal-90jdt5pxb-asubburaj1972s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

/* ✅ HANDLE PREFLIGHT */
app.options(/.*/, cors()); // Enable preflight for all routes (Express 5 compatible)

app.use(express.json());

connectDB();

/* ✅ ROUTES */
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.use("/api/auth", require("./Router/authrouter"));
app.use("/api/jobs", require("./Router/jobroutes"));
app.use("/api/applications", require("./Router/applicationroutes"));

/* ✅ EXPORT FOR VERCEL */
module.exports = app;

/* ✅ LOCAL DEVELOPMENT ONLY */
// Only run server if called directly (not when imported by Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
