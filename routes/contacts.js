const express = require('express');
const router = express.Router();
const { createContactValidator } = require('../validation/contactValidation');
const usersController = require('../controllers/contacts');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', createContactValidator, usersController.createUser);

router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;