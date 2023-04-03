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

// GET FOLLOWERS
router.get('/:id/followers', userController.getAllFollowers);

// GET FOLLOWING
router.get('/:id/following', userController.getAllFollowing);

// FOLLOW OTHER USER
router.post('/:id/follow',authMiddleware, userController.followOther);

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