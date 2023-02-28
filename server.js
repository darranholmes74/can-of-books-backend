'use strict'

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json())
const Book = require('./models/Book')
const bookRoute = require('./routes/books')

const seed = require('./lib/seed')

mongoose.connect(process.env.DATABASE_URL)

const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
	res.send('404 - page not found try /books')
})

app.use('/books', bookRoute)

// Seed the database with default books when this route is accessed

app.listen(PORT, () => console.log(`listening on ${PORT}`))
