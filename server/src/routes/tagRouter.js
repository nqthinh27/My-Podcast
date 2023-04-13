const tagController = require('../controllers/tagController');
const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

// FOLLOW OTHER USER
router.post('/', tagController.createTag);

module.exports = router;