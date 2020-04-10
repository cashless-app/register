const express = require("express");
const multer = require("multer");
const Auth = require("../controllers/auth");
const Route = express.Router();

Route.post("/login", Auth.login) //.get("/", Auth.auth)
  .post("/register", Auth.register)
  .get("/getAllNasabah", Auth.getAllNasabah)
  .get("/getAllNasabah/:id", Auth.getAllNasabahByid);
//.post('/forgot-password', Auth.forgotPassword)
//.patch('/update-password', Auth.updatePassword)
//.patch('/profile-change-password', Auth.profileNewPassword)

module.exports = Route;
