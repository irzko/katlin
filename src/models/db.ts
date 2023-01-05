import { Sequelize } from 'sequelize';
const sequelizeConnection = new Sequelize('mysql://root:mysql@localhost:3306/katlin_db');

sequelizeConnection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

export default sequelizeConnection;
