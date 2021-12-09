const { DataTypes } = require('sequelize');

module.exports = model

function model(sequelize) {
  const attributes = {
    id_company:{ type: DataTypes.INTEGER(11), primaryKey: true},
    name:{ type: DataTypes.STRING(50)},
    p_iva:{ type: DataTypes.STRING(20)},
    cf:{ type: DataTypes.STRING(16)}
  };

  const options = {
    tableName: 't_company',
    timestamps: false
  }

  return sequelize.define('Company', attributes, options);

}
