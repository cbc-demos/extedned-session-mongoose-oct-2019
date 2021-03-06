const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const controller = require('./controller')

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/extSessionScraper'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

controller(app)

app.listen(PORT, () => console.log(`App is on http://localhost:${PORT}`))
