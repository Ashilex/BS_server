const db = require('../_helpers/db');
const chalk = require("chalk");

async function retrieveNullOrders (req, res, next) {

  const ordini = await db.Order.findAll({
    where: {id_internal_bill: null}
  })
  console.log('ordini senza fattura ', ordini)
  return res.json(ordini)
}

async function retrieveNullOrdersWCompany (req, res, next) {

  const ordiniWCompany = await db.Order.findAll({
    where: {id_internal_bill: null},
    include: {
      model: db.Company
      // as: 'Instruments'
    }
  })
  console.log('ordini senza fattura ', ordiniWCompany)
  console.log(chalk.bgGreen('dati sugli ordini inviati'))
  return res.json({ordiniWCompany})
}

async function retrieveCompanies (req,res,next) {
  const companiesList = await db.Company.findAll()
  console.log('lista delle compagnie ', companiesList)
  return res.json({companiesList})
}

async function saveBill (req, res, next) {
  console.log('log della post della bill', req.body.data)
  return res.status(200)
}

module.exports = {retrieveNullOrders, retrieveNullOrdersWCompany, retrieveCompanies, saveBill}
