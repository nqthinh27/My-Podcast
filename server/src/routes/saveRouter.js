const router = require('express').Router();
const saveController = require('../controllers/saveController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:id/add', authMiddleware, saveController.addToSaved);
router.patch('/:id/remove', authMiddleware, saveController.removeFromSaved);
router.patch('/remove', authMiddleware, saveController.removeMutipleFromSaved);
router.post('/', authMiddleware, saveController.getUserSaved);

module.exports = router;