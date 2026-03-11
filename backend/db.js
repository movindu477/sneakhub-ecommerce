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
                    ProductName NVARCHAR(255) NOT NULL,
                    Brand NVARCHAR(100) NULL,
                    Category NVARCHAR(100) NULL,
                    Price DECIMAL(10, 2) NOT NULL,
                    DiscountPrice DECIMAL(10, 2) NULL,
                    Description NVARCHAR(MAX) NULL,
                    StockQuantity INT DEFAULT 0,
                    ProductImageURL NVARCHAR(MAX) NULL,
                    Rating DECIMAL(3, 2) DEFAULT 0,
                    ReviewCount INT DEFAULT 0,
                    CreatedAt DATETIME DEFAULT GETDATE()
                );
                
                -- Seed the products with proper server-hosted image URLs
                INSERT INTO Products (ProductName, Brand, Category, Price, Description, StockQuantity, ProductImageURL, Rating, ReviewCount)
                VALUES 
                ('AirStride X1', 'SneakHub', 'Running', 39.99, 'Designed for speed and comfort.', 50, 'http://localhost:5000/assets/images/nike1.avif', 4.8, 120),
                ('AirStride Pro', 'SneakHub', 'Running', 129.99, 'Professional grade performance.', 30, 'http://localhost:5000/assets/images/nike2.avif', 4.9, 85),
                ('Cloud Walker', 'SneakHub', 'Lifestyle', 89.00, 'Walk on clouds with every step.', 40, 'http://localhost:5000/assets/images/nike3.avif', 4.7, 210),
                ('Swift Runner', 'SneakHub', 'Running', 150.00, 'The lightest runner in our collection.', 25, 'http://localhost:5000/assets/images/nike4.avif', 4.6, 95),
                ('Air Max Pulse', 'Nike', 'Lifestyle', 165.00, 'Next-gen comfort and street style.', 20, 'http://localhost:5000/assets/images/nike5.avif', 4.8, 150),
                ('Jordan Retro 4', 'Jordan', 'Basketball', 210.00, 'Timeless classic for every legend.', 15, 'http://localhost:5000/assets/images/nike6.avif', 5.0, 300),
                ('Dunk Low Panda', 'Nike', 'Lifestyle', 110.00, 'Iconic simplicity with dual tones.', 100, 'http://localhost:5000/assets/images/nike7.avif', 4.7, 1200),
                ('Air Force 1 ''07', 'Nike', 'Lifestyle', 115.00, 'The original court-to-street icon.', 80, 'http://localhost:5000/assets/images/nike8.avif', 4.8, 950),
                ('Zoom Pegasus 40', 'Nike', 'Running', 130.00, 'A springy ride for every run.', 45, 'http://localhost:5000/assets/images/nike9.avif', 4.6, 210),
                ('Air Jordan 1 Low', 'Jordan', 'Lifestyle', 110.00, 'Inspired by the 1985 original.', 12, 'http://localhost:5000/assets/images/nike10.avif', 4.9, 180),
                ('Vomitero 5 Premium', 'Nike', 'Running', 160.00, 'Retro style with modern comfort.', 18, 'http://localhost:5000/assets/images/nike11.avif', 4.7, 65),
                ('Metcon 9', 'Nike', 'Training', 150.00, 'The gold standard for lifting.', 35, 'http://localhost:5000/assets/images/nike12.avif', 4.8, 240);
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

            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Cart' AND xtype='U')
            BEGIN
                CREATE TABLE Cart (
                    CartID INT PRIMARY KEY IDENTITY(1,1),
                    UserID INT FOREIGN KEY REFERENCES Users(UserID),
                    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
                    Quantity INT DEFAULT 1,
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
