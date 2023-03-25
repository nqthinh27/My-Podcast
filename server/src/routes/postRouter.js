const router = require('express').Router();
const postController = require('../controllers/postController');

router.post('/create', postController.createPost);

// router.get('/', postController.getAllPosts);

module.exports = router;
