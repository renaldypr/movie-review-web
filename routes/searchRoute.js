const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.render('searchMovie')
})

router.post('/')

// router.get('/genre')
// router.get('/rating')

module.exports = router;