const express = require('express')
const businessRouter = express.Router()
const controller = require('../controllers/controllers')
const aiController = require('../controllers/addInvoice.controller')
const {bus} = require("nodemon/lib/utils");

// router.get('/', function (req, res, next) {
//   // if the user ID is 0, skip to the next router
//   if (false) next('route')
//   // otherwise pass control to the next middleware function in this stack
//   else next()
// }, function (req, res, next) {
//   res.send('regular - Wiki home page');
// })
//
// router.get('/', function (req, res) {
//   res.send('special wiki page')
// })

businessRouter.get('/nullOrders', aiController.retrieveNullOrders)
businessRouter.get('/nullOrdersWC', aiController.retrieveNullOrdersWCompany)
businessRouter.get('/companies', aiController.retrieveCompanies)
businessRouter.post('/bill', authenticateSchema, aiController.saveBill)

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

module.exports = businessRouter
