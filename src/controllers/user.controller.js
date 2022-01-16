'use strict'
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-pagination');
const User = require('../models/user.model');
const jwtService = require('../services/jwt.service');

function getAllUsers(req, res) {
    //
    User.find({}, (err, users) => {
        //
        if(err) {
            return res.status(500).send( {message: `Error al realizar la petición: ${err}`} );
        }
        if(!users) {
            return res.status(404).send( {message: `No existen usuarios en el sistema`} );
        }
        res.status(200).send({ users, message: 'Usuarios encontrados correctamente' });
    });
}

function getAllUsersPaginate(req, res) {
    //
    if(req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    let itemsPerPage = 3;

    User.find().sort('name').paginate(page, itemsPerPage, (err, users, total) => {
        //
        if(err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            //
            if(!users) {
                res.status(404).send({ message: 'No hay usuarios en el sistema' });
            } else {
                return res.status(200).send({
                    total_items: total,
                    users: users,
                    message: 'Usuarios encontrados correctamente'
                });
            }
        }
    });
}

function getUser(req, res) {
    //
    const userId = req.params.userId;

    User.findById(userId, (err, user) => {
        //
        if(err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if(!user) {
                res.status(404).send({ message: 'El usuario no existe' });
            } else {
                res.status(200).send({ user, message: 'Usuario encontrado correctamente' });
            }
        }
    });
}

function createUser(req, res) {
    //
    const saltRounds = 10;

    const user = new User();
    let params = req.body;

    user.name = params.name;
    user.lastname = params.lastname;
    user.email = params.email;
    user.password = params.password;
    user.role = 'ROLE_USER';
    user.lastLogin = null;

    if(params.password) {
        // Encriptar contraseña y guardar
        bcrypt.hash(params.password, saltRounds, function (err, hash) {
            user.password = hash;

            if(user.name != null && user.lastname != null && user.email != null && user.name != "" && user.lastname != "" && user.email != "") {
                // Guardar Usuario
                user.save( (err, userStored) => {
                    if(err) {
                        res.status(500).send({ message: "Error al crear al usuario" });
                    } else {
                        //
                        if(!userStored) {
                            res.status(404).send({ message: "No se ha insertado el usuario en la base de datos" });
                        } else {
                            res.status(200).send({ user: userStored, message: "Usuario creado correctamente" });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: "Rellene todos los campos" });
            }
        });

    } else {
        res.status(200).send({ message: "Introduce la contraseña" });
    }
}

function updateUser(req, res) {
    //
    const userId = req.params.userId;
    const update = req.body;

    if(userId != req.user.sub) {
        return res.status(500).send({ message: "No tienes permiso para actualizar este usuario" });
    }

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        //
        if(err) {
            res.status(500).send({ message: "Error al actualizar el usuario" });
        } else {
            //
            if(!userUpdated) {
                res.status(404).send({ message: "No se ha podido actualizar el usuario" });
            } else {
                res.status(200).send({ user_before: userUpdated, user_after: update, message: "El usuario ha sido actualizado correctamente!" });
            }
        }
    });
}

function deleteUser(req, res) {
    //
    const userId = req.params.userId;

    User.findByIdAndRemove(userId, (err, userRemoved) => {
        //
        if(err) {
            res.status(500).send({ message: 'Error al eliminar al usuario' });
        } else {
            //
            if(!userRemoved) {
                res.status(404).send({ message: 'No se ha eliminado al usuario' });
            } else {
                res.status(200).send({ user: userRemoved, message: 'El usuario fue eliminada correctamente' });
            }
        }
    });
}

function signInUser(req, res) {
    //
    let params = req.body;

    let email = params.email;
    let password = params.password;

    if(email != null && password != null && email != "" && password != "") {
        //
        User.findOne({ email: email.toLowerCase() }, (err, user) => {
            //
            if(err) {
                res.status(500).send({ message: "Error en la petición" });
            } else {
                //
                if(!user) {
                    res.status(404).send({ message: "El usuario no existe" });
                } else {
                    // Comprobar contraseña
                    bcrypt.compare(password, user.password, function(err, result) {
                        //
                        if(err) {
                            res.status(500).send({ message: `Se ha producido un error: ${err}` });
                        } else {
                            //
                            if(result) {
                                // Devolber los datos del usuario logueado y token de JWT
                                let tokenJwt = jwtService.createToken(user);
                                res.status(200).send({ user, token: tokenJwt, message: "Usuario autenticado y logueado correctamente", resultado: result });
                            } else {
                                res.status(404).send({ message: "El usuario no ha podido loguearse, password inválido (falla comparacion bcrypt)", resultado: result });
                            }
                        }
                    });
                }
            }
        });
    } else {
        res.status(200).send({ message: "Rellene los campos email y password" });
    }
}

module.exports = {
    getAllUsers,
    getAllUsersPaginate,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    signInUser
}