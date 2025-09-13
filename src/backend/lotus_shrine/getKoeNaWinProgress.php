<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');

require __DIR__ . '/vendor/autoload.php';

use Libs\Database\MySQL;
use Libs\Database\KoeNaWinTable;

try {
    $input = json_decode(file_get_contents('php://input'), true) ?: [];
    $email = $input['email'] ?? null;

    if (!$email) {
        echo json_encode(['success' => false, 'message' => 'Missing email']);
        exit;
    }

    $table = new KoeNaWinTable(new MySQL());
    $data = $table->getProgressByEmail($email);

    if (!$data) {
        echo json_encode(['success' => true, 'data' => ['start_date' => null, 'completed_dates' => []]]);
        exit;
    }

    echo json_encode(['success' => true, 'data' => $data]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error']);
}
