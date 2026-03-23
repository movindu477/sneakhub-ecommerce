create database SneakHub;
use SneakHub;

CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(500) NULL,
    PhoneNumber NVARCHAR(20) NULL,
    Role NVARCHAR(20) DEFAULT 'Customer',
    LoginProvider NVARCHAR(50) DEFAULT 'Local',
    ProviderID NVARCHAR(255) NULL,
    EmailVerified BIT DEFAULT 0,
    AccountStatus NVARCHAR(20) DEFAULT 'Active',
    FailedLoginAttempts INT DEFAULT 0,
    PasswordResetToken NVARCHAR(255) NULL,
    PasswordResetExpiry DATETIME NULL,
    LastLogin DATETIME NULL,
    LastLoginIP NVARCHAR(45) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL
);

create table Products(
	ProductID int identity(1,1) primary key,
	ProductName NVARCHAR(255) NOT NULL,
	Brand NVARCHAR(100) NOT NULL,
	Category NVARCHAR(20) NOT NULL,
	Gender NVARCHAR(20) NOT NULL,
	Price DECIMAL(10,2) NULL,
	DiscountPrice DECIMAL(10,2) NULL,
	Description NVARCHAR(MAX) NULL,
	StockQuantity INT NOT NULL,
	Rating DECIMAL(2,1) DEFAULT 0,
	ReviewCount INT DEFAULT 0,
	ProductImageURL NVARCHAR(500) NOT NULL,
	IsActive BIT DEFAULT 1,
	CreatedAt DATETIME DEFAULT GETDATE(),
	UpdatedAt DATETIME NULL
);

INSERT INTO Users (
    FirstName,
    LastName,
    Email,
    PasswordHash,
    PhoneNumber,
    Role,
    LoginProvider,
    EmailVerified
)
VALUES (
    'Admin',
    'User',
    'admin@sneakhub.com',
    'movindu2005',
    '0771234567',
    'Admin',
    'Local',
    1
);

INSERT INTO Products 
(ProductName, Brand, Category, Gender, Price, DiscountPrice, Description, StockQuantity, ProductImageURL)
VALUES
-- 1. AIR MAX CLASSICS
('Nike Air Max 90', 'Nike', 'Lifestyle', 'Men', 130.00, 110.00, 'Classic Air Max style with visible Air cushioning. Iconic design that never goes out of style.', 45, 'src/assets/images/nike1.avif'),
('Nike Air Max 95', 'Nike', 'Lifestyle', 'Men', 175.00, NULL, 'Bold gradients and layered design inspired by the human body. Premium comfort for everyday wear.', 32, 'src/assets/images/nike2.avif'),
('Nike Air Max 97', 'Nike', 'Lifestyle', 'Unisex', 185.00, 160.00, 'Sleek silver bullet design with full-length Air unit. Water-ripple lines for a futuristic look.', 28, 'src/assets/images/nike3.avif'),
('Nike Air Max 270', 'Nike', 'Running', 'Men', 160.00, 140.00, 'Largest Air heel unit ever for all-day comfort. Modern style meets maximum cushioning.', 50, 'src/assets/images/nike4.avif'),

-- 2. AIR FORCE SERIES
('Nike Air Force 1 07', 'Nike', 'Casual', 'Unisex', 110.00, 95.00, 'The original basketball classic. Clean leather upper with iconic AF1 style and comfort.', 60, 'src/assets/images/nike5.avif'),
('Nike Air Force 1 Low', 'Nike', 'Casual', 'Men', 100.00, NULL, 'Low-cut silhouette with timeless design. Perfect for everyday streetwear style.', 55, 'src/assets/images/nike6.avif'),
('Nike Air Force 1 Shadow', 'Nike', 'Casual', 'Women', 115.00, NULL, 'Double-layered details for a playful twist. Exaggerated proportions with feminine style.', 25, 'src/assets/images/nike7.avif'),

-- 3. DUNK SERIES
('Nike Dunk Low Retro', 'Nike', 'Casual', 'Unisex', 115.00, 100.00, 'College basketball legend turned streetwear icon. Premium leather with classic color blocking.', 40, 'src/assets/images/nike8.avif'),
('Nike Dunk High Retro', 'Nike', 'Casual', 'Men', 135.00, NULL, 'High-top version with vintage basketball style. Bold colors and premium materials.', 18, 'src/assets/images/nike9.avif'),
('Nike Dunk Low SB', 'Nike', 'Skateboarding', 'Men', 120.00, 105.00, 'Skateboarding specific with Zoom Air cushioning. Durable suede and canvas upper.', 35, 'src/assets/images/nike10.avif'),

-- 4. JORDAN SERIES
('Air Jordan 1 Mid', 'Nike', 'Basketball', 'Men', 125.00, NULL, 'The shoe that started it all. Mid-top height with premium leather and iconic colorways.', 38, 'src/assets/images/nike11.avif'),
('Air Jordan 1 High OG', 'Nike', 'Basketball', 'Men', 180.00, 165.00, 'Original high-top design with premium materials. Basketball heritage meets street culture.', 15, 'src/assets/images/nike12.avif'),
('Air Jordan 1 Low', 'Nike', 'Basketball', 'Unisex', 110.00, 100.00, 'Low-cut version of the iconic AJ1. Sleek design with the same legendary style.', 42, 'src/assets/images/nike13.avif'),
('Air Jordan 3 Retro', 'Nike', 'Basketball', 'Men', 200.00, NULL, 'First Jordan with visible Air unit. Elephant print details and premium craftsmanship.', 12, 'src/assets/images/nike14.avif'),
('Air Jordan 4 Retro', 'Nike', 'Basketball', 'Men', 210.00, 195.00, 'Mesh panels and supportive wings. Tinker Hatfield design with timeless appeal.', 10, 'src/assets/images/nike15.avif'),

-- 5. RUNNING SERIES
('Nike Pegasus 40', 'Nike', 'Running', 'Men', 130.00, 115.00, 'Trusted daily trainer with React foam cushioning. Neutral support for every runner.', 48, 'src/assets/images/nike16.avif'),
('Nike Vaporfly 3', 'Nike', 'Running', 'Men', 260.00, 240.00, 'Elite racing shoe with ZoomX foam and carbon plate. World record breaking performance.', 20, 'src/assets/images/nike17.avif'),
('Nike LeBron 21', 'Nike', 'Basketball', 'Men', 200.00, NULL, 'Built for the king with 360-degree containment. Cushioned for explosive power.', 22, 'src/assets/images/nike18.avif'),
('Nike KD 16', 'Nike', 'Basketball', 'Men', 160.00, 145.00, 'Kevin Durant signature with Air Zoom cushioning. Lightweight for versatile players.', 28, 'src/assets/images/nike19.avif'),
('Nike Blazer Mid 77', 'Nike', 'Lifestyle', 'Unisex', 105.00, 90.00, 'Vintage basketball style with retro appeal. Clean lines and classic suede toe cap.', 50, 'src/assets/images/nike20.avif');

select * from Users;
select * from Products;

