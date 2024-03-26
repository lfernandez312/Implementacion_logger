function publicAccess(req, res, next) {
  if (req.user) {
    res.redirect('/')
  }

  next()
}

module.exports = publicAccess
