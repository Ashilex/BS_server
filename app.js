require('dotenv').config();

const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')
const bRoutes = require('./routes/businessRouter')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const chalk = require ('chalk');
const { Sequelize } = require('sequelize');
const path = require('path')


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const userData = {
  userId: "789789",
  password: "123456",
  name: "Clue Mediator",
  username: "cluemediator",
  isAdmin: true
}

app.locals.userData = userData

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.use(function (req, res, next) {
  console.log('req body 1MW', req.body)
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) {
    console.log('nessun token ')
    return next();
  } //if no token, continue

  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    console.log('user in verify cb ', chalk.blue(user));
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});



// app.get('/', (req, res) => {
//   if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
//   res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
// });

app.use('/api/auth', routes)
app.use('/api/business', bRoutes)

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
