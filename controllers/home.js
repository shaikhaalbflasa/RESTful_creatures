const express = require('express')
const router = express.Router()

// displays all creatures
router.get('/',(req,res)=>{
    res.render('home')
    
})


module.exports = router