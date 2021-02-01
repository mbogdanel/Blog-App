const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { render } = require('ejs')
const blogRoutes = require('./routes/blogRoutes')

// express app

const app = express()

let port = process.env.PORT || 3000

//  connect do MongoDB
const dbURI =
  'mongodb+srv://MariusNode:1234@cluster0.7ipzk.mongodb.net/node-tutorial?retryWrites=true&w=majority'
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs')

// middleware $ static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
// app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'about' })
})

//blog routes
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})
