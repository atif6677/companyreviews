const Review = require('../models/reviewModel');
const { Op } = require('sequelize');

// Add a new review
const addReview = async (req, res) => {
  try {
    const { companyName, pros, cons, rating } = req.body;
    
    const newReview = await Review.create({ companyName, pros, cons, rating });
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add review' });
  }
};

// Search reviews by company name
const searchCompany = async (req, res) => {
  try {
    const { name } = req.query;
    const reviews = await Review.findAll({
      where: {
        companyName: { [Op.like]: `%${name}%` }
      }
    });

    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found' });
    }

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    res.status(200).json({ reviews, avgRating });
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
};

module.exports={
addReview,
searchCompany
}
