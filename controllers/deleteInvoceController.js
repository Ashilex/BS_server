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

function deleteBill () {

}

module.exports = {rangeDates, deleteBill}
