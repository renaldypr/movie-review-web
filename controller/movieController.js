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
        Movie.findAll({
            order: [['title', 'ASC']]
        }).then(data=>{
            res.render('showMovies',{movie:data, reviews:req.reviews, avg: getAverage, loginStatus: req.session.user})
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
            //res.send(req.movieData.Users)
            res.render('moviePage', {
                movie: req.movieData,
                users: req.movieData.Users,
                reviews: reviews,
                loginStatus: req.session.user
            })
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
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static findId(req,res, next) {
        User.findOne({
            where: {
                username: req.session.user
            }
        })
            .then(user => {
                req.userId = user.id
                next()
            })
    }

    static postReview(req,res) {
        Review.create({
            userId: req.userId,
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

    static findUser(req,res, next) {
        User.findOne({
            where: {
                username: req.session.user
            },
            include: [Vote]
        })
            .then(user => {
                let votes = user.Votes
                let sudahVote = false
                let voteId
                for (let i = 0; i < votes.length; i++) {
                    if (votes[i].reviewId === Number(req.params.idReview)) {
                        sudahVote = true;
                        voteId = votes[i].id
                        break;
                    }
                }
                req.user = user;
                req.sudahVote = sudahVote;
                req.voteId = voteId
                next()
            })
    }

    static addVote(req,res) {
        let status;
        if (req.params.status === 'upvote') {
            status = true;
        } else if (req.params.status === 'downvote') {
            status = false;
        }
        //res.send(req.sudahVote)
        //jika dia belum voting di review id tersebut maka create , kalau sudah update
        if (!req.sudahVote) {
            Vote.create({
                reviewId: req.params.idReview,
                userId: req.user.id,
                vote_value: status
                
            })
                .then(() => {
                    res.redirect(`/movies/${req.params.id}`)
                })
                .catch(err => {
                    res.send(err)
                }) 
        } else {
            Vote.update({
                vote_value: status
            }, {
                where: {
                    id: req.voteId
                }
            })
                .then(() => {
                    res.redirect(`/movies/${req.params.id}`)
                })
                .catch(err => {
                    res.send(err)
                }) 
        }
        
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

    static showReviewEdit(req,res) {
        Review.findOne({
            where: {
                id: req.params.idReview
            }
        })
            .then(review => {
                res.render('editReview', {
                    review: review,
                    errors: undefined,
                    movieId: req.params.id
                })
            })
    }

    static editReview(req,res) {
        Review.update({
            score: req.body.score,
            description: req.body.description
        }, {
            where: {
                id: req.params.idReview
            }
        })
            .then(() => {
                res.redirect(`/movies/${req.params.id}`)
            })
    }

    static showEdit(req,res) {
        Movie.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(movie => {
                res.render('editMovie', {
                    movie: movie,
                    errors: undefined
                })
            })
    }

    static edit(req,res) {
        Movie.update({
            title: req.body.title,
            genre: req.body.genre
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.redirect('/movies')
            })
    }

    static erase(req,res) {
        Movie.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.redirect('/movies')
            })
    }
}

module.exports=movieController;