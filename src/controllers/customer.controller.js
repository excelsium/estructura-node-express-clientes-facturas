'use strict'
const res = require('express/lib/response');
const Customer = require('../models/customer.model');
const Invoice = require('../models/invoice.model');

const getAllCustomersPaginate = async (req, res) => {
    //
    const itemsPerPage = 3;
    const page  = parseInt(req.query.page);
    const start = ( page - 1 ) * itemsPerPage;
    const total = await Customer.count({});

    const customers = await Customer.find({}).skip(start).limit(itemsPerPage);

    if(customers) {
        res.status(200).send({
            "page": page,
            "per_page": itemsPerPage,
            "total": total,
            "total_pages": Math.ceil(total/itemsPerPage),
            "data": customers
        });
    } else {
        res.status(404).send({ message: 'No se encontraron clientes en el sistema' });
    }
}

const getAllCustomers = async (req, res) => {
    //
    const customers = await Customer.find().select({ __v: 0});

    if(customers) {
        res.status(200).send({ customers });
    } else {
        res.status(404).send({ message: 'No se encontraron clientes en el sistema' });
    }
}

const getCustomer = async (req, res) => {
    //
    try {
        const { customerId } = req.params;

        const customer = await Customer.findById(customerId).select({ _id: 1, __v: 0 });

        if(customer) {
            res.status(200).send({ customer });
        } else {
            res.status(404).send({ message: 'Cliente no encontrado en el sistema' });
        }
    } catch (e) {
        res.status(500).send({ message: `Se ha producido el siguiente error: ${e.message}` });
    }
}

const createCustomer = async (req, res) => {
    //
    try {
        const { name, lastname, email, phone, position, company } = req.body;

        const customer = await Customer.create({
            name, 
            lastname, 
            email, 
            phone, 
            position, 
            company
        });

        if(customer) {
            res.status(200).send({ customer, message: 'Cliente creado correctamente' });
        } else {
            res.status(404).send({ message: 'Error al crear al cliente' });
        }
        
    } catch (e) {
        res.status(500).send({ message: `Se ha producido el siguiente error: ${e.message}` });
    }
}

const updateCustomer = async (req, res) => {
    //
    try {
        const customerId = req.params.customerId;
        const { name, lastname, email, phone, position, company } = req.body;

        const updatedCustomer = await Customer.findOneAndUpdate({_id: customerId}, {
            name, 
            lastname, 
            email, 
            phone, 
            position, 
            company
        });

        if(updatedCustomer) {
            res.status(200).send({ updatedCustomer, message: 'Cliente actualizado correctamente' });
        } else {
            res.status(404).send({ message: 'Error al actualizar al cliente' });
        }

    } catch (e) {
        res.status(500).send({ message: `Se ha producido el siguiente error: ${e.message}` });
    }
}

const deleteCustomer = async (req, res) => {
    //
    try {
        const customerId = req.params.customerId;

        const deletedCustomer = await Customer.deleteOne({ _id: customerId });

        if(deletedCustomer.deletedCount > 0) {
            //
            const deletedInvoice = await Invoice.deleteMany({ customer: customerId });

            if(deletedInvoice.deletedCount > 0) {
                res.status(200).send({ message: 'El cliente y sus facturas han sido eliminados correctamente' });
            } else {
                res.status(404).send({ message: 'Cliente eliminado sin facturas asociadas' });
            }
        } else {
            res.status(404).send({ message: 'Error al eliminar al cliente' });
        }

    } catch (e) {
        res.status(500).send({ message: `Se ha producido el siguiente error: ${e.message}` });
    }
}

module.exports = {
    getAllCustomersPaginate,
    getAllCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
}