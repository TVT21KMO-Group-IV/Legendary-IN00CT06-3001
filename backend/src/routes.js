var express = require('express');
var router = express.Router();
//var dbConn  = require('../lib/db');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');



//src kansiosta node routes.js lähtee käyntiin http://localhost:5000/restaurant näkee hard koodatut ravintolat

const dbConn = mysql.createPool({
    host:'localhost',
	user:'fooduser',
	password:'foodpass',
	database:'food4u'
});
//const restaurantRouter = require('./routes/restaurant.routes');


const app = express();
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb",extended: true}));
app.use(passport.initialize());
//app.use('/restaurant', restaurantRouter);


// Get all restaurants from the database
app.get('/restaurant', function (req, res) {
    dbConn.getConnection(function (err, connection) {
        dbConn.query('SELECT * FROM restaurant', function (error, results) {
      if (error) throw error;
      console.log(error);
      res.send(results)
    });
  });
});



app.get('/menuitem', function (req, res) {
  dbConn.getConnection(function (err, connection) {
      dbConn.query('SELECT * FROM menuitem', function (error, results) {

    if (error) throw error;
    console.log(error);
    res.send(results)
  });
});
});


app.get(`/restaurant/:idRestaurant/restaurant`, function(req, res) {
  dbConn.getConnection(function (err, connection) {
    dbConn.query('SELECT * FROM restaurant WHERE idRestaurant=?',[req.params.idRestaurant], function(error, result) {
      if (error) throw error;
      console.log(error);
      res.send(result)  
    });
  });   
});
app.post(`/restaurant`, function(req, res) {
  dbConn.getConnection(function (err, connection) {
    dbConn.query('INSERT INTO restaurant (name, type, pricerange, address, openingHours, restaurantImg) VALUES (?, ?, ?, ?, ?, ?)',
    [req.params.name, req.params.type, req.params.pricerange, req.params.address, req.params.openingHours, req.params.restaurantImg],
     function(error, result) {
      if (error) throw error;
      console.log(error);
      res.send(result)  
    });
  });   
});

// app.post('/restaurant', (req, res) => {
//   var postData  = req.body;
//   dbConn.query('INSERT INTO restaurant (name, type, pricerange, address, openingHours, restaurantImg) VALUES (?, ?, ?, ?, ?, ?)', postData, (error, result, fields) => {
//     if (error) throw error;
//     res.end(JSON.stringify(result));
//   });
// });

app.get(`/restaurant/:idRestaurant/menu`, function(req, res) {
  dbConn.getConnection(function (err, connection) {
    dbConn.query('SELECT * FROM menuitem where idRestaurant=?',[req.params.idRestaurant], function(error, result) {
     // dbConn.query('SELECT * FROM menuitem', function(error, result) {
        if (error) throw error;
        console.log(error);
        res.send(result)  
      });
    });   
});




 app.listen(5000, () => {
     console.log('check http://localhost:5000/restaurant to see the data.');
   });