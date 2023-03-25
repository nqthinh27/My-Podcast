const router = require('express').Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create',authMiddleware , postController.createPost);

// router.route('/posts')
//     .post(auth, postController.createPost)
//     .get(auth, postController.getPosts)
// router.get('/', postController.getAllPosts);

module.exports = router;
