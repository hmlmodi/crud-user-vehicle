const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Assuming your route has a parameter like /users/:id
    const targetUserId = req.params.id;

    // Check if the decoded user ID matches the target user ID
    if (decoded.id !== parseInt(targetUserId)) {
      return res.status(403).json({ message: 'Forbidden - User does not have permission' });
    }

    req.user = decoded; // Attach the user information to the request object
    next();
  });
};

module.exports = authenticateJWT;
