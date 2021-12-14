const db = require('../_helpers/db');
const chalk = require("chalk");
const { Sequelize} = require('sequelize');

async function rangeDates (req, res, next) {
  const rangedBills = await db.Bill.findAll({
    where: {bill_date:{
        [Sequelize.Op.between]: [req.query.start, req.query.end]
      }}
  })
  // console.log(chalk.bgRedBright('query result select bills based on date range'), rangedBills)
  // console.log(chalk.bgRedBright('request'),req.query)

  res.json({rangedBills})
}

function deleteBill (req, res, next) {
  console.log('request', req)
  db.Bill.destroy({
    where:{id_internal_bill: req.body.bill}
  })
    .then(numeroRowCancellate =>
      res.status(200).json({numberDelR:numeroRowCancellate})
    )
    .catch(err=>console.log('erroreee', err))
}

module.exports = {rangeDates, deleteBill}
