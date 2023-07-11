const Sequelize = require("sequelize")


   const sequelize =  new Sequelize(process.env.DB_NAME, process.env.DB_PASSWORD, process.env.DB_USER_NAME, {
      host: process.env.DB_HOST,
      dialect: "postgres",
    });

exports.dbConnect = async() => {
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
