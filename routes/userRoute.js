const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

var auth = function(req, res, next) {
  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

router.get('/register', (req,res) => {
  res.render('userRegister', {errors:undefined})
})
router.post('/register', UserController.register)

router.get('/login', (req,res) => {
  res.render('login')
});
router.post('/login', UserController.login)

router.get('/profile', UserController.findOne)
router.post('/profile', UserController.edit)

router.get('/logout', UserController.logout)

module.exports = router;