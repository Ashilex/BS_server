const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    id_staff: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    account: {type: DataTypes.STRING(10), allowNull: true},
    password: {type: DataTypes.STRING(10), allowNull: true},
    name: { type: DataTypes.TEXT, allowNull: false },
    surname: { type: DataTypes.TEXT, allowNull: false },
    birth_day: { type: DataTypes.DATE, allowNull: true },
    ci:{type: DataTypes.STRING(15), allowNull:true},
    residency_permit: { type: DataTypes.STRING(20), allowNull: false },
    cf:{type: DataTypes.STRING(16)},
    email:{type: DataTypes.STRING(16)},
    note:{type: DataTypes.TEXT},
    token:{type: DataTypes.STRING(20)},
    active:{type: DataTypes.TINYINT(1), default:0},
  };

  const options = {
    tableName: 't_staff',
    timestamps: false
  }

  return sequelize.define('User', attributes, options);
}
