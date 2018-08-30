const Movie = require('../models').Movie;
const User = require('../models').User;
const Review = require('../models').Review;
const Vote = require('../models').Vote; 
const getAverage = require('../helpers/getAverage');
const capitalizeFirstLetter = require('../helpers/capitalizeFirstLetter')


class movieController{
    static findReview(req,res,next) {
        Review.findAll()
            .then(reviews => {
                req.reviews = reviews
                next()
            })
            .catch(err => {
                res.send(err)
            })
    }
    
    static showAll(req,res){
        Movie.findAll().then(data=>{
            res.render('showMovies',{movie:data, reviews:req.reviews, avg: getAverage })
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
    
    static showMovieById(req,res, next) {
        Movie.findOne({
            where: {
                id: req.params.id
            },
            //include: [{ all: true, nested: true }]
            include: [User]
        })
        .then(movie => {
            // res.render('moviePage', {
            //     movie: movie,
            //     users: movie.Users
            // })
            //res.send(movie)
            req.movieData = movie
            next()
        })
        .catch(err => {
            res.send(err)
        })
    }

    static countVote(req,res) {
        Review.findAll({
            where: {
                movieId: req.params.id
            },
            include: [Vote]
        })
        .then(reviews => {
            //res.send(reviews)
            res.render('moviePage', {
                movie: req.movieData,
                users: req.movieData.Users,
                reviews: reviews
            })
        })
    }

    static showAllUser(req,res, next) {
        User.findAll()
            .then(users => {
                req.users = users
                next()
            })
            .catch(err => {
                res.send(err)
            })
    }

    static showMovieForReview(req, res) {
        Movie.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(movie => {
                res.render('addReview', {
                    movie: movie,
                    users: req.users
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postReview(req,res) {
        Review.create({
            userId: req.body.username,
            movieId: req.params.id,
            score: req.body.score,
            description: req.body.review
        })
            .then(() => {
                res.redirect(`/movies/${req.params.id}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addVote(req,res) {
        let status;
        if (req.params.status === 'upvote') {
            status = true;
        } else if (req.params.status === 'downvote') {
            status = false;
        }
        Vote.create({
            reviewId: req.params.idReview,
            vote_value: status
        })
            .then(() => {
                res.redirect(`/movies/${req.params.id}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static findByGenre(req,res,genre) {
        Movie.findAll({
            where: {
                genre: genre
            }
        })
            .then(movies => {
                res.render('searchMoviesByGenre', {
                    movies: movies,
                    genre: genre,
                    capitalizeFirstLetter: capitalizeFirstLetter
                })
            })
    }
    
    static findByRating(req,res,rating){
        Movie.findAll()
            .then(movies=>{
                res.render('searchMoviesByRating',{
                    movies:movies, 
                    reviews:req.reviews, 
                    rating: rating,
                    avg: getAverage
                })
            })
    }
}

module.exports=movieController;