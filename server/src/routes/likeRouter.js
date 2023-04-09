const router = require('express').Router();
const likeController = require('../controllers/likeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:id/add', authMiddleware, likeController.addToLiked);
router.patch('/:id/remove', authMiddleware, likeController.removeFromLiked);
router.patch('/remove', authMiddleware, likeController.removeMutipleFromLiked);
router.get('/', authMiddleware, likeController.getUserLiked);

module.exports = router;