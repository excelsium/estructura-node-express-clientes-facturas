'use strict'
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 3000;
const mongoDbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test_cognitiva_db';

mongoose.connect(mongoDbUri, (err, res) => {

    if(err) {
        return console.log(`Error al conectar a la base de datos: ${err}`);
    }

    console.log('Conexión a la base de datos establecida correctamente');

    app.listen(port, () => {
        console.log(`Servidor API REST escuchando en ${host}:${port}`);
        console.log('========================================================');
    });
});