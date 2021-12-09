const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey:true },
    codice: {type: DataTypes.INTEGER, allowNull: false}
  };
  const options = {
    tableName: 'codici',
    timestamps: false
  }

  return sequelize.define('Codice', attributes, options);
}
