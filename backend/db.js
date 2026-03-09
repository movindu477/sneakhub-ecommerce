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
        const createTablesQuery = `
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
            BEGIN
                CREATE TABLE Users (
                    UserID INT PRIMARY KEY IDENTITY(1,1),
                    FirstName NVARCHAR(100) NOT NULL,
                    LastName NVARCHAR(100) NOT NULL,
                    Email NVARCHAR(255) UNIQUE NOT NULL,
                    PasswordHash NVARCHAR(255) NOT NULL,
                    PhoneNumber NVARCHAR(20) NULL,
                    Role NVARCHAR(50) DEFAULT 'Customer',
                    EmailVerified BIT DEFAULT 0,
                    AccountStatus NVARCHAR(50) DEFAULT 'Active',
                    FailedLoginAttempts INT DEFAULT 0,
                    CreatedAt DATETIME DEFAULT GETDATE(),
                    LastLogin DATETIME NULL,
                    UpdatedAt DATETIME NULL
                );
            END

            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Products' AND xtype='U')
            BEGIN
                CREATE TABLE Products (
                    ProductID INT PRIMARY KEY IDENTITY(1,1),
                    Name NVARCHAR(255) NOT NULL,
                    Price DECIMAL(10, 2) NOT NULL,
                    ImageURL NVARCHAR(MAX) NULL,
                    Description NVARCHAR(MAX) NULL,
                    Category NVARCHAR(100) NULL,
                    Stock INT DEFAULT 0,
                    CreatedAt DATETIME DEFAULT GETDATE()
                );
                
                -- Seed some products if empty
                INSERT INTO Products (Name, Price, ImageURL, Description, Category, Stock)
                VALUES 
                ('Air Max Akatsuki', 240.00, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', 'Premium Akatsuki themed sneakers.', 'Running', 10),
                ('Jordan 1 Retro High', 190.00, 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a', 'Classic Red and White Jordans.', 'Basketball', 5),
                ('Force One Low', 110.00, 'https://images.unsplash.com/photo-1549298916-b41d501d3772', 'Timeless white sneakers.', 'Lifestyle', 20);
            END

            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Wishlist' AND xtype='U')
            BEGIN
                CREATE TABLE Wishlist (
                    WishlistID INT PRIMARY KEY IDENTITY(1,1),
                    UserID INT FOREIGN KEY REFERENCES Users(UserID),
                    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
                    CreatedAt DATETIME DEFAULT GETDATE(),
                    UNIQUE(UserID, ProductID)
                );
            END

            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Orders' AND xtype='U')
            BEGIN
                CREATE TABLE Orders (
                    OrderID INT PRIMARY KEY IDENTITY(1,1),
                    UserID INT FOREIGN KEY REFERENCES Users(UserID),
                    TotalAmount DECIMAL(10, 2) NOT NULL,
                    Status NVARCHAR(50) DEFAULT 'Pending',
                    CreatedAt DATETIME DEFAULT GETDATE()
                );
            END

            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OrderItems' AND xtype='U')
            BEGIN
                CREATE TABLE OrderItems (
                    OrderItemID INT PRIMARY KEY IDENTITY(1,1),
                    OrderID INT FOREIGN KEY REFERENCES Orders(OrderID),
                    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
                    Quantity INT NOT NULL,
                    Price DECIMAL(10, 2) NOT NULL
                );
            END
        `;

        pool.request().query(createTablesQuery)
            .then(() => console.log('✅ Database tables initialized.'))
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
