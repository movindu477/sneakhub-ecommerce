const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { sql, poolPromise } = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/user/profile
// @desc    Get current user's profile
// @access  Private
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, req.user.id)
            .query('SELECT UserID, FirstName, LastName, Email, PhoneNumber, Role, AccountStatus, CreatedAt FROM Users WHERE UserID = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Profile Fetch Error:', err);
        res.status(500).json({ message: 'Server error fetching profile.' });
    }
});

// @route   PUT /api/user/profile
// @desc    Update personal information
// @access  Private
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const { firstName, lastName, phone, email } = req.body;
        const pool = await poolPromise;

        // Check if email is being changed and if it already exists
        if (email) {
            const emailCheck = await pool.request()
                .input('id', sql.Int, req.user.id)
                .input('email', sql.NVarChar, email)
                .query('SELECT UserID FROM Users WHERE Email = @email AND UserID != @id');

            if (emailCheck.recordset.length > 0) {
                return res.status(400).json({ message: 'Email already in use by another account.' });
            }
        }

        await pool.request()
            .input('id', sql.Int, req.user.id)
            .input('fn', sql.NVarChar, firstName)
            .input('ln', sql.NVarChar, lastName)
            .input('phone', sql.NVarChar, phone)
            .input('email', sql.NVarChar, email)
            .query(`
                UPDATE Users 
                SET FirstName = ISNULL(@fn, FirstName), 
                    LastName = ISNULL(@ln, LastName), 
                    PhoneNumber = ISNULL(@phone, PhoneNumber),
                    Email = ISNULL(@email, Email),
                    UpdatedAt = GETDATE() 
                WHERE UserID = @id
            `);

        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error('Profile Update Error:', err);
        res.status(500).json({ message: 'Server error updating profile.' });
    }
});

// @route   PUT /api/user/password
// @desc    Change user password
// @access  Private
router.put('/password', authMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const pool = await poolPromise;

        const userResult = await pool.request()
            .input('id', sql.Int, req.user.id)
            .query('SELECT PasswordHash FROM Users WHERE UserID = @id');

        const user = userResult.recordset[0];

        const isMatch = await bcrypt.compare(currentPassword, user.PasswordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid current password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await pool.request()
            .input('id', sql.Int, req.user.id)
            .input('pwd', sql.NVarChar, hashedPassword)
            .query('UPDATE Users SET PasswordHash = @pwd, UpdatedAt = GETDATE() WHERE UserID = @id');

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Password Update Error:', err);
        res.status(500).json({ message: 'Server error updating password.' });
    }
});

// @route   GET /api/user/wishlist
// @desc    Get current user's wishlist
// @access  Private
router.get('/wishlist', authMiddleware, async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, req.user.id)
            .query(`
                SELECT w.WishlistID, p.ProductID, p.Name, p.Price, p.ImageURL 
                FROM Wishlist w
                JOIN Products p ON w.ProductID = p.ProductID
                WHERE w.UserID = @id
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('Wishlist Fetch Error:', err);
        res.status(500).json({ message: 'Server error fetching wishlist.' });
    }
});

// @route   GET /api/user/orders
// @desc    Get current user's order history
// @access  Private
router.get('/orders', authMiddleware, async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, req.user.id)
            .query(`
                SELECT OrderID, TotalAmount, Status, CreatedAt 
                FROM Orders 
                WHERE UserID = @id
                ORDER BY CreatedAt DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('Orders Fetch Error:', err);
        res.status(500).json({ message: 'Server error fetching orders.' });
    }
});

module.exports = router;
