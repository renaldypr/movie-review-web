const express = require('express');
const router = express.Router();
const movie=require('../controller/movieController')


router.get('/', movie.findReview, movie.showAll)
router.get('/add',function(req,res){
    res.render("addMovies")
})

router.post('/add',movie.addMovie)

router.get('/:id', movie.showMovieById, movie.countVote)

router.get('/:id/addReview', movie.showAllUser, movie.showMovieForReview)
router.post('/:id/addReview', movie.postReview)


router.get('/:id/review/:idReview/:status', movie.addVote)



module.exports=router