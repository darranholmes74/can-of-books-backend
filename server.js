'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
const Book = require('./models/Book')

mongoose.connect(process.env.DATABASE_URL);


const PORT = process.env.PORT || 3001;

app.get('/test', async (request, response) => {
  const books = await Book.find()
  response.send(`'test request received', ${books}`);
  // await Book.deleteMany({title: 'Harry Potter'})
  // await Book.deleteMany({title: 'Lord of the Rings'});
  // await Book.deleteMany({title: 'Fablehaven'});
});



app.listen(PORT, () => console.log(`listening on ${PORT}`));
