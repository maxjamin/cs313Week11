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

var session = require('express-session');
var app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/main', (req, res) => res.render('pages/main'))
  .get('/logInUser', (req, res) => {

    userController.getPerson(req, res);
    //res.session.views["username"] = "Ben";

  })
  .get('/getProducts', (req, res) => {

  	productController.getProducts(req, res);
  	console.log("Test05")
  })

 .get('/checkIfLoggedIn', (req, res) => {

    checkIfLoggedIn()
    console.log("Test06")
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function checkIfLoggedIn() {

  if(req.session.views["userLogin"])
  {
    console.log("Logged in");
  }

}