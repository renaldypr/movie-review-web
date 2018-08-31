var auth = function(req, res, next) {
  if (req.session.user)
    return next();
  else
    return res.render('error');
};

module.exports = auth;