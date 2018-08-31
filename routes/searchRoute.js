const express = require('express');
const router = express.Router();
const Movie = require('../controller/movieController')

router.get('/', (req,res) => {
  res.render('searchMovie')
})
router.post('/genre',(req,res)=>{
  let genre = req.body.genre;
  Movie.findByGenre(req,res,genre);
})

router.post('/rating', Movie.findReview, (req,res)=>{
  let rating = req.body.rating;
  Movie.findByRating(req,res,rating);
})

// router.get('/genre')
// router.get('/rating')

module.exports = router;