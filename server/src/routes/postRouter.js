const router = require('express').Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, postController.createPost);

router.get('/:id', postController.getPostById);

router.put('/:id', authMiddleware, postController.updatePostById);

router.delete('/:id', authMiddleware, postController.deletePostById);

router.patch('/:id/like', authMiddleware, postController.likePost);

router.patch('/:id/unlike', authMiddleware, postController.unLikePost);

// router.route('/posts')
//     .post(auth, postController.createPost)
//     .get(auth, postController.getPosts)
// router.get('/', postController.getAllPosts);

module.exports = router;
