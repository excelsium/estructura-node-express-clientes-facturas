'use strict'
const jwt = require('jwt-simple');
const moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.SECRET_TOKEN || 'clave_secreta_jwt';

exports.isAuth = (req, res, next) => {
    //
    if(!req.headers.authorization) {
        //
        return res.status(403).send({ message: 'La petición no tiene la cabecera de autenticación' });
    }

    let token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'El Token ha expirado' })
        }

    } catch (ex) {
        console.log(ex);
        return res.status(403).send({ message: 'Token no válido' });
    }

    req.user = payload;

    next();
}