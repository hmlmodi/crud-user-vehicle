const vehicleService = require('../service/vehicleService');

exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.createVehicle(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    let { search } = req.query;
    const vehicles = await vehicleService.getVehicles(search);
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
