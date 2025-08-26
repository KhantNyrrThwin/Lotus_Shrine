<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Add Authorization if you use tokens
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/vendor/autoload.php';

use Libs\Database\MySQL;
use Libs\Database\KoNaWinTable; // Ensure this namespace matches your KoNaWinTable.php

// This is where you'd normally get the user ID from a session or JWT token.
// For demonstration, let's assume it's passed via query parameter or POST body for now.
// In a real application, you would authenticate the user and get their ID securely.
$userId = null;

// Attempt to get user_id from POST (if sending via fetch body)
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['userId'])) {
    $userId = $data['userId'];
} elseif (isset($_GET['userId'])) { // Attempt to get user_id from GET (if sending via URL params)
    $userId = $_GET['userId'];
}

if (!$userId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'User ID is required.']);
    exit;
}

try {
    $mysql = new MySQL();
    $koNaWinTable = new KoNaWinTable($mysql);

    $tracker = $koNaWinTable->findTrackerByUserId($userId);

    if ($tracker) {
        // User has an existing Ko Na Win tracker
        echo json_encode([
            'success' => true,
            'hasKoNaWinVow' => true,
            'message' => 'User is already registered for Ko Na Win.',
            'trackerId' => $tracker->tracker_id,
            'startDate' => $tracker->start_date,
            'currentDayCount' => $tracker->current_day_count,
            'isCompleted' => $tracker->is_completed
        ]);
    } else {
        // User does not have an existing Ko Na Win tracker
        echo json_encode([
            'success' => true,
            'hasKoNaWinVow' => false,
            'message' => 'User is not yet registered for Ko Na Win.'
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}
?>