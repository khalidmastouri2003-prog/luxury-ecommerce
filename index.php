<?php
/**
 * Front Controller
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Load configuration
require_once __DIR__ . '/config/init.php';

// Create router
$router = new \Core\Router();

// ============================================
// PUBLIC ROUTES
// ============================================

// Home
$router->add('/', 'HomeController', 'index');
$router->add('/home', 'HomeController', 'index');

// Products
$router->add('/products', 'ProductController', 'index');
$router->add('/product/{slug}', 'ProductController', 'show');

// Cart
$router->add('/cart', 'CartController', 'index');
$router->add('/cart/add', 'CartController', 'add');
$router->add('/cart/remove', 'CartController', 'remove');
$router->add('/cart/update', 'CartController', 'update', 'POST');
$router->add('/cart/clear', 'CartController', 'clear');

// Wishlist
$router->add('/wishlist', 'WishlistController', 'index');
$router->add('/wishlist/add', 'WishlistController', 'add');
$router->add('/wishlist/remove', 'WishlistController', 'remove');

// Checkout
$router->add('/checkout', 'CheckoutController', 'index');
$router->add('/checkout/submit', 'CheckoutController', 'submit', 'POST');

// Contact
$router->add('/contact', 'ContactController', 'index');
$router->add('/contact/send', 'ContactController', 'send', 'POST');

// ============================================
// ADMIN ROUTES
// ============================================

// Admin Auth
$router->add('/admin', 'AdminController', 'index');
$router->add('/admin/login', 'AdminController', 'login');
$router->add('/admin/login', 'AdminController', 'doLogin', 'POST');
$router->add('/admin/logout', 'AdminController', 'logout');
$router->add('/admin/dashboard', 'AdminController', 'dashboard');

// Admin Products
$router->add('/admin/products', 'AdminProductController', 'index');
$router->add('/admin/products/create', 'AdminProductController', 'create');
$router->add('/admin/products/create', 'AdminProductController', 'store', 'POST');
$router->add('/admin/products/edit/{id}', 'AdminProductController', 'edit');
$router->add('/admin/products/edit/{id}', 'AdminProductController', 'update', 'POST');
$router->add('/admin/products/delete/{id}', 'AdminProductController', 'delete', 'POST');

// Admin Orders
$router->add('/admin/orders', 'AdminOrderController', 'index');
$router->add('/admin/orders/view/{id}', 'AdminOrderController', 'view');
$router->add('/admin/orders/update-status', 'AdminOrderController', 'updateStatus', 'POST');

// Admin Customers
$router->add('/admin/customers', 'AdminCustomerController', 'index');
$router->add('/admin/customers/view/{id}', 'AdminCustomerController', 'view');
$router->add('/admin/customers/status/{id}', 'AdminCustomerController', 'updateStatus', 'POST');

// ============================================
// DISPATCH
// ============================================

$uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

try {
    $router->dispatch($uri, $method);
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage();
}