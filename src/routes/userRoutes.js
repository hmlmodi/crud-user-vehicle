
const express = require('express');
const router = express.Router();

const userController = require('../controller/userContollers');
const userValidationMiddleware = require('../middleware/validator/user/userValidation');
const userMiddleware = require('../middleware/validator/user/userMiddleware');
const authenticateJWT = require('../../helper/jwt');


// Route: POST /users/createUser
router.post(
    '/createUser',
    userValidationMiddleware.createUserValidation,
    userMiddleware.validateEmailNotExist,
    userController.createUser
);

// Route: POST /users/createUser
router.post(
    '/userLogin',
    userValidationMiddleware.userLoginValidation,
    userController.login
);

// Route: GET /users/getUserById/:id
router.get(
    '/getUserById/:id',
    authenticateJWT,
    userValidationMiddleware.userIdValidation,
    userMiddleware.validateUserExists,
    userController.getUserById
);

// Route: PUT /users/updateUser/:id
router.put(
    '/updateUser/:id',
    authenticateJWT,
    userValidationMiddleware.userIdValidation,
    userMiddleware.validateUserExists,
    userValidationMiddleware.userUpdateValidation,
    userController.updateUser
);

// Route: DELETE /users/deleteUser/:id
router.delete(
    '/deleteUser/:id',
    authenticateJWT,
    userValidationMiddleware.userIdValidation,
    userMiddleware.validateUserExists,
    userController.deleteUser
);

// Route: POST /users/addVehicle
router.post(
    '/addVehicle',
    userValidationMiddleware.userAddVehicleValidation,
    userController.addVehicle);

// Route: GET /users/getUserById/:id
router.get(
    '/getUserVehicle/:id',
    authenticateJWT,
    userValidationMiddleware.userIdValidation,
    userController.getUserVehicles
);

module.exports = router;
