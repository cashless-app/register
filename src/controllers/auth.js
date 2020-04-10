require("dotenv").config();

const User = require("../models/User");
const Profile = require("../models/Profile");
const misc = require("../helpers/misc");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  login: async (request, response) => {
    console.log(request.body);

    const phone = request.body.phone;
    try {
      const user = await User.login(phone);
      if (user.length === 0) {
        return response
          .status(400)
          .json({ errors: [{ msg: "User not found in our database" }] });
      }
      const payload = {
        user: {
          id: user[0].id,
          phone: user[0].phone,
        },
      };
      const token = await jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: 360000,
      });
      const data = {
        token,
        id: user[0].id,
        phone: user[0].phone,
        name: user[0].name,
        email: user[0].email,
      };
      misc.response(response, 200, false, "Successfull login", data);
    } catch (error) {
      console.error(error.message);
      misc.response(response, 500, true, "Server error");
    }
  },
  register: async (request, response) => {
    const { name, email, password, role, phone } = request.body;

    try {
      const user = await User.checkUser(email);

      if (user.length === 0) {
        const salt = await bcrypt.genSalt(10);

        const passwordHash = await bcrypt.hash(password, salt);

        const data = { name, email, password: passwordHash, role, phone };

        const registered = await User.register(data);
        const dataProfile = {
          user_id: registered.insertId,
        };
        // await Profile.storeProfile(role, dataProfile);

        const payload = {
          user: {
            id: registered.id,
          },
        };

        const token = await jwt.sign(payload, process.env.JWT_KEY, {
          expiresIn: 360000,
        });

        misc.response(response, 200, false, "Successfull register");
      } else {
        return misc.response(response, 500, true, "User already exists");
      }
    } catch (error) {
      console.error(error.message);
      misc.response(response, 400, true, "Server error");
    }
  },
};
