const moment = require("moment");
const config = require("../configs/configs");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Transaction = require("../models/Transaction");
const misc = require("../helpers/misc");
const redis = require("redis");
const redisClient = redis.createClient();
module.exports = {
  get_all: async (request, response) => {
    try {
      const data = await Transaction.get_history();
      response.json({ data });
    } catch (error) {
      console.log(error.message);
    }
  },
  get_allbyId: async (request, response) => {
    const id = request.params.id;
    try {
      const data = await Transaction.get_history(id);
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
    const id = request.params.id;
    const amount = request.body.amount;
    const date = new Date();

    try {
      const data = await User.getAllNasabahById(id);

      result =
        (data[0].amount ? parseInt(data[0].amount) : 0) + parseInt(amount);
      console.log(result);

      code = `TOP${moment(new Date()).format("DDMMYY")}${Math.floor(
        Math.random() * (999 - 100 + 1) + 100
      )}`;
      const data1 = {
        amount: result,
      };
      const data2 = {
        transaction: "1",
        code,
        date,
        amount: amount,
        recipient: data[0].phone,
      };
      await Transaction.insert_history(data2);
      await Transaction.top_up_update(data1, id);

      redisClient.flushdb();
      misc.response(response, 200, false, "Success topUp");
    } catch (error) {
      console.error(error.message);
      misc.response(response, 500, true, error.message);
    }
  },
  transfer: async (request, response) => {
    const id1 = request.params.id1;
    const id2 = request.params.id2;
    const date = new Date();
    try {
      if (current_amount) {
        result = parseInt(current_amount) + parseInt(request.body.amount);
      } else {
        result = parseInt(request.body.amount);
      }
      code = `TRI${moment(new Date()).format("DDMMYY")}${Math.floor(
        Math.random() * (999 - 100 + 1) + 100
      )}`;
      recipient = request.body.recipient;
      convert_result = config.formatRupiah(result.toString(), "+", "Rp");
      convert_result_without_symbol = config.formatRupiah(
        result.toString(),
        "",
        "Rp"
      );
      data = { amount: convert_result_without_symbol, code, recipient };
      transfer_p2p_in(data);
      code = `TRI${moment(new Date()).format("DDMMYY")}${Math.floor(
        Math.random() * (999 - 100 + 1) + 100
      )}`;
      if (parseInt(current_amount) <= parseInt(request.body.amount)) {
        return response.json("your balance is not enough.");
      }
      result = parseInt(current_amount) - parseInt(request.body.amount);
      code = `TRO${moment(new Date()).format("DDMMYY")}${Math.floor(
        Math.random() * (999 - 100 + 1) + 100
      )}`;
      recipient = request.body.recipient;
      convert_result = config.formatRupiah(result.toString(), "-", "Rp");
      convert_result_without_symbol = config.formatRupiah(
        result.toString(),
        "",
        "Rp"
      );
      data = { amount: convert_result_without_symbol, code, recipient };
      transfer_p2p_out(data);
      code = `TRO${moment(new Date()).format("DDMMYY")}${Math.floor(
        Math.random() * (999 - 100 + 1) + 100
      )}`;
      redisClient.flushdb();
      misc.response(response, 200, false, "Success Transfer");
    } catch (error) {
      console.error(error.message);
      misc.response(response, 500, true, error.message);
    }
  },
};
