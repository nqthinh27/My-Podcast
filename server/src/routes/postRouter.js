const router = require('express').Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, postController.createPost);

router.get('/:id', postController.getPostById);

router.put('/:id', authMiddleware, postController.updatePostById);

router.delete('/:id', authMiddleware, postController.deletePostById);

// INTERACT
router.put('/:id/views', postController.increaseViews);

router.post('/:id/comment', authMiddleware, commentController.createComment);


module.exports = router;
