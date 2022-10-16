const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const app = express()

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({extended: false}))
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/creatures', require('./controllers/prehistoric_creatures'))



app.get('/', (req, res) => {
    res.redirect('/dinosaurs')
})

app.listen(3500,()=>{
    console.log('App listening on port 3500!')
})