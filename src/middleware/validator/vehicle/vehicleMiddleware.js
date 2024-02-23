const { body, validationResult } = require('express-validator');
const Joi = require('joi');

// Joi schema for creating a vehicle
const createVehicleSchema = Joi.object({
  vehicle_name: Joi.string().trim().required(),
  vehicle_brand: Joi.string().trim().required(),
  vehicle_number: Joi.string().trim().required(),
});

// Validation middleware for creating a vehicle
exports.createVehicleValidation = (req, res, next) => {
  const result = createVehicleSchema.validate(req.body);
  if (result.error) {
    return res.status(400).json({ errors: result.error.details.map(detail => detail.message) });
  }
  next();


  const Joi = require('joi');

const vehicleOwnershipSchema = Joi.object({
  userId: Joi.number().integer().required(),
  vehicleId: Joi.number().integer().required(),
});

module.exports = vehicleOwnershipSchema;

};
