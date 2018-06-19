const { body, query, header } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const checkErrors = require('../services/validation.service');

module.exports = {

   signUp: [
      sanitize('name').trim().escape(),
      body('name', 'El nombre es requerido').exists(),
      body('name', 'El nombre debe entre 2 y 30 caracteres').isLength({ min: 2, max: 30 }),
      sanitize('lastname').trim().escape(),
      body('lastname', 'El apellido es requerido').exists(),
      body('lastname', 'El apellido debe entre 2 y 50 caracteres').isLength({ min: 2, max: 50 }),
      sanitize('username').trim().escape(),
      body('username', 'El usuario es requerido').exists(),
      body('username', 'El usuario debe entre 3 y 50 caracteres').isLength({ min: 3, max: 50 }),
      sanitize('password').trim().escape(),
      body('password', 'La contraseña es requerida').exists(),
      body('password', 'La contraseña debe entre 6 y 30 caracteres').isLength({ min: 6, max: 30 }),
      body('password', 'La contraseña no puede tener caracteres especiales (solo letras y números)').isAlphanumeric(),
      sanitize('email').trim().escape(),
      body('email', 'El email es requerido').exists(),
      body('email', 'No es un formato de email válido').isEmail(),
      sanitize('role').trim().escape(),
      body('role', 'No es un rol válido').optional().isIn(['admin', 'user']),
      body('image').optional(),
      checkErrors
   ],

   signIn: [
      sanitize('username').trim().escape(),
      body('username', 'El usuario es requerido').exists(),
      sanitize('password').trim().escape(),
      body('password', 'La contraseña es requerida').exists(),
      checkErrors
   ],

   refreshToken: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      checkErrors
   ],

   checkUsername: [
      query('username', 'El Nombre de Usuario es requerido').exists(),
      query('username', 'El usuario debe entre 3 y 50 caracteres').isLength({ min: 3, max: 50 }),
      checkErrors
   ],

   checkEmail: [
      query('email', 'El email es requerido').exists(),
      query('email', 'No es un formato de email válido').isEmail(),
      checkErrors
   ]

}