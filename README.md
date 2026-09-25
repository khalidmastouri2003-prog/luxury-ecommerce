# Luxury Jewelry Store - Ecommerce Platform

A professional, production-ready luxury jewelry ecommerce platform built with PHP, MySQL, and modern web technologies.

## 🎯 Project Overview

This is a complete ecommerce solution designed for luxury jewelry stores, featuring:
- Modern, responsive design
- Complete product management system
- Shopping cart and checkout
- Customer accounts and order history
- Admin dashboard
- Payment integration ready
- WhatsApp integration for orders
- Multilingual support (Arabic, French, English)
- Security best practices
- Performance optimized

## 📁 Project Structure

```
luxury-ecommerce/
├── config/                  # Configuration files
│   ├── app.php             # Application configuration
│   ├── database.php        # Database connection
│   ├── init.php            # Bootstrap file
│   ├── routes.php          # Route definitions
│   └── security.php        # Security settings
│
├── src/                    # Source code
│   ├── Core/              # Core classes
│   │   ├── Database.php   # Database wrapper
│   │   ├── Router.php     # URL routing
│   │   ├── Security.php   # Security utilities
│   │   ├── Session.php    # Session management
│   │   └── View.php       # Template engine
│   │
│   ├── Controllers/       # Request handlers
│   │   ├── HomeController.php
│   │   ├── ProductController.php
│   │   ├── CartController.php
│   │   ├── AuthController.php
│   │   ├── AdminController.php
│   │   └── ...
│   │
│   ├── Models/           # Data models
│   │   ├── Model.php     # Base model class
│   │   ├── Product.php
│   │   ├── Customer.php
│   │   ├── Order.php
│   │   ├── Category.php
│   │   ├── Cart.php
│   │   └── ...
│   │
└── public/               # Web root (document root)
    ├── index.php        # Entry point
    ├── .htaccess        # Apache rewrite rules
    └── assets/
        ├── css/         # Stylesheets
        ├── js/          # JavaScript files
        └── uploads/     # User uploaded files

├── resources/           # Frontend resources
│   └── views/          # Template files
│       ├── layouts/    # Layout templates
│       ├── partials/   # Reusable components
│       ├── pages/      # Page templates
│       ├── products/   # Product pages
│       ├── auth/       # Auth pages
│       └── cart/       # Cart pages

├── database/           # Database files
│   ├── schema.sql      # Database schema
│   └── seeder.sql      # Sample data

└── storage/
    └── logs/           # Log files
```

## 🚀 Installation & Setup

### Prerequisites
- PHP 7.4+
- MySQL 5.7+
- Apache with mod_rewrite enabled
- Composer (optional, for package management)

### Step 1: Create Database

```sql
CREATE DATABASE jewelry_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE jewelry_store;
```

### Step 2: Import Database Schema

```bash
mysql -u root -p jewelry_store < database/schema.sql
mysql -u root -p jewelry_store < database/seeder.sql
```

### Step 3: Configure Application

Edit `config/app.php`:
```php
'database' => [
    'host' => 'localhost',
    'dbname' => 'jewelry_store',
    'username' => 'root',
    'password' => 'your_password',
]
```

### Step 4: Set Web Root

Configure your Apache virtual host to point to `public/` directory:
```apache
<VirtualHost *:80>
    ServerName luxury-ecommerce.local
    DocumentRoot "/path/to/public"
    <Directory "/path/to/public">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### Step 5: Access Application

- Frontend: `http://localhost/luxury-ecommerce`
- Admin: `http://localhost/luxury-ecommerce/admin`
- Default Admin Credentials:
  - Username: `admin`
  - Email: `admin@jewelrystore.com`
  - Password: `Admin@2024`

## 🔐 Security Features

- **PDO Prepared Statements** - SQL injection prevention
- **Password Hashing** - bcrypt with cost 12
- **CSRF Protection** - Token-based CSRF defense
- **XSS Protection** - HTML escaping and sanitization
- **Session Security** - Regeneration and timeout checks
- **File Upload Validation** - MIME type and size checks
- **Rate Limiting** - Prevent brute force attacks
- **Secure Cookies** - HTTPOnly, Secure, SameSite flags
- **Input Validation** - Email, phone, price validation

## 🗄️ Database Schema

### Core Tables

#### Products
- SKU, name, description, pricing
- Stock management
- SEO optimization
- Status tracking

#### Categories & Collections
- Multilingual support
- Product organization
- Icon/image support

#### Customers
- User registration and authentication
- Address management
- Profile information
- Newsletter subscription

#### Orders & Order Items
- Order management
- Status tracking
- Payment information
- Shipping details

#### Shopping Cart
- Session/customer-based carts
- Item management
- Quantity tracking

#### Reviews & Ratings
- Product reviews
- Star ratings
- Approval workflow

#### Admin Logs
- Audit trail
- Admin actions tracking
- Security monitoring

## 🎨 Frontend Architecture

### Responsive Design
- Mobile-first approach
- Bootstrap 5 grid system
- RTL support for Arabic
- Breakpoints: xs (mobile), sm, md, lg, xl

### CSS Structure
- CSS Variables for theming
- BEM naming convention
- Luxury color scheme (gold, dark, white)
- Smooth transitions and animations

### JavaScript
- Vanilla JS (no jQuery dependency)
- Async/await for API calls
- Event delegation
- Modern browser support

## 📝 API Endpoints

### Public Routes
```
GET     /                          Home page
GET     /products                  Products listing
GET     /product/{id}              Product details
POST    /products/search           Search products
GET     /cart                      View cart
POST    /cart/add                  Add item to cart
POST    /cart/update               Update quantity
POST    /cart/remove               Remove item
GET     /cart/count                Get item count
GET     /login                     Login page
POST    /login                     Process login
GET     /register                  Registration page
POST    /register                  Process registration
GET     /logout                    Logout
```

### Admin Routes
```
GET/POST /admin/login              Admin login
GET     /admin                     Admin dashboard
GET     /admin/products            Products management
GET     /admin/orders              Orders management
GET     /admin/customers           Customers management
GET     /admin/settings            Settings
```

## 🛠️ Development Guide

### Creating a New Controller

```php
<?php
class YourController
{
    private $view;
    private $model;

    public function __construct()
    {
        $this->view = new \Core\View();
        $this->model = new \Models\YourModel();
    }

    public function index()
    {
        $data = $this->model->all();
        
        $this->view->setLayout('main');
        $this->view->setData([
            'title' => 'Your Page',
            'data' => $data
        ]);
        
        $this->view->render('your_view');
    }
}
```

### Creating a New Model

```php
<?php
namespace Models;

class YourModel extends Model
{
    protected $table = 'your_table';
    protected $fillable = ['field1', 'field2'];

    public function customMethod()
    {
        // Your custom logic
    }
}
```

### Adding Routes

Edit `config/routes.php`:
```php
$router->add('/your-route', 'YourController', 'yourMethod', 'GET');
```

## 📦 Dependencies

### Frontend
- Bootstrap 5.3 (CSS Framework)
- Font Awesome 6 (Icons)
- Cairo Font (Arabic Typography)

### Backend
- PHP 7.4+ (Core)
- MySQL/PDO (Database)
- Built-in PHP Security (password_hash, filter_var, etc.)

## 🔄 Git Workflow

```bash
# Clone repository
git clone <repo-url>

# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git add .
git commit -m "Add your feature"

# Push to repository
git push origin feature/your-feature

# Create pull request
```

## 📊 Performance Optimization

- CSS and JS minification ready
- Image lazy loading
- Database query optimization
- Caching ready
- CDN-friendly asset delivery

## 🧪 Testing Checklist

- [ ] Homepage loads correctly
- [ ] Products display with images
- [ ] Search functionality works
- [ ] Add to cart works
- [ ] Cart totals calculate correctly
- [ ] Login/registration works
- [ ] Admin dashboard accessible
- [ ] Product creation works
- [ ] Order management works
- [ ] All forms validate inputs
- [ ] Responsive design on mobile
- [ ] RTL layout works properly

## 📝 Common Tasks

### Add New Product Field
1. Add column to `products` table
2. Add to `Product` model `$fillable` array
3. Update product form
4. Update product templates

### Add New Language
1. Update `app.php` configuration
2. Add translation keys to views
3. Test RTL/LTR switching

### Setup Payment Gateway
1. Create `PaymentController`
2. Implement gateway API
3. Add to checkout process
4. Update Order model

### Send Order Notifications
1. Implement `NotificationController`
2. Create email/SMS templates
3. Integrate WhatsApp helper
4. Add to order creation

## 🐛 Debugging

Enable debug mode in `config/app.php`:
```php
'debug' => true
```

Check logs:
```bash
tail -f storage/logs/php-errors.log
```

## 📄 License

This project is proprietary and confidential.

## 👥 Support

For issues or questions, contact the development team.

---

**Built with ❤️ for luxury jewelry businesses**
