const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../db');
const auth = require('../middleware/authMiddleware'); // Updated path

// @route   GET api/cart
// @desc    Get user cart items
router.get('/', auth, async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.Int, req.user.id)
            .query(`
                SELECT c.*, p.ProductName, p.Price, p.ProductImageURL, p.Brand, p.StockQuantity
                FROM Cart c
                JOIN Products p ON c.ProductID = p.ProductID
                WHERE c.UserID = @userId
            `);
        
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ Error fetching cart:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST api/cart
// @desc    Add or update item in cart
router.post('/', auth, async (req, res) => {
    const { productId, quantity = 1 } = req.body;
    
    try {
        const pool = await poolPromise;
        
        // Check if product exists and check stock
        const productCheck = await pool.request()
            .input('productId', sql.Int, productId)
            .query('SELECT StockQuantity FROM Products WHERE ProductID = @productId');
            
        if (productCheck.recordset.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        const stock = productCheck.recordset[0].StockQuantity;
        if (stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }

        // Check if already in cart
        const cartItem = await pool.request()
            .input('userId', sql.Int, req.user.id)
            .input('productId', sql.Int, productId)
            .query('SELECT * FROM Cart WHERE UserID = @userId AND ProductID = @productId');

        if (cartItem.recordset.length > 0) {
            // Update quantity
            await pool.request()
                .input('userId', sql.Int, req.user.id)
                .input('productId', sql.Int, productId)
                .input('quantity', sql.Int, cartItem.recordset[0].Quantity + quantity)
                .query('UPDATE Cart SET Quantity = @quantity WHERE UserID = @userId AND ProductID = @productId');
        } else {
            // Add new
            await pool.request()
                .input('userId', sql.Int, req.user.id)
                .input('productId', sql.Int, productId)
                .input('quantity', sql.Int, quantity)
                .query('INSERT INTO Cart (UserID, ProductID, Quantity) VALUES (@userId, @productId, @quantity)');
        }

        res.json({ message: 'Cart updated successfully' });
    } catch (err) {
        console.error('❌ Error updating cart:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE api/cart/:productId
// @desc    Remove item from cart
router.delete('/:productId', auth, async (req, res) => {
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('userId', sql.Int, req.user.id)
            .input('productId', sql.Int, req.params.productId)
            .query('DELETE FROM Cart WHERE UserID = @userId AND ProductID = @productId');
            
        res.json({ message: 'Item removed from cart' });
    } catch (err) {
        console.error('❌ Error deleting cart item:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
