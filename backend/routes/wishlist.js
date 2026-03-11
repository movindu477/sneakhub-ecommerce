const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../db');
const auth = require('../middleware/authMiddleware');

// @route   GET api/wishlist
// @desc    Get user wishlist
router.get('/', auth, async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.Int, req.user.id)
            .query(`
                SELECT w.*, p.ProductName, p.Price, p.ProductImageURL, p.Brand, p.Rating
                FROM Wishlist w
                JOIN Products p ON w.ProductID = p.ProductID
                WHERE w.UserID = @userId
            `);
        
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ Error fetching wishlist:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST api/wishlist
// @desc    Add product to wishlist
router.post('/', auth, async (req, res) => {
    const { productId } = req.body;
    
    try {
        const pool = await poolPromise;
        
        // Check if already in wishlist
        const exists = await pool.request()
            .input('userId', sql.Int, req.user.id)
            .input('productId', sql.Int, productId)
            .query('SELECT * FROM Wishlist WHERE UserID = @userId AND ProductID = @productId');

        if (exists.recordset.length > 0) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        await pool.request()
            .input('userId', sql.Int, req.user.id)
            .input('productId', sql.Int, productId)
            .query('INSERT INTO Wishlist (UserID, ProductID) VALUES (@userId, @productId)');

        res.json({ message: 'Added to wishlist' });
    } catch (err) {
        console.error('❌ Error adding to wishlist:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE api/wishlist/:productId
// @desc    Remove product from wishlist
router.delete('/:productId', auth, async (req, res) => {
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('userId', sql.Int, req.user.id)
            .input('productId', sql.Int, req.params.productId)
            .query('DELETE FROM Wishlist WHERE UserID = @userId AND ProductID = @productId');
            
        res.json({ message: 'Removed from wishlist' });
    } catch (err) {
        console.error('❌ Error removing from wishlist:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
