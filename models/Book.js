const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    status: Object,

});

Book = mongoose.model('Book', bookSchema)

async function seed(){
  await Book.create({
        title: 'Harry Potter',
        author: 'J. K. Rowling',
        description: 'Orphan Harry learns he is a wizard on his 11th birthday when Hagrid escorts him to magic-teaching Hogwarts School. As a baby, his mothers love protected him and vanquished the villain Voldemort, leaving the child famous as The Boy who Lived. With his friends Hermione and Ron, Harry has to defeat the returned He Who Must Not Be Named.',
        status: {Sheldon: 'Sheldon: Watched the movies', Darran: 'Listened to the audio books', Ethan: 'Watched the movie'}
        });
    
       console.log('saved Harry Potter')

    await Book.create({
        title: 'Lord of the Rings',
        author: 'J. R. R. Tolkien',
        description: 'The Lord of the Rings is an epic high-fantasy novel by English author and scholar J. R. R. Tolkien.',
        status: {Sheldon: 'Sheldon: Watched the movies', Darran: 'Watched the movies', Ethan: 'Watched the movie'}
    });
    console.log('saved Lord of the Rings');

    await Book.create({
        title: 'Fablehaven',
        author: 'Brandon Mull',
        description: 'For centuries mystical creatures of all description were gathered into a hidden refuge called Fablehaven to prevent their extinction. The sanctuary survives today as one of the last strongholds of true magic.',
        status: {Sheldon: 'never heard of it', Darran: 'never heard of it', Ethan: 'Read all the books'}
    });
    console.log('save Fablehaven')

    mongoose.disconnect();
}

// seed();

module.exports = Book