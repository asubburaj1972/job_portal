const express = require("express");
const Job = require("../model/job");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Add Job (Admin)
router.post("/add", verifyToken, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).send("Admin only");

  const job = new Job(req.body);
  await job.save();
  res.send("Job Added Successfully");
});

// Get All Jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

module.exports = router;


