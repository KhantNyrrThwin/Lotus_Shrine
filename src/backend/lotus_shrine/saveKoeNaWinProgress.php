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
    $startDate = $input['start_date'] ?? null;
    $completedDates = $input['completed_dates'] ?? [];

    if (!$email || !$startDate || !is_array($completedDates)) {
        echo json_encode(['success' => false, 'message' => 'Invalid payload']);
        exit;
    }

    $table = new KoeNaWinTable(new MySQL());
    $ok = $table->upsertProgress($email, $startDate, $completedDates);

    echo json_encode(['success' => $ok]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error']);
}
