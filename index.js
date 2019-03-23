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
  .get('/logOut', (req, res) => {
      handleLogOut(req,res);
  })
  .get('/addToCart', (req, res) => {
      addObjectToCart(req, res);
  })
  .get('/removeFromCart', (req,res) => {
      removeFromCart(req, res);
  })
  .get('/getProducts', (req, res) => {

  	productController.getProducts(req, res);
  	console.log("Test05")
  })
 .get('/checkIfLoggedIn', (req, res) => {

    checkIfLoggedIn(req, res)
    console.log("Test06")
  })
 .get('/getProductsfromCart', (req, res) => {
    getProductsFromCart(req,res)
 })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function getProductsFromCart(request, response) {

  var objectToCart = [];
  var amountOfObjectToCart = [];
  var i;

  for(i=0;i<= 4;i++) {
    var qt = i + "qt";
    if(request.session.view[i])
    {
      console.log("Session var " + request.session.view[i] + " i: " + i )
      console.log("Amount Session var " + request.session.view[qt])
      objectToCart[i]= request.session.view[i];
      amountOfObjectToCart[i]= request.session.view[qt];
    }

  }
  var cart = {objectToCart, amountOfObjectToCart};

  response.send(cart);
}

function handleLogOut(request, response) {
    var result = {success: false};
    console.log("in handleLogOut function.. ")

    if(request.session.user)
    {
      console.log("logging out..")
      request.session.destroy();
      result = {success: true};
    }
    response.json(result);
}

function addObjectToCart(request, response) {
  console.log("starting addObjectToCart" + request.query.result01 +
    " " + request.query.id);

  var qt = request.query.id + "qt";

  request.session.view[request.query.id] = request.query.result01;
  //check to see if they need to add one, or add to the remaining qt
  if(!request.session.view[qt])
  {
    request.session.view[qt] = 01;
  }else
  {
    var quant = request.session.view[qt];
    quant = 1+quant;
    request.session.view[qt] = quant;
  }


  console.log("Data of cart: " + request.session.view[request.query.id]);
  console.log("Amount of Data in cart: " + request.session.view[qt]);
  

  var result = {success: true};
  response.send(result);
}

function removeFromCart(request, response) {
  console.log("Remove from card, id:" + request.query.id + " - " + request.query.amount);
  var qt = request.query.id + "qt";

    request.session.view[request.query.id] = null;
    request.session.view[qt] = null;
    var result = {success: true};
  }
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