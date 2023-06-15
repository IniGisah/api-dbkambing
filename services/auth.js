function isAuth(req, res, next) {
    const auth = req.headers.authorization;
    if (auth === 'password akses database') {
      next();
    } else {
      res.status(401);
      res.send('Access forbidden');
    }
}

module.exports = {isAuth}