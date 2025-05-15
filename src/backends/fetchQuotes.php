<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'MySQL.php'; // Include MySQL class

// Create database connection
try {
    $mysql = new Libs\Database\MySQL();
    $db = $mysql->connect();
    
    // Fetch random quote
    $stmt = $db->prepare("SELECT quote_name, quote_author FROM quotes ORDER BY RAND() LIMIT 1");
    $stmt->execute();
    $quote = $stmt->fetch();
    
    if ($quote) {
        http_response_code(200);
        echo json_encode($quote);
    } else {
        http_response_code(404);
        echo json_encode(["quote" => "No quote found", "author" => "Unknown"]);
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Database error",
        "message" => $e->getMessage()
    ]);
}