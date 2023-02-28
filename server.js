'use strict'

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json())
const Book = require('./models/Book')

const seed = require('./lib/seed')

mongoose.connect(process.env.DATABASE_URL)

const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
	res.send('404 - page not found try /books')
})

// Seed the database with default books when this route is accessed
app.get('/books/seed', async (request, response) => {
	// return a list of books in the database
	const books = await Book.find() // returns [] if no books

	// if there are no books in the array returned seed the database
	if (books.length < 1) {
		seed() // seed the database with base data
		response.status(201).send('Successfully seeded books into database') // 201 means created successfully
	} else {
		response.status(200).send('Books exist, seeding skipped') // if books exist send a message
	}
})

// get all books
app.get('/books/all', async (request, response) => {
	const books = await Book.find()
	response.status(200).send(books)
})

// delete one specific book
app.delete('/books/delete/:id', async (request, response) => {
	// request.params Comes from the query string
	// like -> /books/:id = req.params.id

	// mongoose models have the findOne() method to search by a value like title:
	const bookToDelete = await Book.findOne({ title: request.params.id })

	try {
		// wait for mongoose to delete the specified book from the Book collection
		await Book.deleteOne(bookToDelete)
		response.status(200).send('deleted')
	} catch (error) {
		console.log(`Error deleting ${error}`)
		response
			.status(200)
			.send(`could not find a book called ${request.params.id}`)
	}
})

app.listen(PORT, () => console.log(`listening on ${PORT}`))
