const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function test() {
    try {
        console.log('Testing with provided credentials...');
        await sql.connect(config);
        console.log('✅ Connection Sucessful!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Connection Failed with credentials:', err.message);

        console.log('Trying with Trusted Connection (Windows Auth)...');
        const trustedConfig = {
            server: process.env.DB_SERVER,
            database: process.env.DB_NAME,
            options: {
                encrypt: true,
                trustServerCertificate: true
            },
            // This usually requires msnodesqlv8 driver or specific settings
            // But let's see if we can connect without user/pass
        };
        try {
            await sql.connect(trustedConfig);
            console.log('✅ Connection Sucessful via Trusted Connection!');
            process.exit(0);
        } catch (err2) {
            console.error('❌ Trusted Connection also failed:', err2.message);
            process.exit(1);
        }
    }
}

test();
