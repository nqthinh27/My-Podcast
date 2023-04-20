const router = require('express').Router();
const homeController = require('../controllers/homeController');

router.get('/topTrending', homeController.getTrendingPost);

module.exports = router;