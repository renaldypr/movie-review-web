const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.render('index', {
    loginStatus: req.session.user
  })
})


module.exports = router;