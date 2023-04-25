const router = require('express').Router();
const homeController = require('../controllers/homeController');

router.get('/topTrending', homeController.getTrendingPost);
router.get('/slider', homeController.getSliderPost);
router.get('/newRelease', homeController.getNewReleasePosts);
router.get('/tag', homeController.getPostsByTag);
router.get('/topAuthor', homeController.getTopAuthor);
router.get('/recommend', homeController.getRecommendPost);

module.exports = router;