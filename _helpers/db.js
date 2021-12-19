const config = require('../config.json');
const maria = require('mariadb')
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  // const { host, port, user, password, database } = config.database;
  // const connection = await maria.createConnection({ host, port, user, password });
  // await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  // const sequelize = new Sequelize(database, user, password, { dialect: 'mariadb' });
  const sequelize = new Sequelize('black_skip_db', config.database.user, config.database.password, {
    host: config.database.host,
    dialect: 'mariadb'
  });


  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  // init models and add them to the exported db object
  // db.User = require('../users/user.model')(sequelize);
  db.Codice = require('../models/codice.model')(sequelize);
  db.User = require('../models/user.model')(sequelize);
  db.Company = require('../models/company.model')(sequelize);
  db.Order = require('../models/order.model')(sequelize);
  db.Bill = require('../models/bill.model')(sequelize)

  db.Company.hasOne(db.Order, {
    foreignKey: {
      name: 'id_company',
      allowNull: true
    }
  });
  db.Order.belongsTo(db.Company, {foreignKey: 'id_company'});

  db.sequelize = sequelize
  // sync all models with database
  // await sequelize.sync();

}
