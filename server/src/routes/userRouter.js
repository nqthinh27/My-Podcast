const userController = require('../controllers/userController');
const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

/**
 * user
 */
router.get('/', userController.getAllUsers);

// GET USER BY ID
router.get('/:id', userController.getUserById);

// UPDATE USER BY ID
router.put('/:id', authMiddleware, userController.updateUserById);

/**
 * USER ACTION
 */
// GET USER POST
router.get('/:id/posts', userController.getUserPost);

// GET USER POST TOP TRENDING
router.get('/:id/topPosts', userController.getUserTopPost);

module.exports = router;