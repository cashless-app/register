const Profile = require("../models/Profile");
const fs = require("fs-extra");
const misc = require("../helpers/misc");
const redis = require("redis");
const redisClient = redis.createClient();

module.exports = {
  getProfile: async (request, response) => {
    const id = request.params.id;
    try {
      const checkPhone = await Profile.checkPhone(id);
      if (checkPhone.length === 0) {
        throw new Error("User not found");
      }
      const profile = await Profile.detailUser(id);
      misc.response(
        response,
        200,
        false,
        "Successfull get single profile",
        profile,
        request.originalUrl
      );
    } catch (error) {
      console.error(error.message);
      misc.response(response, 500, true, error.message);
    }
  },
  updateProfile: async (request, response) => {
    try {
      const id = request.params.id;
      const checkPhone = await Profile.checkPhone(id);
      if (checkPhone.length === 0 || checkPhone === null) {
        return misc.response(response, 400, false, "User not found");
      }
      let requireCheck = [];
      let data = {};
      const { name, email, phone } = request.body;
      !name ? requireCheck.push("name is required") : "";
      !email ? requireCheck.push("email is required") : "";
      !phone ? requireCheck.push("phone is required") : "";
      if (requireCheck.length) {
        return misc.response(response, 400, false, "Not Valid", {
          errors: [{ msg: requireCheck }],
        });
      }
      data = {
        name: name,
        email: email,
        phone: phone,
      };
      await Profile.updateProfile(data, id);
      await Profile.updateName(name, id);
      redisClient.flushdb();
      misc.response(response, 200, false, "Success create profile", data);
    } catch (error) {
      console.error(error.message);
      misc.response(response, 500, true, "Server error");
    }
  },

  deleteProfile: async (request, response) => {
    const id = request.params.id;
    try {
      const checkRole = await Profile.checkRole(id);
      if (checkRole.length === 0) {
        return misc.response(response, 400, false, "User not found");
      }
      await Profile.deleteUser(id);
      redisClient.flushdb();
      misc.response(response, 200, false, "Success delete profile");
    } catch (error) {
      console.log(error.message);
      misc.response(response, 500, true, "Server error");
    }
  },
  uploadUser: async (request, response, next) => {
    let error = false;
    if (request) {
      if (request.file) {
        if (request.file.size >= 5242880) {
          const message = "Oops!, Size cannot more than 5MB";
          misc.response(response, 400, false, message);
          error = true;
          fs.unlink(`public/images/profile/${request.file.filename}`, function (
            error
          ) {
            if (error) misc.response(response, 400, false, error);
          });
        }
        const file = request.file.filename;
        const extension = file.split(".");
        const filename = extension[extension.length - 1];

        if (!isImage(filename)) {
          const message = "Oops!, File allowed only JPG, JPEG, PNG, GIF, SVG";
          misc.response(response, 400, false, message);
          error = true;
          fs.unlink(`public/images/profile/${request.file.filename}`, function (
            error
          ) {
            if (error) misc.response(response, 400, false, error);
          });
        }
        function isImage(filename) {
          switch (filename) {
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "svg":
              return true;
          }
          return false;
        }
      }
    }
    const id = request.params.id;
    const photo = request.file.filename;
    try {
      if (error === false) {
        await Profile.uploadUser(photo, id);
        redisClient.flushdb();
        misc.response(response, 200, false, "Success upload profile buyer");
      }
    } catch (error) {
      console.error(error);
      misc.response(response, 500, true, "Server error");
    }
  },
};
