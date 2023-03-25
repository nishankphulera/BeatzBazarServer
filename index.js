require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const beatRoutes = require("./routes/beatRoutes");
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use("/api/user", userRoutes);
app.use("/api/beat", beatRoutes);

mongoose
  .connect(process.env.mongoUri, { useNewUrlParser: true })
  .then((res) => {
    app.listen(process.env.port, () => {
      console.log("listining on port: " + process.env.port);
    });
  })
  .catch((e) => {
    console.log(e);
  });
