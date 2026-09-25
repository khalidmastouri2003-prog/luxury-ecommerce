<?php
// test_router.php
require_once 'config/routes.php';

echo "Testing Router...<br><br>";

$uris = [
    '/luxury-ecommerce/',
    '/luxury-ecommerce',
    '/luxury-ecommerce/products',
    '/luxury-ecommerce/admin'
];

foreach ($uris as $uri) {
    echo "Testing: $uri<br>";
    $router->dispatch($uri, 'GET');
    echo "<br>---<br>";
}