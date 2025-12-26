// api/index.js
const express = require("express");
require("dotenv").config();
const connectDB = require("../api/config/db");

const app = express();


const cors = require("cors");


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://job-portal-5c8md5326-asubbujaraj1972s-projects.vercel.app"
    ],
    credentials: true
  })
);




app.use(express.json());

connectDB();

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
