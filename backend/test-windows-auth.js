const sql = require('mssql');
require('dotenv').config();

// Try connection string for Windows Auth
const connStr = `Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};TrustServerCertificate=True;`;

async function test() {
    try {
        console.log('Testing with Connection String (Windows Auth)...');
        await sql.connect(connStr);
        console.log('✅ Connection Sucessful via Connection String!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Connection String Failed:', err.message);

        // Try with simple integrated security
        console.log('Trying with simple config + integratedSecurity...');
        const config = {
            server: process.env.DB_SERVER,
            database: process.env.DB_NAME,
            options: {
                encrypt: true,
                trustServerCertificate: true,
                integratedSecurity: true // Some drivers support this
            }
        };
        try {
            await sql.connect(config);
            console.log('✅ Connection Sucessful via Integrated Security!');
            process.exit(0);
        } catch (err2) {
            console.error('❌ All attempts failed.');
            process.exit(1);
        }
    }
}

test();
