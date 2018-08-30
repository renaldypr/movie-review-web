const Movie = require('../models').Movie;


class movieController{
    static showAll(req,res){
        Movie.findAll().then(data=>{
            res.render('showMovies',{movie:data})
        })
    }

    static addMovie(req,res) {
    Movie.create({
        title: req.body.title,
        genre: req.body.genre
    })
    .then(() => {
        res.redirect('/movies')
    })
    .catch(err => {
        res.send(err)
    })
    } 
    
    // static showMovieById(req,res) {
    //     Movie.findOne({
    //         where: {
    //             id: req.params.id
    //         }, {
    //             include: []
    //         }
    //     })
    //     .then(movie => {
    //         res.render('moviePage', {

    //         })
    //     })
    // }
}

module.exports=movieController;