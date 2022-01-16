'use strict'
const express = require('express');
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

const api = express.Router();

api.get('', AuthMiddleware.isAuth, UserController.getAllUsers);
api.get('/page/:page?', AuthMiddleware.isAuth, UserController.getAllUsersPaginate);
api.get('/:userId', AuthMiddleware.isAuth, UserController.getUser);
api.post('', UserController.createUser);
api.put('/:userId', AuthMiddleware.isAuth, UserController.updateUser);
api.delete('/:userId', AuthMiddleware.isAuth, UserController.deleteUser);
api.post('/login', UserController.signInUser);

module.exports = api;