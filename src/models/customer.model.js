'use strict'
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },
    position: String,
    company: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);