const userService = require('../../service/userService');

exports.validateEmailNotExist = async (req, res, next) => {
  try {
    const emailExists = await userService.checkIfEmailExists(req.body.email);
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Middleware to check if the user with the specified ID exists
exports.validateUserExists = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

