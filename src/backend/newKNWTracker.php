<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/vendor/autoload.php';

use Libs\Database\MySQL;
use Libs\Database\KoNaWinTable;

$userId = null;
$startDate = date('Y-m-d'); // Default to current date

$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['userId'])) {
    $userId = $data['userId'];
}

if (!$userId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'User ID is required.']);
    exit;
}

try {
    $mysql = new MySQL();
    $koNaWinTable = new KoNaWinTable($mysql);

    $trackerId = $koNaWinTable->startNewVow($userId, $startDate);

    if ($trackerId) {
        echo json_encode([
            'success' => true,
            'message' => 'Ko Na Win vow started successfully.',
            'trackerId' => $trackerId,
            'startDate' => $startDate
        ]);
    } else {
        // This might mean a vow already exists or another database error
        echo json_encode(['success' => false, 'message' => 'Failed to start Ko Na Win vow. User might already have an active vow.']);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}
?>