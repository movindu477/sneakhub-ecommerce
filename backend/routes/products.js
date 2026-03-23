const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../db');

// @route   GET api/products
// @desc    Get all products with pagination, filtering, sorting, and search
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;

        // Extract query parameters
        let {
            page = 1,
            limit = 12,
            search = '',
            brand = '',
            category = '',
            minPrice = 0,
            maxPrice = 10000,
            sort = 'newest'
        } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;

        // Base Query
        let query = `SELECT *, COUNT(*) OVER() AS TotalCount FROM Products WHERE 1=1`;
        const request = pool.request();

        // Search Filter
        if (search) {
            query += ` AND (ProductName LIKE @search OR Brand LIKE @search OR Description LIKE @search)`;
            request.input('search', sql.NVarChar, `%${search}%`);
        }

        // Brand Filter
        if (brand) {
            query += ` AND Brand = @brand`;
            request.input('brand', sql.NVarChar, brand);
        }

        // Category Filter
        if (category) {
            query += ` AND Category = @category`;
            request.input('category', sql.NVarChar, category);
        }

        // Price Filter
        query += ` AND Price >= @minPrice AND Price <= @maxPrice`;
        request.input('minPrice', sql.Decimal, minPrice);
        request.input('maxPrice', sql.Decimal, maxPrice);

        // Sorting
        switch (sort) {
            case 'price_low':
                query += ` ORDER BY Price ASC`;
                break;
            case 'price_high':
                query += ` ORDER BY Price DESC`;
                break;
            case 'rating':
                query += ` ORDER BY Rating DESC`;
                break;
            case 'best_selling':
                // For now, order by review count as proxy for best selling
                query += ` ORDER BY ReviewCount DESC`;
                break;
            default:
                query += ` ORDER BY CreatedAt DESC`;
        }

        // Pagination
        query += ` OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`;
        request.input('offset', sql.Int, offset);
        request.input('limit', sql.Int, limit);

        const result = await request.query(query);

        const products = result.recordset;
        const totalCount = products.length > 0 ? products[0].TotalCount : 0;
        const totalPages = Math.ceil(totalCount / limit);

        res.json({
            products,
            pagination: {
                totalCount,
                totalPages,
                currentPage: page,
                limit
            }
        });

    } catch (err) {
        console.error('❌ Error fetching products:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET api/products/:id
// @desc    Get single product by ID
router.get('/:id', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT * FROM Products WHERE ProductID = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ Error fetching product:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
