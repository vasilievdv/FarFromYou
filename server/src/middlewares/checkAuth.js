const checkAuth = (req, res, next) => {
  console.log('tyt');
  if (!req.session.user) {
    console.log('no session');
    return res.sendStatus(401);
  }
  console.log('user in check ');
  return next();
};

module.exports = checkAuth;
