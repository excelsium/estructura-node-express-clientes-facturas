'use strict'
const express = require('express');
const InvoiceController = require('../controllers/invoice.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

const api = express.Router();

api.get('/all/:customer?', AuthMiddleware.isAuth, InvoiceController.getAllInvoices);
api.get('/one/:invoiceId', AuthMiddleware.isAuth, InvoiceController.getInvoice);
api.post('', AuthMiddleware.isAuth, InvoiceController.createInvoice);
api.put('/:invoiceId', AuthMiddleware.isAuth, InvoiceController.updateInvoice);
api.delete('/:invoiceId', AuthMiddleware.isAuth, InvoiceController.deleteInvoice);

module.exports = api;