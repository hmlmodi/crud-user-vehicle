const userService = require('../service/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.createUser = async (req, res, next) => {
  try {
    const { name, surname, email, password, phone, location } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the hashed password in the user creation process
    const user = await userService.createUser({
      name,
      surname,
      email,
      password: hashedPassword,
      phone,
      location,
    });

    // Generate JWT token after creating the user
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const userWithoutPassword = user.toJSON();

    // Exclude the password from the response
    delete userWithoutPassword.password;

    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    next(error);
  }
};




// exports.createUser = async (req, res, next) => {
//   try {
//     const user = await userService.createUser(req.body);
//    // Generate JWT token after creating the user
//    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//    res.status(201).json({ user, token });
//   } catch (error) {
//     next(error);
//   }
// };

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedUser = await userService.updateUser(userId, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userService.deleteUser(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await userService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message || 'Login failed' });
  }
};


exports.addVehicle = async (req, res, next) => {
  try {
    const { userId, vehicleId } = req.body;
    await userService.addVehicleToUser(userId, vehicleId);
    res.status(201).json({ message: 'Vehicle added to user successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getUserVehicles = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userVehicles = await userService.getUserVehicles(userId);
    res.status(200).json(userVehicles);
  } catch (error) {
    next(error);
  }
};
