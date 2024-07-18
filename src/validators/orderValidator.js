const { body } = require('express-validator');

const orderValidator = [
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number').notEmpty().withMessage('Price is required'),
  body('date').isISO8601().toDate().withMessage('Date must be a valid date').optional(),
  body('user_id').isMongoId().withMessage('User ID must be a valid MongoDB ID').notEmpty().withMessage('User ID is required'),
];

module.exports = orderValidator;
