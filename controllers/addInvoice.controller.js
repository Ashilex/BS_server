const db = require('../_helpers/db');
const chalk = require("chalk");
const { Sequelize} = require('sequelize');

async function retrieveNullOrders (req, res, next) {

  const ordini = await db.Order.findAll({
    where: {id_internal_bill: null},
    order: ['id_company', 'DESC']
  })
  console.log('ordini senza fattura ', ordini)
  return res.json(ordini)
}

async function retrieveNullOrdersWCompany (req, res, next) {

  const ordiniWCompany = await db.Order.findAll({
    where: {id_internal_bill: null},
    order: ['id_company'],
    include: {
      model: db.Company
      // as: 'Instruments'
    }
  })
  // console.log('ordini senza fattura ', ordiniWCompany)
  // console.log(chalk.bgGreen('dati sugli ordini inviati'))
  return res.json({ordiniWCompany})
}

async function retrieveCompanies (req,res,next) {
  const companiesList = await db.Company.findAll()
  // console.log('lista delle compagnie ', companiesList)
  return res.json({companiesList})
}

async function saveBill (req, res, next) {
  console.log(chalk.bgGreenBright('log della post della bill'), req.body.data.form)
  console.log(chalk.bgBlueBright('log della post della bill degli ordini da aggiornare'), req.body.data.ordersToUpdate)
  // const newBill = db.Bill.build(req.body.data)
  // console.log(chalk.bgGreenBright('newbill '), newBill)
  // await newBill.save()
  try{
    await db.Bill.create(req.body.data.form)
    const results = await db.sequelize.query('SELECT LAST_INSERT_ID();', {
      type: db.sequelize.QueryTypes.SELECT
    });
    console.log(JSON.stringify(results))
    res.locals.ordersToUpdate = results;

    next()
    // return res.json(200)
  }
  catch (e) {
    res.status(400).send('Invalid JSON string')

  }
}

function saveBillPromise (req, res, next) {
  console.log(chalk.bgGreenBright('log della post della bill'), req.body.data)
  // const newBill = db.Bill.build(req.body.data)
  // console.log(chalk.bgGreenBright('newbill '), newBill)
  // await newBill.save()
  db.Bill.create(req.body.data)
    .then( ()=>{
      db.sequelize.query('SELECT LAST_INSERT_ID();', {
        type: db.sequelize.QueryTypes.SELECT})
        .then(results=>{
          console.log(JSON.stringify(results))
        })
    })
    .then(()=>{
        return res.status(200)
      }
    )
    .catch(err=>{
      console.log(err)})
}

function updateOrders(req, res, next) {
  console.log('ultimo passaggio, dati da aggiornare', req.body.data.ordersToUpdate)
}

module.exports = {retrieveNullOrders, retrieveNullOrdersWCompany, retrieveCompanies, saveBill, updateOrders}
