const router = require('express').Router();
const notifyController = require('../controllers/notifyController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/get', authMiddleware, notifyController.getNotifies);

router.post('/create', authMiddleware, notifyController.createNotify);

router.put('/read', authMiddleware, notifyController.readedNotifies);

router.post('/createMany', authMiddleware, notifyController.createManyNotify);

module.exports = router;