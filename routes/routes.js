const express = require('express')
const router = express.Router()
const controller = require('../controllers/controllers')
const aiController = require('../controllers/addInvoice.controller')

router.get('/', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (false) next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  res.send('regular - Wiki home page');
})

router.get('/', function (req, res) {
  res.send('special wiki page')
})

router.use('/login', controller.login)

router.post('/users/signin', controller.signIn)
router.get('/verifyToken', controller.verifyToken)
router.get('/verifyFakeToken', controller.verifyFakeToken)

router.get('/nullOrders', aiController.retrieveNullOrders)


module.exports = router
