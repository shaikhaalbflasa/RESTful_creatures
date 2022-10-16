const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/',(req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)
    res.render('prehistoric_creature/index', {myCreatures: creaturesData})
})

router.get('/new', (req, res) => {
    res.render('prehistoric_creature/new')
})

router.get('/:idx', (req, res) => {
    // get creatures
  let creatures = fs.readFileSync('./prehistoric_creatures.json')
  let creaturesData = JSON.parse(creatures)
  console.log('This is the req.params object!', req.params)
  let creaturesIndex = parseInt(req.params.idx)
  res.render('prehistoric_creature/show', {myCreatures: creaturesData[creaturesIndex]})

})

app.post('/prehistoric_creature', (req, res) => {
    // read creatures file
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creaturesData = JSON.parse(creatures)
  
    // add item to creatures array
    creaturesData.push(req.body)
  
    // save dinosaurs to the data.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
  
    //redirect to the GET /creatures route (index)
    res.redirect('/prehistoric_creature')
})

module.exports = router