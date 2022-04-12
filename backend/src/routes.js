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


let jwtSecretKey = null;
if(process.env.JWTKEY === undefined) {
  jwtSecretKey = require('./jwt-key.json').secret;
} else {
  jwtSecretKey = process.env.JWTKEY;
}
const jwt = require("jsonwebtoken");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
 
      let options = {}
      options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

      /* This is the secret signing key.
         You should NEVER store it in code  */
      options.secretOrKey = jwtSecretKey;
      
      passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        console.log("Processing JWT payload for token content:");
        console.log(jwt_payload);
        /* Here you could do some processing based on the JWT payload.
        For example check if the key is still valid based on expires property.
        */
        const now = Date.now() / 1000;
        if(jwt_payload.exp > now) {
          done(null, jwt_payload);
        }
        else {// expired
          done(null, false);
        }
      }));



app.post("/login", (req, res)=> {
const user = req.body.username
const password = req.body.password
const owner1 = req.body.isOwner
dbConn.getConnection ( async (err, connection)=> {
if (err) throw (err)
    const sqlSearch = "Select * from user where username = ?"
    const search_query = mysql.format(sqlSearch,[user, owner1])
    console.log(search_query)
     dbConn.query(search_query, async (err, result) => {
       console.log(result)
       connection.release(); 
    if (err)
      throw (err);
    if (result.length == 0) {
      console.log("User does not exist");
      res.sendStatus(404);
    }
    else {
      const passwordHash = result[0].password;
      //get the passwordHash from result
      if (await bcrypt.compare(password, passwordHash)) {
        console.log("Login Successful");
        console.log("Generating accessToken");
        res.json({
          token: jwt.sign({ user: user, isOwner: result[0].isOwner }, jwtSecretKey, { expiresIn: "2h" }
          
        )})
        //});


        // jwt.sign({ user: user, isOwner }, jwtSecretKey, {expiresIn: "2h"}, (err, token) => {
        //   res.json({ token });  
        //   console.log(token)
        // });    
      } else {
        console.log("Password Incorrect");
        res.send("Password incorrect!");
      }
    }
  }) 
}) 
}) 

app.get(
  '/jwtProtectedResource',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log("jwt");
    res.json(
      {
        status: "Successfully accessed protected resource with JWT",
        user: req.user
      }
    );
  }
);
app.get('/todosJWT',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('GET /todosJWT')
    console.log(req.user)
    if (req.user.isOwner == 1){
      res.json({});
    }else{
      res.sendStatus(403);
    }
    //const t = todos.getAllUserTodos(req.user.id);
    //console.log('User Id: ' + req.user.id);
    
})
app.post('/todosJWT',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('POST /todosJWT');
    console.log(req.body);
    if(('description' in req.body) && ( 'dueDate' in req.body)) {
      todos.insertTodo(req.body.description, req.body.dueDate, req.user.id);
      res.json(todos.getAllUserTodos(req.user.id));
    }
    else {
      res.sendStatus(400);
    }

})

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
app.post(`/addrestaurant`, passport.authenticate('jwt', { session: false }),
 function(req, res) {
  if (req.user.isOwner != 1){
    res.sendStatus(403); 
    return
  }
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
    dbConn.query('INSERT INTO user (username, password, fname, lname, address, isOwner) VALUES (?, ?, ?, ?, ?, ?)',
    [ req.body.username, passwordHash, req.body.fname, req.body.lname, req.body.address, req.body.isOwner],
     function(error, result) {
      if (error) throw error;
      console.log("Käyttäjä luotu");
      res.send(result) 

    });
  });   
});

 app.listen(5000, () => {
     console.log('check http://localhost:5000/register to see the data.');
});