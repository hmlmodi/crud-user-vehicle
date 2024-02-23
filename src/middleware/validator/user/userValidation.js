const Joi = require('joi');

// Function to handle Joi validation for params or body
const validateWithJoi = (schema, location) => (req, res, next) => {
  let data;

  if (location === 'params') {
    data = req.params;
  } else if (location === 'body') {
    data = req.body;
  } else {
    return res.status(500).json({ error: 'Invalid validation location' });
  }

  const result = schema.validate(data);

  if (result.error) {
    return res.status(400).json({ errors: result.error.details.map(detail => detail.message) });
  }

  next();
};

// Define Joi schema for user creation
const createUserSchema = Joi.object({
  name: Joi.string().trim().required(),
  surname: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.number().precision(10).allow(null).optional(),
  location: Joi.number().precision(8).allow(null).optional(),
  password: Joi.string().trim().required(), 
});

// Define Joi schema for user ID validation
const userIdSchema = Joi.object({
  id: Joi.number().integer().required(),
});

// Define Joi schema for updating user
const updateUserSchema = Joi.object({
  name: Joi.string().trim(),
  surname: Joi.string().trim(),
  phone: Joi.number().precision(10).allow(null).optional(),
  location: Joi.number().precision(8).allow(null).optional(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
});


// Define Joi schema for adding a vehicle to a user
const addVehicleSchema = Joi.object({
  userId: Joi.number().integer().required(),
  vehicleId: Joi.number().integer().required(),
});


// Middleware for validating user creation using Joi
exports.createUserValidation = validateWithJoi(createUserSchema, 'body');
exports.userLoginValidation = validateWithJoi(userLoginSchema, 'body');
exports.userUpdateValidation = validateWithJoi(updateUserSchema, 'body');
exports.userAddVehicleValidation = validateWithJoi(addVehicleSchema, 'body');


// Middleware for validating user ID using Joi
exports.userIdValidation = validateWithJoi(userIdSchema, 'params');
