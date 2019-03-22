const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const userController = require("./controllers/userController.js");
const productController = require("./controllers/productController.js");

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

var app = express();
var session = require('express-session')



express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(session({
    secret: 'Threesfjkowf453454!',
    resave: true,
    saveUninitialized: true
  }))
  .use(function (req, res, next) {
    if (!req.session.user) {
      console.log("Create session user")
      req.session.user = {}
    }
    next()
  })
  .use(function (req, res, next) {
    if (!req.session.view) {
      console.log("Create session user")
      req.session.view = {}
    }
    next()
  })

  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/main', (req, res) => res.render('pages/main'))
  .get('/logInUser', (req, res) => {

    userController.getPerson(req, res);  

  })
  .get('/addToCart', (req, res) => {
      addObjectToCart(req, res);
  })

  .get('/getProducts', (req, res) => {

  	productController.getProducts(req, res);
  	console.log("Test05")
  })

 .get('/checkIfLoggedIn', (req, res) => {

    checkIfLoggedIn(req, res)
    console.log("Test06")
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function addObjectToCart(request, response) {
  console.log("starting addObjectToCart" + request.query.result01);


  request.session.view[request.id] = request.query.result01;
  console.log("Data of cart: " + request.session.view[request.id]);



  var result = {success: true};
  response.send(result);
}

function checkIfLoggedIn(request, response) {
  var result;

  if(request.session.user) {
    console.log("Logged in");
    var result = {success: true};
  }
  else{
    console.log("Not logged in");
    var result = {success:false, message:"Not logged in"};
  }
  response.send(result);
}