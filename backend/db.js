const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // For Azure
        trustServerCertificate: true, // For local development
        enableArithAbort: true
    },
    // If using Windows Authentication (Trusted Connection), you might need:
    // driver: 'msnodesqlv8', 
    // connectionString: 'Driver={SQL Server Native Client 11.0};Server=DESKTOP-DVEIBGN\\SQLEXPRESS;Database=SneakHub;Trusted_Connection=yes;'
};

let poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('✅ Connected to SQL Server!');

        // Ensure Users Table exists
        const createTableQuery = `
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
            BEGIN
                CREATE TABLE Users (
                    Id INT PRIMARY KEY IDENTITY(1,1),
                    FirstName NVARCHAR(100) NOT NULL,
                    LastName NVARCHAR(100) NOT NULL,
                    Email NVARCHAR(255) UNIQUE NOT NULL,
                    Password NVARCHAR(255) NOT NULL,
                    Phone NVARCHAR(20) NULL,
                    Role NVARCHAR(50) DEFAULT 'Customer',
                    EmailVerified BIT DEFAULT 0,
                    AccountStatus NVARCHAR(50) DEFAULT 'Active',
                    FailedLoginAttempts INT DEFAULT 0,
                    CreatedAt DATETIME DEFAULT GETDATE(),
                    LastLogin DATETIME NULL
                );
            END
        `;

        pool.request().query(createTableQuery)
            .then(() => console.log('✅ Users table ready.'))
            .catch(err => console.error('❌ Table init error:', err));

        return pool;
    })
    .catch(err => {
        console.error('❌ Database Connection Failed!', err);
        process.exit(1);
    });

module.exports = {
    sql,
    poolPromise
};
