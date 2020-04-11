const moment = require("moment");
const config = require("../configs/configs");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Transaction = require("../models/Transaction");

module.exports = {
  get_all: async (request, response) => {
    try {
      const data = await Transaction.get_history();
      response.json({ data });
    } catch (error) {
      console.log(error.message);
    }
  },
  transfer_p2p: async (request, response) => {
    const id1 = request.params.id;
    const id2 = request.params.id;
    try {
    } catch (error) {}
  },
  topUp: async (request, response) => {
    try {
    } catch (error) {}
  },
};
