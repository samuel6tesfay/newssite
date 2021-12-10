const express = require('express');
const trends = require('../controllers/trends');
const { verifyTokenAndAdmin } = require('../middleware/authmiddleware');

const trendRoutes = express.Router();

trendRoutes.get('/trends',trends.trends);
trendRoutes.post('/trend',verifyTokenAndAdmin,trends.createtrend);
trendRoutes.get('/trend/:id',verifyTokenAndAdmin,trends.trend);
trendRoutes.put('/trend/:id',verifyTokenAndAdmin,trends.updatetrend);

trendRoutes.delete('/trend/:id',verifyTokenAndAdmin,trends.deletetrend);

module.exports = trendRoutes;