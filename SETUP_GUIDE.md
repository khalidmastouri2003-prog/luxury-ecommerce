# SETUP AND USAGE GUIDE

## Quick Start (5 Minutes)

### 1. Database Setup
```bash
# Create database and import schema
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seeder.sql
```

### 2. Configure Database Connection
Edit `config/app.php`:
```php
'database' => [
    'host' => 'localhost',
    'dbname' => 'jewelry_store',
    'username' => 'root',
    'password' => '', // Your password
]
```

### 3. Set Document Root
Point your web server's document root to the `public/` folder.

For Apache:
```apache
DocumentRoot "/path/to/luxury-ecommerce/public"
```

### 4. Enable URL Rewriting
Make sure `.htaccess` is properly configured in `public/` folder.

### 5. Access Application
- Home: `http://localhost/`
- Products: `http://localhost/products`
- Admin: `http://localhost/admin`

## 🔑 Default Credentials

**Admin Account:**
- Username: `admin`
- Email: `admin@jewelrystore.com`
- Password: `Admin@2024`

**Test Customer:**
- Email: `customer@example.com`
- Password: `Customer@2024` (register new one)

## 📋 What's Implemented

### ✅ Core Framework
- Routing system (see `config/routes.php`)
- Database abstraction layer
- Model-View-Controller architecture
- Security utilities (hashing, validation, CSRF)
- Session management

### ✅ Frontend Pages
- Homepage with featured/new products
- Product listing with filters
- Product details page
- Shopping cart
- Responsive design
- Multilingual support (templates ready)

### ✅ Database
- Complete schema with all necessary tables
- Sample data (products, categories, collections)
- Relationships and constraints
- Performance indexes

### ✅ Styling & Interactivity
- Professional CSS framework
- Bootstrap 5 integration
- JavaScript cart operations (AJAX)
- Responsive design for all devices
- RTL support for Arabic text

### 🔄 Partially Implemented
- Authentication (structure ready, needs controller)
- Admin dashboard (routes ready, needs views)
- Checkout process (needs controller & views)
- Payment integration (hooks ready)

## 📝 Next Steps to Complete

### 1. Authentication ⚠️
The structure is ready. To implement:

```php
// src/Controllers/AuthController.php
class AuthController {
    public function login() {
        // Show login form
        $this->view->render('auth.login');
    }
    
    public function doLogin() {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        
        $customerModel = new \Models\Customer();
        $customer = $customerModel->authenticate($email, $password);
        
        if ($customer) {
            \Core\Session::set('user_id', $customer['id']);
            \Core\Session::set('user', $customer);
            header('Location: ' . BASE_PATH . '/account');
            exit;
        }
        
        \Core\Session::setFlash('error', 'بيانات دخول غير صحيحة');
        header('Location: ' . BASE_PATH . '/login');
    }
}
```

### 2. Create Template Files
Templates needed in `resources/views/`:
- `auth/login.php` - Login form
- `auth/register.php` - Registration form
- `auth/forgot-password.php` - Password recovery
- `products/show.php` - Product detail page
- `cart/index.php` - Cart page
- `checkout/index.php` - Checkout form

### 3. Admin Dashboard
Create admin templates in `resources/views/admin/`:
- `dashboard.php` - Main dashboard
- `products/index.php` - Product list
- `products/form.php` - Product form
- `orders/index.php` - Orders list
- `orders/view.php` - Order details

### 4. Checkout Process
Implement `CheckoutController`:
- Validate shipping address
- Calculate shipping cost
- Integrate payment gateway
- Create order from cart
- Send WhatsApp notification

## 🔧 Common Customizations

### Change Colors
Edit `public/assets/css/style.css`:
```css
:root {
    --primary: #d4af37;      /* Gold */
    --primary-dark: #b8941f;
    --secondary: #222;       /* Dark */
    --light: #f8f8f8;
    --dark: #1a1a1a;
}
```

### Change Branding
Edit `resources/views/partials/navbar.php` and `footer.php`

### Add New Product Fields
1. Add column to database:
   ```sql
   ALTER TABLE products ADD COLUMN new_field VARCHAR(255);
   ```

2. Add to Model fillable:
   ```php
   protected $fillable = [..., 'new_field'];
   ```

3. Update forms and templates

### Setup Payment Gateway
1. Register with payment provider (Stripe, PayPal, etc.)
2. Create `PaymentController`
3. Handle webhook callbacks
4. Update `Order` model status

### Enable WhatsApp Integration
Edit `config/app.php`:
```php
'whatsapp' => [
    'enabled' => true,
    'phone_number' => '+212684604167',
    'api_key' => 'your-api-key',
]
```

## 🚀 Deployment Checklist

- [ ] Set `'debug' => false` in config/app.php
- [ ] Update database credentials
- [ ] Generate secure CSRF tokens
- [ ] Setup HTTPS/SSL certificate
- [ ] Configure email settings
- [ ] Setup payment gateway
- [ ] Enable logging to file
- [ ] Test all forms and checkout
- [ ] Optimize images
- [ ] Minify CSS and JavaScript
- [ ] Setup database backups
- [ ] Monitor error logs
- [ ] Setup monitoring/uptime checks

## 📞 Support & Help

### Common Issues

**White screen of death?**
- Check error logs in `storage/logs/`
- Set `'debug' => true` temporarily
- Check database connection

**Routes not working?**
- Verify `.htaccess` is in place
- Check Apache mod_rewrite enabled
- Verify `BASE_PATH` setting

**Database errors?**
- Check credentials in config/app.php
- Verify database exists
- Import schema.sql and seeder.sql

**Forms not submitting?**
- Check CSRF token is present
- Verify form method matches route
- Check browser console for errors

## 📚 File Structure Reference

```
public/                 ← Document root
├── index.php          ← Entry point
└── assets/
    ├── css/style.css  ← Main styles
    ├── js/main.js     ← Main script
    └── uploads/       ← User files

src/
├── Core/              ← Framework core
├── Controllers/       ← Request handlers
├── Models/            ← Data models
└── Helpers/           ← Utility classes

resources/views/       ← Templates
├── layouts/           ← Page layouts
├── partials/          ← Reusable components
├── pages/             ← Page templates
├── products/          ← Product pages
├── auth/              ← Auth pages
└── cart/              ← Cart pages

config/                ← Configuration
├── app.php            ← App config
├── database.php       ← DB connection
├── routes.php         ← URL routes
├── security.php       ← Security config
└── init.php           ← Bootstrap file

database/              ← Database files
├── schema.sql         ← Database schema
└── seeder.sql         ← Sample data

storage/logs/          ← Log files
```

## 🎯 Feature Roadmap

### Phase 1 (Current) - Core Functionality ✅
- [x] Product management
- [x] Shopping cart
- [x] Customer management
- [x] Order management
- [x] Admin dashboard structure

### Phase 2 - Enhanced Features
- [ ] Payment integration
- [ ] Email notifications
- [ ] Customer reviews
- [ ] Wishlist
- [ ] Product recommendations

### Phase 3 - Advanced Features
- [ ] Inventory management
- [ ] Promotions/coupons
- [ ] Shipping integrations
- [ ] Analytics dashboard
- [ ] API for mobile app

---

**Questions? Check the full documentation in README.md**
