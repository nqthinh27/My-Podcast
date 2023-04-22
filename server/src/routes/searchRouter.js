const router = require('express').Router();
const searchController = require('../controllers/searchController');

router.get('/user', searchController.getUserByUserName);

// router.get('/post', searchController.getUserByUserName);

module.exports = router;
