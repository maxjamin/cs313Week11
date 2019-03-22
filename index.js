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

app.use(require('morgan')('dev'));
var session = require('express-session');
var FileStore = require('session-file-store')(session);
app.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/main', (req, res) => res.render('pages/main'))
  .get('/logInUser', (req, res) => {

    userController.getPerson(req, res);


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


function checkIfLoggedIn(request, response) {
  var result = {success: true};


  if(request.session.user) {
    console.log("Logged in");
  }
  else{
    console.log("Not logged in");
    var result = {success:false, message:"Not logged in"};
    response.send(result);
  }
}