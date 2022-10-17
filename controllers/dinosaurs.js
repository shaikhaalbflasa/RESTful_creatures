//import express
const express = require('express')
const router = express.Router()

//filesystem core module.
const fs = require('fs')

router.get('/',(req, res) => {
  //pull in Json DATA
  let dinosaurs = fs.readFileSync('./dinosaurs.json')
  // console.log(dinosaurs)
  //turns json date into a js object
  let dinoData = JSON.parse(dinosaurs)
  // console.log(dinoData)
  
  let nameFilter =req.query.nameFilter
  
  //if the use searched for somthing 
  if (nameFilter){
    dinoData = dinoData.filter(dino=>{
     return dino.name.toLowerCase()===nameFilter.toLowerCase()
    }
  )}
  res.render('dinosaurs/index', {myDinos: dinoData})
})

router.get('/new', (req, res) => {
  res.render('dinosaurs/new')
})

//because of the colume, it sholud be down , case it will be confuesd when it comes to index
router.get('/:idx', (req, res) => {
    // get dinosaurs
  let dinosaurs = fs.readFileSync('./dinosaurs.json')
  let dinoData = JSON.parse(dinosaurs)
  // console.log('This is the req.params object!', req.params)
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

router.delete('/:idx', (req, res) => {
 console.log('This is the req.params object!', req.params)

 let dinosaurs = fs.readFileSync('./dinosaurs.json')

  let dinoData = JSON.parse(dinosaurs)

  dinoData.splice(req.params.idx, 1)

  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

 res.redirect('/dinosaurs')
})

router.get('/edit/:idx' ,(req, res) =>{
 //grab data dino
 let dinosaurs = fs.readFileSync('./dinosaurs.json')
 let dinoData = JSON.parse(dinosaurs)

 //disply edit page
 res.render('dinosaurs/edit', {
  dino: dinoData[req.params.idx], 
  dinoId: req.params.idx
  })

})



router.put('/:idx', (req, res) => {
  //grab data dino vvv
  let dinosaurs = fs.readFileSync('./dinosaurs.json')
   //parse JSON data into JS object vv
  let dinoData = JSON.parse(dinosaurs)

  //update our din with form data
  dinoData[req.params.idx].name = req.body.name
  dinoData[req.params.idx].type = req.body.type

  //update pur json file with new date
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
//redirect to home page
  res.redirect('/dinosaurs');
})

module.exports = router