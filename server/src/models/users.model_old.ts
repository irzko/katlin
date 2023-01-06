import sequelizeConnection from './db';
import { Sequelize, Model, DataTypes } from 'sequelize';



const User = sequelizeConnection.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING(128),
    },
    lastName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    gender: {
      type: DataTypes.INTEGER,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  User,
};
