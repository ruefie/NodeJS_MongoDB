const { body } = require('express-validator');

const userValidator = [
  body('first_name').isString().withMessage('First name must be a string').notEmpty().withMessage('First name is required'),
  body('last_name').isString().withMessage('Last name must be a string').notEmpty().withMessage('Last name is required'),
  body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer').notEmpty().withMessage('Age is required'),
];

module.exports = userValidator;
