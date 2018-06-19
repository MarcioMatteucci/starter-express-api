const router = require('express').Router();

const authValidators = require('../validators/auth.validators');
const authMiddleware = require('../middlewares/auth.middleware');
const authController = require('../controllers/auth.controller');

// Crear cuenta
router.post('/signUp', authValidators.signUp, authController.signUp);

// Iniciar sesión
router.post('/signIn', authValidators.signIn, authController.signIn);

// Refrescar el token
router.get('/refreshToken', authValidators.refreshToken, authMiddleware.isAuth, authController.refreshToken);

// Consultar disponibilidad de nombre de usuario
router.get('/checkUsername', authValidators.checkUsername, authController.checkUsername);

// Consultar disponibilidad de email
router.get('/checkEmail', authValidators.checkEmail, authController.checkEmail);

module.exports = router;