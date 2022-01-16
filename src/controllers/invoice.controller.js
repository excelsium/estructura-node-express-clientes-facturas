'use strict'
const Invoice = require('../models/invoice.model');

function getAllInvoices(req, res) {
    //
    const customerId = req.params.customer;

    if (!customerId) {
        var find = Invoice.find({}).sort('title');
    } else {
        var find = Invoice.find({ customer: customerId }).sort('date');
    }

    find.populate({ path: 'customer' }).exec( (err, invoices) => {
        //
        if(err) {
            res.status(500).send({ message: 'Error en la petición: ' + err });
        } else {
            if(!invoices) {
                res.status(404).send({ message: 'No se encontraron clientes en el sistema' });
            } else {
                res.status(200).send({ invoices });
            }
        }
    });
}

function getInvoice(req, res) {
    //
    const invoiceId = req.params.invoiceId

    Invoice.findById(invoiceId).populate({ path: 'customer'}).exec( (err, invoice) => {
        //
        if(err) {
            res.status(500).send({ message: `Error en la petición: ${err}` });
        } else {
            if(!invoice) {
                res.status(404).send({ message: 'La factura no existe en el sistema' });
            } else {
                res.status(200).send({ invoice, message: 'Factura encontrado correctamente' });
            }
        }
    });
}

function createInvoice(req, res) {
    //
    const invoice = new Invoice();

    const params = req.body;
    invoice.title = params.title;
    // invoice.date = params.date;
    invoice.description = params.description;
    invoice.observation = params.observation;
    invoice.totalItems = params.totalItems;
    invoice.customer = params.customer;

    invoice.save( (err, invoiceStored ) => {
        //
        if(err) {
            res.status(500).send({ message: 'Error al crear la factura: ' + err });
        } else {
            if(!invoiceStored) {
                res.status(404).send({ message: 'No se ha insertado la factura en la base de datos' });
            } else {
                res.status(200).send({ invoice: invoiceStored, message: "Factura creado correctamente" });
            }
        }
    });
}

function updateInvoice(req, res) {
    //
    const invoiceId = req.params.invoiceId;
    const update = req.body;

    Invoice.findByIdAndUpdate(invoiceId, update, (err, invoiceUpdated) => {
        //
        if(err) {
            res.status(500).send({ message: `Error en el servidor: ${err}` });
        } else {
            if(!invoiceUpdated) {
                res.status(404).send({ message: 'No se ha podido actualizar la factura' });
            } else {
                res.status(200).send({ invoice_before: invoiceUpdated, invoice_after: update, message: "La factura ha sido actualizado correctamente!" });
            }
        }
    });
}

function deleteInvoice(req, res) {
    //
    const invoiceId = req.params.invoiceId;

    Invoice.findByIdAndDelete(invoiceId, (err, invoiceDeleted) => {
        //
        if(err) {
            res.status(500).send({ message: `Error en el servidor: ${err}` });
        } else {
            if(!invoiceDeleted) {
                res.status(404).send({ message: 'No se ha podido eliminar la factura' });
            } else {
                res.status(200).send({ invoice: invoiceDeleted, message: "La factura ha sido eliminada correctamente!" });
            }
        }
    });
}

module.exports = {
    getAllInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice
}