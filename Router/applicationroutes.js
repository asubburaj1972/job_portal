const express = require("express");
const Application = require("../model/application");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Apply Job
router.post("/apply", verifyToken, async (req, res) => {
  const application = new Application({
    jobId: req.body.jobId,
    userId: req.user.id
  });

  await application.save();
  res.send("Job Applied Successfully");
});

// View Applications (Admin)
router.get("/", verifyToken, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).send("Admin only");

  const applications = await Application.find()
    .populate("jobId")
    .populate("userId");

  res.json(applications);
});

module.exports = router;
