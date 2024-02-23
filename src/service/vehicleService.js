const Vehicle = require('../../database/model/vehicle');
const { Op } = require('sequelize');

exports.createVehicle = async (vehicleData) => {
  try {
    return await Vehicle.create(vehicleData);
  } catch (error) {
    throw error;
  }
};
exports.getVehicles = async (search, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'asc') => {
  try {
    const offset = (page - 1) * limit;

    const vehicles = await Vehicle.findAndCountAll({
      where: {
        [Op.or]: [
          {
            vehicle_name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            vehicle_brand: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            vehicle_number: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
      offset,
      limit,
      order: [[sortBy, sortOrder.toUpperCase()]],
    });

    return {
      totalItems: vehicles.count,
      totalPages: Math.ceil(vehicles.count / limit),
      currentPage: page,
      vehicles: vehicles.rows,
    };
  } catch (error) {
    throw error;
  }
};
