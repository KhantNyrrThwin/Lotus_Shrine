<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/vendor/autoload.php';

use Libs\Database\MySQL;
use Libs\Database\KoNaWinTable;

$data = json_decode(file_get_contents('php://input'), true);
$trackerId = $data['trackerId'] ?? null;

if (!$trackerId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Tracker ID is required.']);
    exit;
}

try {
    $mysql = new MySQL();
    $koNaWinTable = new KoNaWinTable($mysql);

    $result = $koNaWinTable->saveCompletion($trackerId);

    if ($result['success']) {
        echo json_encode([
            'success' => true,
            'message' => 'Completion record saved successfully!',
            'completionId' => $result['completion_id'],
            'startDate' => $data['startDate'] ?? null,  // Pass from frontend if needed
            'endDate' => $result['end_date'],
            'totalDays' => 81
        ]);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => $result['error']]);
    }

} catch (Exception $e) {
    http_response_code(500);
    error_log("Error in saveKNWCompletion.php: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}
?>