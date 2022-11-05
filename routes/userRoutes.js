const express = require('express');
const userController = require('./../Controllers/userController');
const authController = require('./../Controllers/authController');
const router = express.Router(); 

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/').get(userController.getAllUser).post(userController.createUser);
router.route('/:id').patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
