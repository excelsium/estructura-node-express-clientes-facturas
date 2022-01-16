'use strict'
const userRoutes = require('./user.route');
const customerRoutes = require('./customer.route');
const invoiceRoutes = require('./invoice.route');

const createRoutes = (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/customers', customerRoutes);
    app.use('/api/invoices', invoiceRoutes);
}

module.exports = createRoutes;