const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const { poolPromise } = require('./db');

const path = require('path');

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(cors()); // Enable CORS for React frontend
app.use(morgan('dev')); // Logger

// Serve static images from frontend assets
app.use('/assets/images', express.static(path.join(__dirname, '../src/assets/images')));

// Simple Status Route
app.get('/api/status', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT GETDATE() AS currentTime');
        res.json({ status: 'Online', dbTime: result.recordset[0].currentTime });
    } catch (err) {
        res.status(500).json({ status: 'Database Offline', error: err.message });
    }
});

// Import and use routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/wishlist', require('./routes/wishlist'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 SneakHub Backend running at http://localhost:${PORT}`);
    console.log(`🔗 API Base: http://localhost:${PORT}/api/auth`);
});
