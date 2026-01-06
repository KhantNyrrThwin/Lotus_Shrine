<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../Libs/Database/MySQL.php';

use Libs\Database\MySQL;

try {
    $db = new MySQL();
    $pdo = $db->connect();
    
    // Create temp_users table
    $sql = "
    CREATE TABLE IF NOT EXISTS temp_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL UNIQUE,
        dob DATE NOT NULL,
        user_password VARCHAR(255) NOT NULL,
        otp VARCHAR(6) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    $pdo->exec($sql);
    
    echo "temp_users table created successfully\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>