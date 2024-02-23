const express = require('express');
const helmet = require('helmet');
const Sequelize = require('./config/db');
const userRoutes = require('./src/routes/userRoutes');
const vehicleRoutes = require('./src/routes/vehicleRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Secure your app with various HTTP headers
app.use(express.json()); // Use built-in JSON parsing

// Database Connection
Sequelize.sync()
  .then(() => {
    console.log(`Connected to the database`);
    startServer();
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Routes
app.use('/users', userRoutes);
app.use('/vehicles', vehicleRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// 404 Route
app.use((req, res) => {
  res.status(404).send('Endpoint not found');
});

// Function to start the server
function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
