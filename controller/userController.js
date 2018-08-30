const User = require('../models').User;

class UserController {
  static register(req,res) {
    User.create({
      username: req.body.username,
      password: req.body.password,
      gender: req.body.gender,
      email: req.body.email
    })
      .then(() => {
        res.redirect('/user/register')
      })
      .catch(err => {
        res.send(err)
      })
  }
  
  static showAll(req,res) {
    User.findAll()
      .then(users => {
        res.render('userRegister', {
          users: users
        })
      })
  }
}

module.exports = UserController;