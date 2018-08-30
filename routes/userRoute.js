const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

router.get('/', (req,res) => {
  
})

router.get('/register', UserController.showAll)
router.post('/register', UserController.register)

module.exports = router;