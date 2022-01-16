'use strict'
const jwt = require('jwt-simple');
const moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.SECRET_TOKEN || 'clave_secreta_jwt';

exports.createToken = (user) => {
    var payload = {
        sub: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };
    return jwt.encode(payload, secret);
}