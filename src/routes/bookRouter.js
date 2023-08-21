// routes/books.js
const express = require('express');
const router = express.Router();
const booksController = require('../controllers/bookController');

router.get('/search/:bookname', booksController.getBook);
router.get('/get_books', booksController.getAllBooks);
router.post('/add', booksController.addBook);
router.delete('/delete/:bookname', booksController.deleteBook);
router.put('/update/:bookname', booksController.updateBook);

module.exports = router;
