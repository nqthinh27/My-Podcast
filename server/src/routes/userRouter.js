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

// GET USER POST
router.get('/:id/posts', userController.getUserPost);

/**
 * Library
 */
// LIKED
router.get('/:id/liked', authMiddleware, userController.getAllLiked);

// SAVED
router.get('/:id/saved', authMiddleware, userController.getAllSaved);

// HISTORY
router.get('/:id/history', authMiddleware, userController.getAllHistory);

module.exports = router;