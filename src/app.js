'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes');

const app = express();

// Configuración de cabeceras http (CORS)
app.use(cors({
    origin: ['http://localhost:5000', 'http://127.0.0.1:5000']
}));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas bases
apiRoutes(app);

module.exports = app;