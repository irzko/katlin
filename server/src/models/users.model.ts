import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from './db';


class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare firstName: string;
  declare middleName: string;
  declare lastName: string;
  declare gender: number;
  declare birthday: Date;
  declare email: string;
  declare password: string;
  declare permissionLevel: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}


User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissionLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;