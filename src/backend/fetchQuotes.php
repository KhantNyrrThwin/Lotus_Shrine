<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

require_once 'MySQL.php'; // Include MySQL class

use Libs\Database\MySQL;

try {
    $mysql = new MySQL();
    $db = $mysql->connect();

    // ✅ Set charset properly here
    $db->exec("SET NAMES utf8mb4");

    // Fetch random quote
    $stmt = $db->prepare("SELECT quote_name, quote_author FROM quotes ORDER BY RAND() LIMIT 1");
    $stmt->execute();
    $quote = $stmt->fetch();

    if ($quote) {
        http_response_code(200);

        // ✅ Use JSON_UNESCAPED_UNICODE
        echo json_encode($quote, JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(404);
        echo json_encode([
            "quote" => "No quote found",
            "author" => "Unknown"
        ], JSON_UNESCAPED_UNICODE);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Database error",
        "message" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
