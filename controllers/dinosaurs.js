const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/',(req, res) => {
  let dinosaurs = fs.readFileSync('./dinosaurs.json')
  let dinoData = JSON.parse(dinosaurs)
  res.render('dinosaurs/index', {myDinos: dinoData})
})

router.get('/new', (req, res) => {
  res.render('dinosaurs/new')
})

router.get('/:idx', (req, res) => {
    // get dinosaurs
  let dinosaurs = fs.readFileSync('./dinosaurs.json')
  let dinoData = JSON.parse(dinosaurs)
  console.log('This is the req.params object!', req.params)
  let dinoIndex = parseInt(req.params.idx)
  res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})

})

router.post('/',(req, res) => {
    // read dinosaurs file
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
  let dinoData = JSON.parse(dinosaurs);

  // add item to dinosaurs array
  dinoData.push(req.body);

  // save dinosaurs to the data.json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));

  //redirect to the GET /dinosaurs route (index)
  res.redirect('/dinosaurs');
    
})



module.exports = router