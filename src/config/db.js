const {Sequelize,DataTypes,Model} = require('sequelize');
const dotenv = require("dotenv");

dotenv.config();

// Passing parameters separately (other dialects)
const sequelize = new Sequelize('book', process.env.USER_NAME, process.env.USER_PASSWORD, {
    host: 'localhost',
    logging : false,
    dialect: 'mysql'
  });

  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    
  })();

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.book = require('../models/book')(sequelize,DataTypes,Model);
  
  db.sequelize.sync({ force: false });
  module.exports = db;