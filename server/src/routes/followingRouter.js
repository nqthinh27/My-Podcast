const router = require('express').Router();
const followingController = require('../controllers/followingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/newfeed', authMiddleware, followingController.getNewFeedPost);

module.exports = router;