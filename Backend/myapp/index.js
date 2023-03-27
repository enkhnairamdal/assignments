const express = require("express");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
const { categoryRouter } = require("./routes/categoryController");
const { articleRouter } = require("./routes/articleController");
const { v4: uuid } = require("uuid");
const multer = require("multer");
const cloudinary = require("cloudinary");
const bcrypt = require("bcryptjs");
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const extention = file.originalname.split(".").pop();
    cb(null, `${uuid()}.${extention}`);
    cb(null, file.originalname);
    // cb(null, path.join(__dirname, "/uploads/"));
  },
});
const upload = multer({
  storage: storage,
});
mongoose.connect(process.env.MONGODB_STRING).then(console.log("Connected!"));

const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post(
  "/upload-image",
  upload.single("image"),
  async function (req, res, next) {
    console.log(req);
    const cloudinaryImage = await cloudinary.v2.uploader.upload(req.file.path);

    return res.json({
      success: true,
      path: cloudinaryImage.secure_url,
      width: cloudinaryImage.width,
      height: cloudinaryImage.height,
    });
  }
);
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  createdAt: Date,
});

const User = mongoose.model("User", userSchema, "hereglegch");

app.use("/categories", categoryRouter);
app.use("/articles", articleRouter);
app.get("/test-mongoose", (req, res) => {
  User.create({
    name: "Baldan",
    email: "baldan@horl.mn",
    age: 18,
    createdAt: new Date(),
  });

  res.json({});
});
app.listen(port, () => {
  console.log("App is listering at port", port);
});
