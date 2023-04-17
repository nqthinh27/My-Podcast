const router = require('express').Router();
const followController = require('../controllers/followController');
const authMiddleware = require('../middleware/authMiddleware');

router.patch('/:id', authMiddleware ,followController.followOther);

router.patch('/:id/undo', authMiddleware ,followController.unFollowOther);

module.exports = router;
