var express = require('express');
var router = express.Router();
//var dbConn  = require('../lib/db');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcryptjs');
//const { v4: uuidv4 } = require('uuid');



//src kansiosta node routes.js lähtee käyntiin http://localhost:5000/restaurant näkee hard koodatut ravintolat

const dbConn = mysql.createPool({
  host:'localhost',
	user:'fooduser',
	password:'foodpass',
	database:'food4u',
  acquireTimeout: 1000,
  connectionLimit: 100
});


const app = express();
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb",extended: true}));
app.use(passport.initialize());

// const BasicStrategy = require('passport-http').BasicStrategy;

// app.get('/restaurant', function (req, res) {
//   dbConn.getConnection(function (err, connection) {
//       dbConn.query('SELECT * FROM restaurant', function (error, results) {
//     if (error) throw error;
//     console.log(error);
//     res.send(results)
//   });
// });
// });

// passport.use(new BasicStrategy('/login',
//   function(username, password, done) {
//     dbConn.getConnection(function (username, ) {
//       dbConn.query('SELECT * FROM user WHERE username= ?', [username], function (error, result));
//     const user = user.getUserByName(username);
//     if(user == undefined) {
//       // Username not found
//       console.log("HTTP Basic username not found");
//       return done(null, false, { message: "HTTP Basic username not found" });
//     }

//     /* Verify password match */
//     if(bcrypt.compareSync(password, user.password) == false) {
//       // Password does not match
//       console.log("HTTP Basic password not matching username");
//       return done(null, false, { message: "HTTP Basic password not found" });
//     }
//     return done(null, user);
//   });
// }));

// const jwt = require('jsonwebtoken');
// const JwtStrategy = require('passport-jwt').Strategy,
//       ExtractJwt = require('passport-jwt').ExtractJwt;
// let jwtSecretKey = null;
// if(process.env.JWTKEY === undefined) {
//   jwtSecretKey = require('./jwt-key.json').secret;
// } else {
//   jwtSecretKey = process.env.JWTKEY;
// }
// let options = {}
//   options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//   options.secretOrKey = jwtSecretKey;


// passport.use(new JwtStrategy(options, function(jwt_payload, done) {
//   console.log('Processing JWT payload for token content:');
//   console.log( jwt_payload);

//   const now = Date.now() / 1000;
//   if(jwt_payload.exp > now) {
//     done(null, jwt_payload.user);
//   }
//   else {// expired
//     done(null, false);
//   }
// }))
// app.get('/jwt-protected-resource', passport.authenticate('jwt', {session: false}), (req, res) => {
//   res.json(
//     {
//       status: "Successfully accessed protected resource with JWT",
//       user: req.user
//     }
//   );
// })

// app.post('/login', passport.authenticate('basic', {session: false}), (req, res) => {
//   console.log(req.user);

  
//   const payload = {
//     user: {
//       idUser: req.user.idUser,
//       username: req.user.username,
//       idOwner: req.user.idOwner
//     }
//   };

  
//   const options = {
//     expiresIn: '1d'
//   }
//   const token = jwt.sign(payload, jwtSecretKey, options);

//   return res.json({ token });
// })



// Get all restaurants from the database
app.get('/restaurant', function (req, res) {
  dbConn.getConnection(function (err, connection) {
      dbConn.query('SELECT * FROM restaurant', function (error, results) {
    if (error) throw error;
    console.log("Ravintolat haettu");
    res.send(results)
  });
});
});



app.get('/menuitem', function (req, res) {
  dbConn.getConnection(function (err, connection) {
      dbConn.query('SELECT * FROM menuitem', function (error, results) {

    if (error) throw error;
    console.log("Menu haettu");
    res.send(results)
  });
});
});

// Get one restaurant from database with idRestaurant
app.get(`/restaurant/:idRestaurant/restaurant`, function(req, res) {
  dbConn.getConnection(function (err, connection) {
    dbConn.query('SELECT * FROM restaurant WHERE idRestaurant=?',[req.params.idRestaurant], function(error, result) {
      if (error) throw error;
      console.log("Ravintola haettu");
      res.send(result)  
    });
  });   
});

// Add new restaurant to the database
app.post(`/addrestaurant`, function(req, res) {
  dbConn.getConnection(function (err, connection) {
    dbConn.query('INSERT INTO restaurant (name, type, pricerange, address, openingHours, restaurantImg) VALUES (?, ?, ?, ?, ?, ?)',
    [req.body.name, req.body.type, req.body.pricerange, req.body.address, req.body.openingHours, req.body.restaurantImg],
     function(error, result) {
      if (error) throw error;
      console.log("Ravintola lisätty");
      res.send(result)  
    });
  });   
});

// Add menuitems for selected restaurant
app.post(`/menuitem/:idRestaurant`, function(req, res) {
  dbConn.getConnection(function (err, connection) {
    dbConn.query('INSERT INTO menuitem (dish, name, description, price, menuItemImg, idRestaurant) VALUES (?, ?, ?, ?, ?, ?)',
    [req.body.dish, req.body.name, req.body.description, req.body.price, req.body.menuItemImg, req.params.idRestaurant],
     function(error, result) {
      if (error) throw error;
      console.log("Annos lisätty");
      res.send(result)  
    });
  });   
});

// Get menuitems from one restaurant with idRestaurant
app.get(`/restaurant/:idRestaurant/menu`, function(req, res) {
  dbConn.getConnection(function (err, connection) {
    dbConn.query('SELECT * FROM menuitem where idRestaurant=?',[req.params.idRestaurant], function(error, result) {
     // dbConn.query('SELECT * FROM menuitem', function(error, result) {
        if (error) throw error;
        console.log("Ruokalista haettu");
        res.send(result)  
      });
    });   
});

// Add new user, password is saved with bcrypt hash
app.post(`/user`, function(req, res) {
  dbConn.getConnection(function (err, connection) {
    
    const salt = bcrypt.genSaltSync(6);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);
    dbConn.query('INSERT INTO user (username, password, fname, lname, address, idOwner) VALUES (?, ?, ?, ?, ?, ?)',
    [ req.body.username, passwordHash, req.body.fname, req.body.lname, req.body.address, req.body.idOwner],
     function(error, result) {
      if (error) throw error;
<<<<<<< HEAD
      console.log(error);
      res.send(result) 
      db_conn.close(); 
=======
=======
>>>>>>> 554549bd2c1165bc4d3ac2e2ab705902fcdadaf9
      console.log("Käyttäjä luotu");
      res.send(result) 
>>>>>>> 554549bd2c1165bc4d3ac2e2ab705902fcdadaf9
    });
  });   
});

 app.listen(5000, () => {
     console.log('check http://localhost:5000/register to see the data.');
});