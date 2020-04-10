const connection = require("../configs/db");

module.exports = {
  checkRole: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT role FROM user WHERE id = '${id}'`,
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
  checkPhone: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT phone FROM user WHERE id = '${id}'`,
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
  checkBalance: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT balance FROM user WHERE id = '${id}'`,
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
  detailUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM user WHERE id = '${id}'`,
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

  updateProfile: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE  user  SET ? WHERE id = ?`,
        [data, id],
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

  updateName: (name, id) => {
    let query = `UPDATE  user  SET  name = '${name}' WHERE id = ${id}`;
    return new Promise((resolve, reject) => {
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },

  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM user WHERE id = '${id}'`,
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

  uploadUser: (filename, id) => {
    let query = `UPDATE user SET photo = '${filename}' WHERE id = ${id}`;
    return new Promise((resolve, reject) => {
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
};
