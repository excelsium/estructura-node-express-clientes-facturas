'use strict'
const express = require('express');
const CustomerController = require('../controllers/customer.controller');

const api = express.Router();

api.get('', CustomerController.getAllCustomers);
api.get('/page', CustomerController.getAllCustomersPaginate);   // http://localhost:5000/api/customers/page?page=3
api.get('/:customerId', CustomerController.getCustomer);
api.post('', CustomerController.createCustomer);
api.put('/:customerId', CustomerController.updateCustomer);
api.delete('/:customerId', CustomerController.deleteCustomer);

module.exports = api;