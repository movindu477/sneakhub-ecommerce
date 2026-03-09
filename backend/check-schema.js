const { poolPromise } = require('./db');
const sql = require('mssql');

async function checkSchema() {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Users'");
        console.log('--- Current Users Table Schema ---');
        console.table(result.recordset);
        process.exit(0);
    } catch (err) {
        console.error('Error checking schema:', err.message);
        process.exit(1);
    }
}

checkSchema();
