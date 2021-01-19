const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  password: 'lordisjesus',
  user: 'root',
  database: 'HealthPlanSignUps',
  host: 'localhost',
  port: '3306',

});
const healthPlanSignUpsDB = {};
healthPlanSignUpsDB.getEnrollee = (email) =>  new Promise((resolve, reject) => {
  pool.query('select * from enrollees where email = ?', email, (err, results) => {
    if (err) {
      return reject(err);
    // eslint-disable-next-line no-else-return
    } else {
      return resolve(results);
    }
  });
});

healthPlanSignUpsDB.addEnrollee = (data) => new Promise((resolve, reject) => {
  pool.query('INSERT INTO enrollees( email,first_name,last_name,phone )  VALUES( ?,?,?,? )',
    data, (err, results) => {
      if (err) {
        return reject(err);
        // eslint-disable-next-line no-else-return
      } else {
        return resolve(results);
      }
    });
});
module.exports = healthPlanSignUpsDB;
