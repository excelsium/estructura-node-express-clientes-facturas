'use strict'
const express = require('express');
const InvoiceController = require('../controllers/invoice.controller');

const api = express.Router();

api.get('/all/:customer?', InvoiceController.getAllInvoices);
api.get('/one/:invoiceId', InvoiceController.getInvoice);
api.post('', InvoiceController.createInvoice);
api.put('/:invoiceId', InvoiceController.updateInvoice);
api.delete('/:invoiceId', InvoiceController.deleteInvoice);

module.exports = api;