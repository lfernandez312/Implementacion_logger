const { Router } = require('express')
const privateAccess = require('../middlewares/auth.private.middlewares')
const publicAccess = require('../middlewares/auth.public.middlewares')

const router = Router()

router.get('/login',(req, res) => {
  res.render('login.handlebars', {estilo: 'login.css' })
})

router.get('/signup', publicAccess, (req, res) => {
  res.render('signup.handlebars', {estilo: 'login.css' })
})

router.get('/profile', privateAccess, (req, res) => {
  const { first_name,last_name,email,role, token } = req.user
  const isAdmin = role === 'admin';
  res.render('profile.handlebars', { first_name, last_name, email, role, token, estilo: 'login.css', isAdmin})
})

router.get('/forgotPassword', (req, res) => {
  res.render('forgot-password.handlebars', {estilo: 'login.css' })
})

module.exports = router