// userService.js
const User = require('../../database/model/users');
const UserOwnership = require('../../database/model/vehicleOwnerShip');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Vehicle = require('../../database/model/vehicle');

const compareAsync = promisify(bcrypt.compare);

const generateToken = (user) => {
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

exports.checkIfEmailExists = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return !!user;
  } catch (error) {
    throw error;
  }
};

exports.createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw error;
  }
};

exports.getUserById = async (userId) => {
  try {
    return await User.findByPk(userId);
  } catch (error) {
    throw error;
  }
};

exports.updateUser = async (userId, userData) => {
  try {
    return await User.update(userData, { where: { id: userId } });
  } catch (error) {
    throw error;
  }
};


exports.deleteUser = async (userId) => {
  try {
   return await User.destroy({ where: { id: userId } });
  } catch (error) {
    throw error;
  }
};


// userService.js
exports.login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await compareAsync(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user);

    return { user, token };
  } catch (error) {
    throw error;
  }
};


exports.addVehicleToUser = async (userId, vehicleId) => {
  try {
    // Check if the association already exists
    const existingAssociation = await UserOwnership.findOne({
      where: { user_id: userId, vehicle_id: vehicleId, isDeleted: 0 },
    });

    if (!existingAssociation) {
      // Create a new association
      await UserOwnership.create({ user_id: userId, vehicle_id: vehicleId, isCreated: 1 });
    }
  } catch (error) {
    throw error;
  }
};

exports.getUserVehicles = async (userId) => {
  try {
    const userVehicles = await UserOwnership.findAll({
      where: { user_id: userId, isDeleted: 0 },
      include: Vehicle, // Include the associated vehicle details
      raw:true
    });
    return userVehicles
  } catch (error) {
    throw error;
  }
};
