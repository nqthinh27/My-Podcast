const router = require('express').Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:id/create', authMiddleware, commentController.createComment);

router.get('/:id', commentController.getAllComments);

// router.patch('/comment/:id', auth, commentController.updateComment);

// router.patch('/comment/:id/like', auth, commentController.likeComment);

// router.patch('/comment/:id/unlike', auth, commentController.unLikeComment);

// router.delete('/comment/:id', auth, commentController.deleteComment);



module.exports = router;