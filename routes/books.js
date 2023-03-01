const express = require('express')
const router = express.Router()
const Book = require('../models/Book')
const mongoose = require('mongoose')
const seed = require('../lib/seed')

router.get('/seed', async (request, response) => {
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
router.get('/all', async (request, response) => {
	const books = await Book.find()
	response.status(200).send(books)
})

// delete one specific book
router.delete('/delete/:id', async (request, response) => {
	// request.params Comes from the query string
	// like -> /books/:id = req.params.id

	// mongoose models have the findOne() method to search by a value like title:
	const bookToDelete = await Book.findOne({ title: request.params.id })

	try {
		// wait for mongoose to delete the specified book from the Book collection
		await Book.deleteOne(bookToDelete)
		response.status(202).send('deleted')
	} catch (error) {
		console.log(`Error deleting ${error}`)
		response
			.status(500)
			.send(`could not find a book called ${request.params.id}`)
	}
})

router.post('/new', async (request, response) => {
	try {
		const newBook = await Book.create(request.body)
		response.status(201).send(newBook)
	} catch (error) {
		console.error(error)
		response.status(500).send(Error)
	}
})

router.put('/update/:id', async(request, response) => {
	
	try {
		const updatedBook = await Book.findOneAndUpdate({title: request.params.id}, request.body, {new: true})
		response.status(202).send(updatedBook)
	} catch (error) {
		console.log(`Error Updating ${error}`)
		response
			.status(500)
			.send(`could not update a book called ${request.params.id}`)
	}
})

module.exports = router
