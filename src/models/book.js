module.exports = (sequelize,DataTypes,Model) => {

class Book extends Model {}

Book.init({ 
  // Model attributes are defined here
  bookname: {
    type: DataTypes.STRING
    // allowNull: false
  },
  author: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  price: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  quantity: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  }
}, {
   // Other model options go here
   sequelize, // we need to pass the connection instance
   modelName: 'Book',
   tablename:'books', // we need to choose the model name
   timestamps:false
});

// `sequelize.define` also returns the model
console.log(Book === sequelize.models.Book); // true

return Book;
}
