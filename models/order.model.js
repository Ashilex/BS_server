const { DataTypes } = require('sequelize');

module.exports = model

function model(sequelize) {
  const attributes = {
    id_external_order:{ type: DataTypes.INTEGER(11), primaryKey: true},
    id_external_reference_type:{ type: DataTypes.INTEGER(11)},
    id_company:{ type: DataTypes.INTEGER(11)},
    number_external_order:{ type: DataTypes.TEXT},
    sal:{ type: DataTypes.TEXT},
    date_notification_order:{ type: DataTypes.DATE},
    date_notification_sal:{ type: DataTypes.DATE},
    total_order:{ type: DataTypes.DECIMAL(10, 2)},
    total_sal:{ type: DataTypes.DECIMAL(10,2)},
    with_iva:{ type: DataTypes.SMALLINT(6), default: 0},
    id_internal_bill:{ type: DataTypes.INTEGER(11)},
    note:{ type: DataTypes.TEXT}
  };

  const options = {
    tableName: 't_external_reference',
    timestamps: false
  }

  return sequelize.define('Order', attributes, options);

}
