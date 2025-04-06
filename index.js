const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const propertyRoutes = require('./routes/propertyRoutes');

dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use('/api/properties', propertyRoutes);

app.get('/', (req, res) => {
    res.send('Moustache Backend API');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
