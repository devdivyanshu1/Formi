const express = require('express');
const router = express.Router();
const { findNearbyProperties } = require('./controllers/propertyController');

router.get('/nearby', findNearbyProperties);

module.exports = router;

