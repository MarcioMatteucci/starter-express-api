// 3rd party Modules
const mongoose = require('mongoose');

// Custom files
const app = require('./src/app');

// Environment
require('dotenv').config();

// Port
const port = process.env.PORT || 3000

// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.LOCALDB_URI).then(
   () => {
      console.log('Conectado a la db: ' + process.env.LOCALDB_URI);
      // Start server
      app.listen(port, () => {
         console.log(`Server escuchando en el puerto ${port}`);
      });
   },
   (err) => { console.log('Error al conectar a la db: ' + err); }
);
