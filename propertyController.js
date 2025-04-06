const Property = require('../models/Property');
const { calculateDistance } = require('../utils/geoUtils');
const fetch = require('node-fetch');

exports.findNearbyProperties = async (req, res) => {
    const query = req.query.q;

    try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
        const geoData = await geoRes.json();

        if (!geoData || geoData.length === 0)
            return res.status(404).json({ message: 'Location not found' });

        const { lat, lon } = geoData[0];
        const userLat = parseFloat(lat);
        const userLon = parseFloat(lon);

        const properties = await Property.find();
        const nearby = properties.filter(p => {
            const dist = calculateDistance(userLat, userLon, p.latitude, p.longitude);
            return dist <= 50;
        });

        if (nearby.length === 0) return res.json({ message: 'No properties within 50km.' });

        res.json({ count: nearby.length, properties: nearby });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
