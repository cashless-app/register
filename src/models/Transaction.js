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
  get_historybyId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT a.transaction, a.code, a.date, a.amount, b.phone FROM transaction_histories a INNER JOIN user b ON a.recipient = b.phone AND b.id =${id} `,
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
  top_up_new: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO user amount = '${data.amount}' WHERE id=${id}`,
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
  top_up_update: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE user SET amount = '${data.amount}' WHERE id=${id}`,
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
  transfer_fee: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE user SET amount = '${data.amount}'`,
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
        `UPDATE user SET amount = '${data.amount}'`,
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
        `UPDATE user SET amount = '${data.amount}'`,
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
  get_amount: (phone) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT amount FROM user WHERE phone = '${phone}'`,
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
  get_amount_with_code: (code) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT amount FROM transaction_histories WHERE code = '${code}'`,
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
  check_code: (code) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT code FROM transaction_histories WHERE code = '${code}'`,
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
};
