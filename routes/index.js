const express = require('express');
const router = express.Router();

const home = require('./homeRoute');
const user = require('./userRoute');
const movie= require('./movieRoute');
const search = require('./searchRoute');

router.use('/', home)
router.use('/user', user);
router.use('/movies',movie)
router.use('/search', search);


module.exports = router;