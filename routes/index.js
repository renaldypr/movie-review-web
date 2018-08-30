const express = require('express');
const router = express.Router();

const home = require('./homeRoute')
const user = require('./userRoute');

router.use('/', home)
router.use('/user', user);

module.exports = router;