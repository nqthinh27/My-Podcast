const userController = require('../controllers/userController');
const router = require('express').Router();

// GET ALL USER
router.get('/', userController.getAllUsers);

// // GET USER BY ID
router.get('/:id', userController.getUserById);

// // UPDATE USER BY ID
router.put('/:id', userController.updateUserById);

module.exports = router;