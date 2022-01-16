'use strict'
const express = require('express');
const CustomerController = require('../controllers/customer.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

const api = express.Router();

api.get('', AuthMiddleware.isAuth, CustomerController.getAllCustomers);
api.get('/page', AuthMiddleware.isAuth, CustomerController.getAllCustomersPaginate);   // http://localhost:5000/api/customers/page?page=3
api.get('/:customerId', AuthMiddleware.isAuth, CustomerController.getCustomer);
api.post('', AuthMiddleware.isAuth, CustomerController.createCustomer);
api.put('/:customerId', AuthMiddleware.isAuth, CustomerController.updateCustomer);
api.delete('/:customerId', AuthMiddleware.isAuth, CustomerController.deleteCustomer);

module.exports = api;