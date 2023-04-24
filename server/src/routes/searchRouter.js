const router = require('express').Router();
const searchController = require('../controllers/searchController');

router.post('/user', searchController.searchUser);

router.post('/post', searchController.searchPost);

module.exports = router;
