const jwt = require('jsonwebtoken')

function generateToken(user) {
  if(!user) return null

  let u = {
    userId: user.userId,
    cognome: user.cognome,
    username: user.username
  }
  console.log('utente che viene tokenizzato', u)
  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24
  })
}

function getCleanUser(user) {
  if(!user) return null

  return {
    userId: user.userId,
    name: user.nome,
    surname: user.cognome,
    username: user.username,
    isAdmin: user.isAdmin
  };
}

module.exports = {generateToken, getCleanUser}
