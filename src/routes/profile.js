const express = require("express");
const multer = require("multer");
const Profile = require("../controllers/profile");
const redis = require("../helpers/redis");
const jwtCheck = require("../helpers/jwt");
const Route = express.Router();

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./public/images/profile");
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

const uploadUser = multer({
  storage,
});

Route.post("/:id", Profile.createProfile);
Route.patch("/:id", Profile.updateProfile);
Route.delete("/:id", Profile.deleteProfile);
Route.patch("/upload-user/:id", uploadUser.single("photo"), Profile.uploadUser);

module.exports = Route;
