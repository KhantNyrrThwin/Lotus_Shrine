<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/vendor/autoload.php';

use Libs\Database\MySQL;
use Libs\Database\KoNaWinTable;

$trackerId = null;

// Get tracker ID from request
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['trackerId'])) {
    $trackerId = $data['trackerId'];
} elseif (isset($_GET['trackerId'])) {
    $trackerId = $_GET['trackerId'];
}

if (!$trackerId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Tracker ID is required.']);
    exit;
}

try {
    $mysql = new MySQL();
    $koNaWinTable = new KoNaWinTable($mysql);

    // Delete the tracker and associated logs
    $result = $koNaWinTable->deleteTrackerById($trackerId);

    if ($result['success']) {
        echo json_encode([
            'success' => true,
            'message' => 'Ko Na Win vow and its logs deleted successfully.',
            'deleted_logs' => $result['deleted_logs'],
            'deleted_tracker' => $result['deleted_tracker']
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to delete Ko Na Win vow: ' . ($result['error'] ?? 'Unknown error')
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    error_log("Error in deleteKNWTracker.php: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}