<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/vendor/autoload.php';

use Libs\Database\MySQL;
use Libs\Database\KoNaWinTable;

$userId = null;

// Support both JSON body and query param
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['userId'])) {
    $userId = $data['userId'];
} elseif (isset($_GET['userId'])) {
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

    $completions = $koNaWinTable->getUserCompletions($userId);

    echo json_encode([
        'success' => true,
        'completions' => $completions
    ]);
} catch (Exception $e) {
    http_response_code(500);
    error_log("Error in getKNWCompletions.php: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}
?>


