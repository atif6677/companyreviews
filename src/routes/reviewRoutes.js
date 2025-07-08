const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewController');

router.post('/add', controller.addReview);
router.get('/search', controller.searchCompany);

module.exports = router;
