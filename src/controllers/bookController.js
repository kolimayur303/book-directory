const db = require('../config/db')
const Book = db.book;

//Get all books available in Directory.
const getAllBooks = async (req,res) => {

    Book.findAll({
        order: [['bookname', 'ASC']], // Order books alphabetically by book name
    })
    .then(data => {
        res.status(200).json({status:200,msg:'success',data:data});
    })
    .catch(err => {
        res.status(500).json({status:500,message: err.message});
    });

}

//Get particular book of given name
const getBook = async (req,res) => {

    await Book.findOne({
        where:{
            bookname:req.params.bookname
        }
    }).then(data => {
        res.status(200).json({status:200,msg:'success',data:data});
    })
    .catch(err => {
        res.status(500).json({status:500,message: err.message});
    });
  
}

//Add new book in Directory.
const addBook = async (req,res) => {

  try {
    const existingBook = await Book.findOne({
      where: {
        bookname: req.body.bookname
      }
    });
    if (existingBook) {   
      return res.json({ message: 'Book already available.' }); // If book is already present in Directory it should return Book already available.
    } else {
        const book = {
            bookname: req.body.bookname,
            author: req.body.author,
            price: req.body.price,
            quantity: req.body.quantity
        };
        
        // Save Book in database
            await Book.create(book)
            .then(data => {
                res.status(201).json({status:201,msg:'Book was added successfully',data:data});
            })
            .catch(err => {
                res.status(500).json({status:500,message: err.message});
            });

        }

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }

}

// Delete book of given name.
const deleteBook = async (req,res) => {

    const bookName = req.params.bookname

    try {

        const bookToDelete = await Book.findOne({
        where: {
            bookname: bookName
            }
        });
        if (!bookToDelete) {
        return res.status(404).json({ message: 'Book not found in the database.' });  //if book is not present in directory its return message book not avilable.
        }
        await bookToDelete.destroy();
        return res.status(200).json({ message: 'Book deleted successfully.' });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
}


const updateBook = async (req,res) => {

    var updateData = {
        bookname: req.body.bookname,
        author: req.body.author,
        price: req.body.price,
        quantity: req.body.quantity
    }
    await Book.update(updateData,{
        where:{
            bookname:req.params.bookname
        }
    })
    .then(data => {
        res.status(200).json({status:200,msg:'Book was updated successfully'});
    })
    .catch(err => {
        res.status(500).json({status:500,message: err.message});
    });

}

module.exports={

    getAllBooks,
    getBook,
    addBook,
    deleteBook,
    updateBook
}