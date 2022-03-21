
const mysql = require('mysql');
let dbConn= null;

try{ dbConn = mysql.createPool({
	host:'localhost',
	user:'fooduser',
	password:'foodpass',
	database:'food4u'
});
}
catch {
    console.log("Pool creation failed");
  }
  
  
    const api = {
      query: (query, ...parameters) =>
      {
        let promise = new Promise(function(resolve, reject) {
          dbConn.query(query, ...parameters, (error, results, fields) => {
            if(error) {
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