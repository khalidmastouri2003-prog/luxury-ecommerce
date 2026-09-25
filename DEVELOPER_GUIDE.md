# Developer Guide - Luxury Jewelry Store

## Architecture Overview

This document describes the technical architecture and patterns used in the Luxury Jewelry Store platform.

## MVC Architecture

### Model (Data Layer)
**Location:** `src/Models/`

Models are responsible for:
- Database interaction
- Data validation
- Business logic
- Query building

**Pattern:**
```php
namespace Models;

class YourModel extends Model {
    protected $table = 'your_table';
    protected $fillable = ['field1', 'field2'];
    protected $casts = [];  // Type casting
    
    // Custom query methods
    public function customQuery() {
        $sql = "SELECT * FROM {$this->table} WHERE ...";
        return $this->queryAll($sql);
    }
}
```

**Available Methods (from base Model class):**
- `find($id)` - Get single record by primary key
- `findBy($column, $value)` - Get by specific column
- `all($limit, $offset)` - Get multiple records
- `count($where)` - Count records
- `create($data)` - Insert new record
- `update($id, $data)` - Update record
- `delete($id)` - Delete record
- `query($sql, $params)` - Execute custom query
- `queryOne($sql, $params)` - Get single result from custom query
- `queryAll($sql, $params)` - Get multiple results from custom query

### View (Presentation Layer)
**Location:** `resources/views/`

Views are responsible for:
- Rendering HTML
- Displaying data
- Handling user interaction
- Responsive design

**Template Structure:**
```
resources/views/
├── layouts/              # Page layouts
│   └── main.php         # Main layout wrapper
├── partials/            # Reusable components
│   ├── navbar.php
│   ├── footer.php
│   └── product-card.php
├── pages/               # Full page views
│   └── home.php
├── products/            # Feature-specific
│   ├── index.php
│   └── show.php
├── auth/                # Auth pages
├── cart/                # Cart pages
└── admin/               # Admin pages
```

**Rendering Views:**
```php
$view = new \Core\View();
$view->setLayout('main');
$view->setData([
    'title' => 'Page Title',
    'products' => $products
]);
$view->render('products.index');
```

**In Templates:**
```php
<?php
// Data is automatically available
echo $title;                           // Direct access
echo \Core\View::escape($product);     // Escape output
echo \Core\View::formatDate($date);    // Format helpers
echo \Core\View::formatPrice($price);
$this->partial('component-name');      // Include partial
?>
```

### Controller (Logic Layer)
**Location:** `src/Controllers/`

Controllers are responsible for:
- Receiving requests
- Processing input
- Coordinating models and views
- Sending responses

**Pattern:**
```php
class YourController {
    private $view;
    private $model;
    
    public function __construct() {
        $this->view = new \Core\View();
        $this->model = new \Models\YourModel();
    }
    
    public function index() {
        // Get data
        $data = $this->model->all();
        
        // Process data
        $processed = $this->processData($data);
        
        // Render view
        $this->view->setLayout('main');
        $this->view->setData([
            'title' => 'Page Title',
            'data' => $processed
        ]);
        $this->view->render('your.view');
    }
    
    public function create() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            try {
                // Validate CSRF token
                \Core\Security::validateCSRFToken($_POST['csrf_token']);
                
                // Validate input
                $this->validateInput($_POST);
                
                // Create record
                $id = $this->model->create($_POST);
                
                // Set success message
                \Core\Session::setFlash('success', 'Record created');
                
                // Redirect
                header('Location: ' . BASE_PATH . '/your-route/' . $id);
                exit;
            } catch (\Exception $e) {
                \Core\Session::setFlash('error', $e->getMessage());
            }
        }
        
        // Show form
        $this->view->render('your.form');
    }
    
    private function validateInput($data) {
        // Validation logic
    }
}
```

## Core Classes

### Database (`src/Core/Database.php`)

**Singleton Pattern:**
```php
$config = require 'config/app.php';
$db = \Core\Database::getInstance($config['database']);
$connection = $db->getConnection();
```

**Query Methods:**
```php
// Prepared query
$stmt = $db->prepare("SELECT * FROM users WHERE email = :email");
$stmt->execute(['email' => 'user@example.com']);

// Execute with parameters
$db->execute("INSERT INTO users (name) VALUES (:name)", ['name' => 'John']);

// Get single row
$user = $db->getOne("SELECT * FROM users WHERE id = :id", ['id' => 1]);

// Get multiple rows
$users = $db->getAll("SELECT * FROM users");

// Count rows
$count = $db->count("SELECT COUNT(*) FROM users");
```

### Router (`src/Core/Router.php`)

**Route Definition Pattern:**
```php
// GET request
$router->add('/route/{id}', 'ControllerName', 'actionName', 'GET');

// POST request
$router->add('/route', 'ControllerName', 'store', 'POST');

// Route parameters are passed to action method
public function show($id) {
    // $id comes from route parameter
}
```

**Route Parameters:**
- `{id}` - Alphanumeric and hyphens
- `/route` - Exact match
- `/route/sub` - Nested routes

### Security (`src/Core/Security.php`)

**Utilities Provided:**
```php
// Password hashing
$hash = \Core\Security::hashPassword($password);
$valid = \Core\Security::verifyPassword($password, $hash);

// Input validation
\Core\Security::sanitize($input);                    // Remove HTML
\Core\Security::validateEmail($email);               // Validate email
\Core\Security::validatePhone($phone);               // Validate phone
\Core\Security::validatePrice($price);               // Validate price

// CSRF protection
$token = \Core\Security::generateCSRFToken();
\Core\Security::validateCSRFToken($_POST['token']);

// File upload validation
$filename = \Core\Security::validateImage($_FILES['image']);

// Rate limiting
$security->checkRateLimit('login_' . $ip, 10, 60);   // 10 requests per minute
```

### Session (`src/Core/Session.php`)

**Session Management:**
```php
// Initialize
\Core\Session::start($config);

// Get/Set values
\Core\Session::set('user_id', 123);
$userId = \Core\Session::get('user_id');
\Core\Session::has('user_id');
\Core\Session::remove('user_id');

// Flash messages (one-time)
\Core\Session::setFlash('success', 'Operation completed');
$message = \Core\Session::getFlash('success');
$allFlashes = \Core\Session::getAllFlash();

// Security
\Core\Session::regenerate();                         // Regenerate ID
\Core\Session::checkTimeout(3600);                   // Check expiry
\Core\Session::destroy();                            // Clear all
```

### View (`src/Core/View.php`)

**Template Rendering:**
```php
$view = new \Core\View();

// Set template data
$view->setData('key', 'value');
$view->setData(['key1' => 'value1', 'key2' => 'value2']);

// Set layout
$view->setLayout('main');

// Render
$view->render('path.to.template');

// Get as string
$html = $view->renderToString('path.to.template');

// Include partial
$view->partial('component-name', ['data' => $value]);

// Helper functions
\Core\View::escape($string);           // Escape HTML
\Core\View::formatDate($date, $format);
\Core\View::formatPrice($price, $currency);
```

## Routing & URLs

### Adding Routes

**File:** `config/routes.php`

```php
// Simple GET route
$router->add('/products', 'ProductController', 'index', 'GET');

// Route with parameter
$router->add('/product/{id}', 'ProductController', 'show', 'GET');

// POST route
$router->add('/products/store', 'ProductController', 'store', 'POST');

// API route
$router->add('/api/products', 'ApiProductController', 'list', 'GET');
```

### Generating URLs

**In Templates:**
```php
<?php
// Base URL
echo BASE_PATH;                                    // /luxury-ecommerce

// Full URLs
<a href="<?php echo BASE_PATH; ?>/products">Products</a>
<a href="<?php echo BASE_PATH; ?>/product/123">Product</a>

// Using helper if created
echo url('/products');
echo url('/product', ['id' => 123]);
?>
```

## Database Patterns

### Creating Tables

**Pattern:**
```sql
CREATE TABLE your_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Relationships

**Foreign Keys:**
```sql
ALTER TABLE products ADD CONSTRAINT fk_products_category
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT;
```

**Many-to-Many:**
```sql
CREATE TABLE product_collections (
    product_id INT,
    collection_id INT,
    PRIMARY KEY (product_id, collection_id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (collection_id) REFERENCES collections(id)
);
```

## Configuration

### config/app.php

```php
return [
    'app' => [
        'name' => 'Store Name',
        'environment' => 'development',  // or 'production'
        'debug' => true,
        'url' => 'http://localhost/luxury-ecommerce',
        'basePath' => '/luxury-ecommerce',
    ],
    
    'database' => [
        'host' => 'localhost',
        'dbname' => 'db_name',
        'username' => 'user',
        'password' => 'pass',
    ],
    
    // ... other settings
];
```

### Environment-Based Configuration

```php
// Use environment variables
$dbHost = getenv('DB_HOST') ?: 'localhost';

// Different configs per environment
if (APP_ENV === 'production') {
    $debug = false;
    $logPath = '/var/log/app.log';
} else {
    $debug = true;
    $logPath = __DIR__ . '/logs/dev.log';
}
```

## Error Handling

### Try-Catch Pattern

```php
try {
    // Risky operation
    $result = $this->model->create($data);
} catch (\Exception $e) {
    // Log error
    error_log($e->getMessage());
    
    // Set user message
    \Core\Session::setFlash('error', 'Operation failed');
    
    // Redirect or show error page
    header('Location: ' . BASE_PATH . '/error');
    exit;
}
```

### Validation Pattern

```php
public function validate($data) {
    $errors = [];
    
    if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email';
    }
    
    if (strlen($data['password'] ?? '') < 8) {
        $errors['password'] = 'Password too short';
    }
    
    if (!empty($errors)) {
        throw new \Exception(implode(', ', $errors));
    }
}
```

## Security Best Practices

### Input Validation

```php
// Always validate input
$email = $_POST['email'] ?? '';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    throw new \Exception('Invalid email');
}

// Sanitize if needed
$name = strip_tags($_POST['name']);
```

### Output Escaping

```php
// Always escape output
echo htmlspecialchars($user['name'], ENT_QUOTES, 'UTF-8');

// Or use helper
echo \Core\View::escape($user['name']);
```

### CSRF Protection

```php
// In form
<input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">

// In controller
\Core\Security::validateCSRFToken($_POST['csrf_token'] ?? '');
```

### Prepared Statements

```php
// GOOD - Always use prepared statements
$sql = "SELECT * FROM users WHERE email = :email";
$user = $db->getOne($sql, ['email' => $email]);

// BAD - Never concatenate
$sql = "SELECT * FROM users WHERE email = '$email'";  // SQL injection risk
```

## API Patterns

### JSON Responses

```php
// Success response
header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'data' => $data,
    'message' => 'Operation successful'
]);

// Error response
http_response_code(400);
echo json_encode([
    'success' => false,
    'message' => 'Error message'
]);
exit;
```

### AJAX Handling

```javascript
// Send AJAX request
fetch('/api/endpoint', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        // Handle success
    } else {
        // Handle error
    }
})
.catch(error => console.error('Error:', error));
```

## Extending the System

### Adding a New Feature

1. **Create Model** (`src/Models/Feature.php`)
   ```php
   class Feature extends Model {
       protected $table = 'features';
       protected $fillable = ['name', 'description'];
   }
   ```

2. **Create Controller** (`src/Controllers/FeatureController.php`)
   ```php
   class FeatureController {
       public function index() { ... }
       public function show($id) { ... }
   }
   ```

3. **Add Routes** (`config/routes.php`)
   ```php
   $router->add('/features', 'FeatureController', 'index');
   $router->add('/feature/{id}', 'FeatureController', 'show');
   ```

4. **Create Views** (`resources/views/features/`)
   ```
   index.php
   show.php
   ```

5. **Add Database Table** (`database/migrations/`)
   ```sql
   CREATE TABLE features ( ... );
   ```

## Testing

### Manual Testing Checklist

- [ ] Create record
- [ ] Read record
- [ ] Update record
- [ ] Delete record
- [ ] List records
- [ ] Filter records
- [ ] Search records
- [ ] Pagination works
- [ ] Forms validate
- [ ] Error messages display
- [ ] Success messages display
- [ ] Redirects work
- [ ] CSRF tokens validate
- [ ] Database transactions work

### Testing Security

- [ ] SQL injection attempts fail
- [ ] XSS attempts fail
- [ ] CSRF attempts fail
- [ ] Unauthorized access blocked
- [ ] Rate limiting works
- [ ] Password hashing works
- [ ] Session timeout works

## Performance Optimization

### Database Optimization

```php
// Use indexes
SELECT * FROM products WHERE slug = :slug;  // Index on slug

// Avoid N+1 queries
// Bad: Loop and query each item
foreach ($products as $product) {
    $images = $db->getAll("SELECT * FROM images WHERE product_id = ?", [$product['id']]);
}

// Good: Get all at once
$images = $db->getAll("SELECT * FROM images WHERE product_id IN (?, ?, ...)");
```

### Caching

```php
// Simple file-based caching
if (file_exists('cache/products.json')) {
    $products = json_decode(file_get_contents('cache/products.json'), true);
} else {
    $products = $db->getAll("SELECT * FROM products");
    file_put_contents('cache/products.json', json_encode($products));
}
```

## Debugging

### Enable Debug Mode

```php
// config/app.php
'debug' => true
```

### Log Errors

```php
error_log('Debug message: ' . print_r($data, true));
// Check: storage/logs/php-errors.log
```

### Check Headers

```php
// See what's being sent
header_remove();  // Clear headers
header('Content-Type: application/json');
echo json_encode($debugData);
```

---

## Conclusion

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Reusable components
- ✅ Security by default
- ✅ Easy to test
- ✅ Easy to maintain
- ✅ Easy to extend

Follow these patterns and your codebase will remain clean, secure, and maintainable!
