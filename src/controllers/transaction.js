const moment = require("moment");
const config = require("../configs/configs");
const User = require("../models/User");
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
};
