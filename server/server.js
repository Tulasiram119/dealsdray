const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./config/db");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  })
);
connectToDatabase();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "working" });
});

app.use("/", userRoutes);
app.use("/employee", employeeRoutes);
app.listen(PORT, () => {
  console.log(`app listening http://localhost:${PORT}`);
});
