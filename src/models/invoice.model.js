'use strict'
const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const InvoiceSchema = Schema({
    title: { type: String, required: true },
    date: { type: String, default: moment().format("DD/MM/YYYY HH:mm:ss") },
    description: { type: String, required: true },
    observation: String,
    totalItems: { type: Number, default: 0},
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);