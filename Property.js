const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    property: String,
    latitude: Number,
    longitude: Number
});

module.exports = mongoose.model('Property', propertySchema);
