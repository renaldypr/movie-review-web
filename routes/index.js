const express = require('express');
const router = express.Router();

const home = require('./homeRoute')
const user = require('./userRoute');
const movie= require('./movieRoute')

router.use('/', home)
router.use('/user', user);
router.use('/movies',movie)


module.exports = router;