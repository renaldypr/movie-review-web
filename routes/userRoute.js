const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

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