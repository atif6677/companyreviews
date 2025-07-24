// src/app.js
const express = require('express');
const app = express();
const sequelize = require('./config/database');
const reviewRoutes = require('./routes/reviewRoutes');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/reviews', reviewRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
