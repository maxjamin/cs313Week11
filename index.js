const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const userController = require("./controllers/userController.js");

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/main', (req, res) => res.render('pages/main'))
  .get('/logInUser', (req, res) => {

	userController.getPerson(req, res);
	console.log("Test04")		
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

