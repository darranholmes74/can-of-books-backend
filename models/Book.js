const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    status: Object,

});

Book = mongoose.model('Book', bookSchema)

module.exports = Book