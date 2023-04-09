const router = require('express').Router();
const historyController = require('../controllers/historyController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:id/add', authMiddleware, historyController.addToHistory);
router.patch('/:id/remove', authMiddleware, historyController.removeFromHistory);
router.patch('/remove', authMiddleware, historyController.removeMutipleFromHistory);
router.get('/', authMiddleware, historyController.getUserHistory);

module.exports = router;