<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::get('/health', static fn () => response()->json([
    'success' => true,
    'message' => 'Aurelia Maison API is healthy.',
    'data' => ['service' => 'backend', 'version' => 'v1'],
]));

// Public catalog, customer commerce, and admin route groups will be added in later phases.
