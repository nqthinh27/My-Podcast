const userController = require('../controllers/userController');
const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

// GET ALL USER
router.get('/', userController.getAllUsers);

// // GET USER BY ID
router.get('/:id', userController.getUserById);

// UPDATE USER BY ID
router.put('/:id', authMiddleware, userController.updateUserById);

// // GET USER POST
router.get('/:id/posts', authMiddleware, userController.getUserPost);

module.exports = router;