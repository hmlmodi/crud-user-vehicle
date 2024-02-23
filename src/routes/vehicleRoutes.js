const express = require('express');
const router = express.Router();
const vehicleController = require('../controller/vehicleController');
const vehicleValidationMiddleware = require('../middleware/validator/vehicle/vehicleMiddleware');

// Route: POST /vehicles/createVehicle
router.post(
  '/createVehicle',
  vehicleValidationMiddleware.createVehicleValidation,
  vehicleController.createVehicle
);

// Route: POST /vehicles/getVehicles
router.get(
  '/getVehicles',
//   vehicleValidationMiddleware.getVehiclesValidation,
  vehicleController.getVehicles
);

module.exports = router;
