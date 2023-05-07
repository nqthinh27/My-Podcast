const tagController = require('../controllers/tagController');
const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', tagController.createTag);

router.get('/', tagController.getAllTag);

module.exports = router;