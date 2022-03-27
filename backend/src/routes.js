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

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb",extended: false}));
app.use(passport.initialize());

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

// Get one restaurant from the database - hardcoded for idRestaurant = 2
app.get('/single-restaurant', function (req, res) {
  dbConn.getConnection(function (err, connection) {
      dbConn.query('SELECT * FROM restaurant where idRestaurant=2', function (error, results) {
    if (error) throw error;
    console.log(error);
    res.send(results)
  });
});
});

app.get('/restaurant:$idRestaurant', function(req, res) {
  dbConn.getConnection(function (err, connection) {
    dbConn.query('SELECT * FROM restaurant ORDER BY idRestaurant', function(err, rows) {
        if(err) {
            req.flash('error', err);
            res.render('restaurant', {data:''});
        } else {
            res.render('restaurant', {data:rows});
        }
      });
    });   
});

app.get('/menuitem/:idRestaurant', function(req, res) {
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