'use strict'
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, unique: true, required: true, lowercase: true},
    password: { type: String, required: true},
    role: { type: String, required: true},
    signUpDate: { type: Date, default: Date.now() },
    lastLogin: Date
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);