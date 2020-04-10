const connection = require("../configs/db");

module.exports = {
  login: (phone) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM user WHERE phone = ?`,
        phone,
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
  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO user SET ?", data, (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
  checkUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM user WHERE email = '${email}'`,
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
