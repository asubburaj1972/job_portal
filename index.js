const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require('dotenv').config()


const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", require("../backend/Router/authrouter"));
app.use("/api/jobs", require("../backend/Router/jobroutes"));
app.use("/api/applications", require("../backend/Router/applicationroutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
