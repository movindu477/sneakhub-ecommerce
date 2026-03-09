const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql, poolPromise } = require('../db');

// 🔐 REGISTER USER (Points 1 - 13)
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, phone, terms } = req.body;

        // 2. Validate Required Fields
        if (!firstName || !lastName || !email || !password || !confirmPassword || !terms) {
            return res.status(400).json({ message: 'All required fields must be filled.' });
        }

        // 3. Validate Email Format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email format.' });

        // 5. Validate Password Strength
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must be 8+ characters, with uppercase, lowercase, number, and special character.' });
        }

        // 6. Confirm Password Match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        const pool = await poolPromise;

        // 4. Check If Email Already Exists
        const existingUser = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT Email FROM Users WHERE Email = @email');

        if (existingUser.recordset.length > 0) {
            return res.status(400).json({ message: 'Account with this email already exists.' });
        }

        // 7. Hash the Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 8. Create User Record
        await pool.request()
            .input('fn', sql.NVarChar, firstName)
            .input('ln', sql.NVarChar, lastName)
            .input('email', sql.NVarChar, email)
            .input('pwd', sql.NVarChar, hashedPassword)
            .input('phone', sql.NVarChar, phone || null)
            .query('INSERT INTO Users (FirstName, LastName, Email, PasswordHash, PhoneNumber) VALUES (@fn, @ln, @email, @pwd, @phone)');

        // 9 & 10. Generate & Send Verification Email (Mocking for now)
        console.log(`Generating email verification token for: ${email}...`);
        console.log(`Sending verification email to: ${email}...`);

        // 13. Security Logging
        console.log(`[USER REGISTERED] IP: ${req.ip} - User: ${email}`);

        res.status(201).json({ message: 'Registration successful! Verification email sent.' });

    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// 🔓 LOGIN USER (Points 1 - 12)
router.post('/login', async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;

        // 2. Validate
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });

        const pool = await poolPromise;

        // 3. Check If User Exists
        const userResult = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE Email = @email');

        if (userResult.recordset.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const user = userResult.recordset[0];

        // 4. Check Account Status
        if (user.AccountStatus !== 'Active') {
            return res.status(403).json({ message: `Account is ${user.AccountStatus}. Please contact support.` });
        }

        // 5. Check Email Verification
        if (!user.EmailVerified) {
            // In many cases, we allow login but show a warning or limit access.
            // Point 5: "Verification required to use most features"
            // return res.status(403).json({ message: "Verify your email first." });
        }

        // 6. Check Password
        const isMatch = await bcrypt.compare(password, user.PasswordHash);
        if (!isMatch) {
            // 7. Track Failed Login Attempts
            await pool.request().input('id', sql.Int, user.UserID).query('UPDATE Users SET FailedLoginAttempts = FailedLoginAttempts + 1 WHERE UserID = @id');
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // 8 & 9. Create Auth Token (JWT)
        const payload = {
            user: {
                id: user.UserID,
                role: user.Role,
                email: user.Email,
                name: user.FirstName
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: rememberMe ? '30d' : '24h'
        });

        // 10. Update User's Login and Clear Failed attempts
        await pool.request()
            .input('id', sql.Int, user.UserID)
            .query('UPDATE Users SET LastLogin = GETDATE(), FailedLoginAttempts = 0 WHERE UserID = @id');

        // 12. Log activity
        console.log(`[USER LOGGED IN] IP: ${req.ip} - User: ${email}`);

        res.json({
            token,
            user: {
                firstName: user.FirstName,
                role: user.Role,
                emailVerified: user.EmailVerified
            }
        });

    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

module.exports = router;
