const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

// router.get('/', (req,res) => {
//   res.render('add', {errors: req.session.erros});
//   req.session.errors = null;
// })

router.get('/register', UserController.showAll)
router.post('/register', UserController.register)

router.get('/login', (req,res) => {
  res.render('login')
})

module.exports = router;