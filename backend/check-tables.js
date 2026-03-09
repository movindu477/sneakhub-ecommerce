const { poolPromise } = require('./db');
const sql = require('mssql');

async function checkAllTables() {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'");
        console.log('--- Database Tables ---');
        console.table(result.recordset);
        process.exit(0);
    } catch (err) {
        console.error('Error checking tables:', err.message);
        process.exit(1);
    }
}

checkAllTables();
