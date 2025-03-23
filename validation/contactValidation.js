const { body } = require('express-validator');

exports.createContactValidator = [
    body('firstName').notEmpty(),
    body('birthday').isDate()
];