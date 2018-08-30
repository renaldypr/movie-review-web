const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.render('searchMovie')
})

router.post('/')

// router.get('/genre')
// router.get('/rating')

const search = require('./searchRoute');

router.use('/', home);
router.use('/user', user);
router.use('/search', search);

module.exports = router;