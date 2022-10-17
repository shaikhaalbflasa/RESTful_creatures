const express = require('express')
const router = express.Router()

// lists all creatures
router.get('/', (req, res) => {
    res.redirect('home')
})

module.exports = router