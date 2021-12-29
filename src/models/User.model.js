import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";
import { Sequelize } from "sequelize";
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },

  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userRole: {
    type: Sequelize.ENUM,
    values: ['normal', 'admin'],
    defaultValue: 'normal'
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: true,

  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,

  },
});

export default User;