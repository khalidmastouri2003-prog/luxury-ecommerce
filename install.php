<?php
// install.php

class Installer {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    public function install() {
        try {
            // Create database if not exists
            $this->createDatabase();
            
            // Create tables
            $this->createTables();
            
            // Create admin user
            $this->createAdminUser();
            
            // Create default categories
            $this->createDefaultCategories();
            
            // Create default collections
            $this->createDefaultCollections();
            
            echo "Installation completed successfully!";
            return true;
        } catch (Exception $e) {
            echo "Installation failed: " . $e->getMessage();
            return false;
        }
    }
    
    private function createDatabase() {
        // Implementation
    }
    
    private function createTables() {
        $tables = [
            // All CREATE TABLE statements from above
        ];
        
        foreach ($tables as $table) {
            $this->conn->exec($table);
        }
    }
    
    private function createAdminUser() {
        $password = Security::hashPassword('Admin@2024');
        $sql = "INSERT INTO users (username, email, password, first_name, last_name, role, status) 
                VALUES ('admin', 'admin@jewelry.com', :password, 'Admin', 'User', 'admin', 'active')";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['password' => $password]);
    }
    
    private function createDefaultCategories() {
        $categories = [
            ['name_ar' => 'خواتم', 'name_fr' => 'Bagues', 'slug' => 'rings'],
            ['name_ar' => 'أساور', 'name_fr' => 'Bracelets', 'slug' => 'bracelets'],
            ['name_ar' => 'قلادات', 'name_fr' => 'Colliers', 'slug' => 'necklaces'],
            ['name_ar' => 'أقراط', 'name_fr' => 'Boucles d\'oreilles', 'slug' => 'earrings']
        ];
        
        foreach ($categories as $category) {
            $sql = "INSERT INTO categories (name_ar, name_fr, slug) VALUES (:name_ar, :name_fr, :slug)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute($category);
        }
    }
    
    private function createDefaultCollections() {
        $collections = [
            ['name_ar' => 'كلاسيكية', 'name_fr' => 'Classique', 'slug' => 'classic'],
            ['name_ar' => 'حديثة', 'name_fr' => 'Moderne', 'slug' => 'modern'],
            ['name_ar' => 'حصرية', 'name_fr' => 'Exclusive', 'slug' => 'exclusive']
        ];
        
        foreach ($collections as $collection) {
            $sql = "INSERT INTO collections (name_ar, name_fr, slug) VALUES (:name_ar, :name_fr, :slug)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute($collection);
        }
    }
}