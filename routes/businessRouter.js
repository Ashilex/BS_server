const express = require('express')
const Joi = require("joi");

const validateRequest = require("../middleware/validate-request");
const businessRouter = express.Router()
const controller = require('../controllers/controllers')
const aiController = require('../controllers/addInvoice.controller')
const diController = require('../controllers/deleteInvoceController')
// const {bus} = require("nodemon/lib/utils");
// import {DataTypes} from "sequelize";

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
businessRouter.post('/bill', authenticateSchema, aiController.saveBill, aiController.updateOrders)
businessRouter.get('/bill/range/:start?:end?', diController.rangeDates)
businessRouter.delete('/bill', diController.deleteBill)

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    id_internal_bill: Joi.number().integer().default(null),
    id_bs: Joi.string().required(),
    id_bs_personal_data_business: Joi.number().integer().default(2),
    id_company: Joi.number().integer().required(),
    bill_date: Joi.date().required(),
    date_notification: Joi.date().required(),

    total: Joi.number().precision(2).required(),
    with_iva: Joi.boolean().cast('number'),
    iva_total: Joi.number().precision(2).default(0.00),
    remaining_cost: Joi.number().precision(2).default(0.00),
    id_internal_bill_status: Joi.number().integer().default(2),
    payment_to_GG_days: Joi.number().integer().required(),
    months_payment_expected: Joi.date().required(),
    file_name: Joi.string().default('null'),
    note: Joi.string().default('null')
  });
  validateRequest(req, next, schema);
}

module.exports = businessRouter
