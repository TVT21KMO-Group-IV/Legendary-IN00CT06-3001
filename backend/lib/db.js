
const mysql = require('mysql');
let dbConn = null;

try {
  dbConn = mysql.createPool({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'b4626d49ec6b12',
    password: '357ef813',
    database: 'heroku_7c09d16aa6b59f9'
  });
}
catch {
  console.log("Pool creation failed");
}


const api = {
  query: (query, ...parameters) => {
    let promise = new Promise(function (resolve, reject) {
      dbConn.query(query, ...parameters, (error, results, fields) => {
        if (error) {
          reject(error)
        };

        resolve(results);
      })
    });

    return promise;
  },
  closeAll: () => {
    dbConn.end();
  }
};

module.exports = api;