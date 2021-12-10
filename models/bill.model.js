const { DataTypes } = require('sequelize');

module.exports = model

function model(sequelize) {
  const attributes = {
    id_internal_bill:{ type: DataTypes.INTEGER, primaryKey: true, notNull:true},
    id_bs:{ type: DataTypes.TEXT},
    id_bs_personal_data_business:{ type: DataTypes.INTEGER},
    id_company:{ type: DataTypes.INTEGER, notNull: true},
    bill_date:{ type: DataTypes.DATE, notNull: true},
    date_notification:{ type: DataTypes.DATE, notNull: true},
    date_transaction:{ type: DataTypes.DATE, notNull: true},
    date_currency:{ type: DataTypes.DATE, notNull: true},
    total:{ type: DataTypes.DECIMAL(10,2), notNull: true},
    with_iva:{ type: DataTypes.SMALLINT, default: 0, notNull: true},
    iva_total:{ type: DataTypes.DECIMAL(10,2), notNull: true},
    remaining_cost:{ type: DataTypes.DECIMAL(10,2), notNull: true},
    id_internal_bill_status:{ type: DataTypes.INTEGER},
    payment_to_GG_days:{ type: DataTypes.INTEGER, notNull: true},
    months_payment_expected:{ type: DataTypes.DATE, notNull: true},
    file_name:{ type: DataTypes.TEXT, notNull: true},
    note:{ type: DataTypes.TEXT, notNull: true}

  };

  const options = {
    tableName: 't_internal_bill',
    timestamps: false
  }

  return sequelize.define('Order', attributes, options);

}
