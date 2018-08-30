const express = require('express');
const router = express.Router();
const movie=require('../controller/movieController')


router.get('/',movie.showAll)
router.get('/add',function(req,res){
    res.render("addMovies")
})

router.post('/add',movie.addMovie)

router.get('/:id', movie.showMovieById)



module.exports=router