const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcryptjs');

module.exports = {

   // Crear el token
   signToken: (user) => {

      const payload = {
         sub: user._id,
         role: user.role,
         iat: moment().unix(), // Current time
         exp: moment().add(1, 'd').unix() // 1 dia hasta que expire el token
      }

      return { token: jwt.sign(payload, process.env.JWT_SECRET), exp: payload.exp };
   },

   // Hashear la password
   hashPassword: (password) => {
      return new Promise((resolve, reject) => {
         try {
            // Generar salt
            const salt = bcrypt.genSaltSync(10);
            // Generar password hash (salt + password)
            const passwordHash = bcrypt.hashSync(password, salt);
            resolve(passwordHash)
         } catch (err) {
            throw new Error(err);
         }
      });
   },

   // Validar la contraseña ingresada
   isValidPassword: (user, password) => {
      return new Promise((resolve, reject) => {
         try {
            resolve(bcrypt.compare(password, user.password));
         } catch (err) {
            throw new Error(err);
         }
      });
   },

   // Verificar el token
   verifyToken: (token) => {
      return new Promise((resolve, reject) => {
         try {
            const payload = jwt.decode(token, process.env.JWT_SECRET);

            if (payload.exp <= moment().unix()) {
               reject({
                  status: 401,
                  message: 'Token ha expirado'
               });
            }
            resolve(payload.sub)

         } catch (err) {
            reject({
               status: 500,
               message: 'Token Inválido'
            });
         }
      });
   }
}