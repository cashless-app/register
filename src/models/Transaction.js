const connection = require("../configs/db");

module.exports = {
  get_history: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT a.transaction, a.code, a.date, a.amount, b.phone FROM transaction_histories a INNER JOIN user b ON a.recipient = b.phone`,
        (error, result) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  insert_history: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO transaction_histories SET ?`,
        data,
        (error, result) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  top_up_new: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO
        transaction_histories
            (amount, code, recipient)
            VALUES
            ('${data.amount}', '${data.code}', '${data.recipient}')`,
        (error, result) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  transfer_p2p_in: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE transaction_histories SET amount = '${data.amount}',code = '${data.code}',recipient = '${data.recipient}'`,
        (error, result) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  transfer_p2p_out: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE transaction_histories SET amount = '${data.amount}',code = '${data.code}',recipient = '${data.recipient}'`,
        (error, result) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};
