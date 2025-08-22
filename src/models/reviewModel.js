const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // This is your DB instance

const Review = sequelize.define("Review", {
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pros: DataTypes.TEXT,
  cons: DataTypes.TEXT,
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },
});

module.exports = Review;
