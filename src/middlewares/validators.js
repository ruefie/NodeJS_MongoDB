const { body, query, validationResult } = require("express-validator");

const validateUserBody = [
  body("first_name")
    .optional()
    .isString()
    .withMessage("First name must be a string"),
  body("last_name")
    .optional()
    .isString()
    .withMessage("Last name must be a string"),
  body("age")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Age must be a positive integer"),
  body("active").optional().isBoolean().withMessage("Active must be a boolean"),
];

const validateUserQuery = [
  query("first_name")
    .optional()
    .isString()
    .withMessage("First name must be a string"),
  query("last_name")
    .optional()
    .isString()
    .withMessage("Last name must be a string"),
  query("age")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Age must be a positive integer"),
  query("active")
    .optional()
    .isBoolean()
    .withMessage("Active must be a boolean"),
];

const validateOrderBody = [
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid date"),
  body("user_id").optional().isString().withMessage("User ID must be a string"),
];

const validateOrderQuery = [
  query("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  query("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid date"),
  query("user_id")
    .optional()
    .isString()
    .withMessage("User ID must be a string"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateUserBody,
  validateUserQuery,
  validateOrderBody,
  validateOrderQuery,
  validate,
};
