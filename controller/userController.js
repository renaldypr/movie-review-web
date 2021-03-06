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
        res.redirect('/')
      })
      .catch(err => {
        let arr = [];
        for (let i = 0; i < err.errors.length; i++) {
          arr.push(err.errors[i].message)
        }
        res.render('userRegister', {
          errors: arr
        })
      })
  }

  static login(req,res) {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(user => {
        if (!user) {
          res.redirect('/user/login')
        } else if (user.validPassword(req.body.password)) {
          req.session.user = user.username
          res.redirect('/')
        } else {
          res.redirect('/user/login')
        }
      })
  }

  static logout(req,res) {
    req.session.destroy();
    res.redirect('/')
  }

  static findOne(req,res) {
    User.findOne({
      where: {
        username: req.session.user
      }
    })
      .then(user => {
        res.render('userProfile', {
          user: user,
          errors: undefined
        })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static edit(req,res) {
    User.update({
      username: req.body.username,
      password: req.body.password,
      gender: req.body.gender,
      email: req.body.email
    }, {
      where: {
        username: req.session.user
      }
    })
      .then(() => {
        res.redirect('/')
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = UserController;