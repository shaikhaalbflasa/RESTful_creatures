//import express
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')


//create an instance of express
const app = express()
const PORT = 3500

//MIDDLEWARE
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({extended: false}))

//controllers
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/creatures', require('./controllers/prehistoric_creatures'))
app.use('/home', require('./controllers/home'))


//HOME route
app.get('/', (req, res) => {
    res.redirect('/home')
})

//indicate a port to run the server on
app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}!`)
})