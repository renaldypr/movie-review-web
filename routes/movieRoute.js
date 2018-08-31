const express = require('express');
const router = express.Router();
const movie=require('../controller/movieController')
const auth = require('../helpers/auth')


router.get('/', movie.findReview, movie.showAll)

router.get('/add', auth, function(req,res){
    res.render("addMovies")
})
router.post('/add',movie.addMovie)

router.get('/:id', movie.showMovieById, movie.countVote)

router.get('/:id/edit', auth, movie.showEdit)
router.post('/:id/edit', movie.edit)

router.get('/:id/delete', movie.erase)

router.get('/:id/addReview', auth, movie.showMovieForReview)
router.post('/:id/addReview', movie.findId, movie.postReview)

router.get('/:id/review/:idReview/', auth, movie.showReviewEdit)
router.post('/:id/review/:idReview/', movie.editReview)

router.get('/:id/review/:idReview/:status', movie.findUser, movie.addVote)



module.exports=router