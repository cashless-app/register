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

  /* storeProfile: (role, data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${role} SET ?`, data, (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  }, */

  updateProfile: (data, id) => {
    let query = `UPDATE  user  SET ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [data, id], (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },

  updateName: (id, name) => {
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
