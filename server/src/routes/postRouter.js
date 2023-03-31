const router = require('express').Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, postController.createPost);

router.get('/:id', postController.getPostById);

router.put('/:id', authMiddleware, postController.updatePostById);

router.delete('/:id', authMiddleware, postController.deletePostById);

router.patch('/:id/like', authMiddleware, postController.likePost);
router.patch('/:id/unlike', authMiddleware, postController.unLikePost);

router.patch('/:id/save', authMiddleware, postController.savePost);
router.patch('/:id/unsave', authMiddleware, postController.unSavePost);

router.patch('/:id/savehistory', authMiddleware, postController.saveHistory);
router.patch('/:id/unsavehistory', authMiddleware, postController.unSaveHistory);



module.exports = router;
