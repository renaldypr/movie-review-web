const express = require('express');
const router = express.Router();
const movie=require('../controller/movieController')


router.get('/',movie.showAll)
router.get('/add',function(req,res){
    res.render("addMovies")
})
router.post('/add',movie.addMovie)



module.exports=router