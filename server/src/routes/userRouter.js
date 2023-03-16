const userController = require('../controllers/userController');
const router = require('express').Router();

// GET ALL USER
router.get('/', userController.getAllUsers);

// // GET USER BY ID
// router.get('/:id', userController.getUserById);

// //ADD USER
// router.post('/', userController.addUser);

// // UPDATE USER BY ID
// router.put('/:id', userController.updateUserById);

// DELETE USER BY ID
router.delete('/:id', userController.deleteUserById);

module.exports = router;