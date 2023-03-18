const router = require('express').Router();
const postController = require('../controllers/postController');

router.post('/create', postController.createPost);

module.exports = router;
