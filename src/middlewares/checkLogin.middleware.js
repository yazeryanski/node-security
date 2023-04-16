function checkLogin(req, res, next) {
  console.log(req.session.passport.user, 'WTF')
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).send('<h4>Access Denied.</h4>');
  }
  next();
}

module.exports = checkLogin;