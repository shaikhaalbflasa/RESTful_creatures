//nmp i expess express-ejs-layouts method-override
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const app = express()
const PORT = 3500


//middleware 
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(methodOverride('_method'))

app.use((req,res ,next)=>{
    console.log(`Request at for ${req.method} at ${req.path}`)
    next()
})

app.use(express.urlencoded({extended: false}))

 //routes
app.use('/dinosaurs',require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures',require('./controllers/prehistoric_creatures'))
app.use('/home',require('./controllers/home'))


app.get('/',(req,res)=>{
    res.redirect('/home')
})

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`)
})