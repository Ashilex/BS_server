const utility = require('../utils/utils')
const jwt = require('jsonwebtoken');
const utils = require("../utils/utils");
const db = require('../_helpers/db');
const chalk = require("chalk");


function login(req,res, next){
  console.log('arrivata richiesta')
  res.send({
    token: 'test123'
  });
}


async function signIn(req, res, next) {
  const user = req.body.username
  const pwd = req.body.password
  const numero = 445

  // const apper = await db.Codice.findOne({where:{codice: numero}})
  const userDb = await db.User.findOne({where: {account:user}})
  // console.log('provaaaaaaaaa', apper)
  console.log('provaaaaaaaaa', userDb?.dataValues.surname)

  retrievedUser = {
    userId: userDb?.dataValues.id_staff,
    nome: userDb?.dataValues.name,
    cognome: userDb?.dataValues.surname,
    username: userDb?.dataValues.account
  }

  if(user !== retrievedUser.username || pwd !== userDb?.dataValues.password) {
    console.log('req body', req.body)
    console.log('user input', user, ' password input ', pwd, 'user static values', req.app.locals.userData.username, 'pasw static value', req.app.locals.userData.password)
    return res.status(401).json({
      error: true,
      message: "username or password is wrong"
    })
  }
  console.log('req body', user)
  console.log('retrievedUser ', retrievedUser)
  const token = utility.generateToken(retrievedUser)
  const userObj = utility.getCleanUser(retrievedUser);
  console.log('userObj', userObj)
  return res.json({ user: userObj, token });

}

function verifyToken(req, res, next) {
  let token = req.query.token
  if(!token) {
    return res.status(400).json({
      error:true,
      message: "token is required"
    })
  }

  jwt.verify(token, process.env.JWT_SECRET, async function (err, user) {
    console.log('user dal verifytoken', user)
    if(err) return res.status(401).json({
      error:true,
      message:"invalid token"
    })
    console.log(chalk.blue(user))
    const userFromToken = await db.User.findOne({where: {account:user.username}})
    retrievedUser = {
      userId: userFromToken?.dataValues.id_staff,
      nome: userFromToken?.dataValues.name,
      cognome: userFromToken?.dataValues.surname,
      username: userFromToken?.dataValues.account
    }
    console.log('userFromToken ', userFromToken)
    if(userFromToken==null) { //qua devo controllare se esiste un record nel db con user.userId
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }

    let userObj = utils.getCleanUser(retrievedUser);
    console.log('userObj', userObj)
    return res.json({ user: userObj, token });

  })

}

function verifyFakeToken(req, res, next) {
  console.log('Eseguo Fake Token API')
  let token = req.query.token
  if(!token) {
    return res.status(400).json({
      error:true,
      message: "token is required"
    })
  }

  jwt.verify(token, process.env.JWT_SECRET, async function (err, user) {
    console.log('user dal verifytoken', user)
    if(err) return res.status(200).json({
      error:true,
      code:233,
      message:"invalid token"
    })

    const userFromToken = await db.User.findOne({where: {account:user.username}})
    console.log('userFromToken ', userFromToken)
    if(userFromToken==null) { //qua devo controllare se esiste un record nel db con user.userId
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }

    let userObj = utils.getCleanUser(req.app.locals.userData);
    return res.json({ user: userObj, token });

  })

}

module.exports = {login, signIn, verifyToken, verifyFakeToken}
