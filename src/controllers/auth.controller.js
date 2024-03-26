const { Router } = require('express');
const passport = require('passport');
const { createHash } = require('../utils/utils');
const Users = require('../models/users.model');
const authService = require('../services/auth.services');
const { generateToken } = require('../utils/jwt-utils');
const NewAuthDto = require('../DTO/auth-users.dto');
const bcrypt = require('bcryptjs');
const ForgetPassUserDto = require('../DTO/forgetpass-users.dto');

const router = Router();

router.post('/', passport.authenticate('login', { failureRedirect: '/auth/fail-login' }), async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone, role } = req.user;

    // Generar token utilizando la función de jwt-utils.js
    const token = generateToken({
      _id: req.user.id,
      email: req.user.email,
    });

    // Establecer la cookie y responder con la información del usuario y el token
    res
      .cookie('authToken', token, {
        maxAge: 60000,
        httpOnly: true,
      })

      const authUserInfo = new NewAuthDto(req.user);
      const newAuth = await authService.createAuth(authUserInfo)
      console.log('newAuth'+newAuth)
    res.status(200).json({ first_name, last_name, email, role, phone, redirect: '/profile', payload:newAuth});
  } catch (error) {
    const errorMessage = customizeError('INTERNAL_SERVER_ERROR');
    throw new Error(errorMessage);
  }
});

router.get('/fail-login', (req, res) => {
  console.log('falló Login');
  res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
});

router.post('/forgotpassword', async (req, res) => {
  try {
    const { email, password } = req.body;
    const passwordEncrypted = createHash(password);

    await Users.updateOne({ email }, { password: passwordEncrypted });
    const authUserInfo = new ForgetPassUserDto(req.body);
    const newAuth = await authService.forgetPass(authUserInfo)

    res.status(200).json({ status: 'success', message: 'Contraseña actualizada' , payload:newAuth});
  } catch (error) {
    const errorMessage = customizeError('INTERNAL_SERVER_ERROR');
    throw new Error(errorMessage);
  }
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  // Generar token después de la autenticación exitosa
  const token = generateToken({
    _id: req.user._id,
    email: req.user.email,
  });

  // Establecer la cookie y redirigir al cliente a la página principal
  res
    .cookie('authToken', token, {
      maxAge: 60000,
      httpOnly: true,
    })
  res.redirect('/');
});


module.exports = router;