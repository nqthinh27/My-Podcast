const router = require('express').Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/', authMiddleware ,authController.staylogged);

router.post('/rf_token', authController.generateAccessToken);

module.exports = router;
