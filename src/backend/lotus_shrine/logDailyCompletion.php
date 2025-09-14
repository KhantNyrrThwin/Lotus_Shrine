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

$trackerId = null;

$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['trackerId'])) {
    $trackerId = $data['trackerId'];
}

if (!$trackerId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Tracker ID is required.']);
    exit;
}

try {
    $mysql = new MySQL();
    $koNaWinTable = new KoNaWinTable($mysql);

    // Log the daily completion with automatically calculated day number
    $result = $koNaWinTable->logDailyCompletion($trackerId, null);
    
    if ($result['success']) {
        // Only recalculate if this was a new completion (not already completed)
        if ($result['action'] === 'completed') {
            $recalculateSuccess = $koNaWinTable->recalculateTrackerProgress($trackerId);
            error_log("recalculateTrackerProgress result: " . ($recalculateSuccess ? 'true' : 'false'));
        }
        
        // Get updated tracker info by trackerId
        $tracker = $koNaWinTable->findTrackerById($trackerId);
        
        if ($tracker) {
            $message = $result['action'] === 'completed' 
                ? 'Daily completion logged successfully.' 
                : 'This day has already been completed.';
            
            echo json_encode([
                'success' => true,
                'message' => $message,
                'action' => $result['action'],
                'status' => $result['status'],
                'newDayCount' => $tracker->current_day_count,
                'newStage' => $tracker->current_stage,
                'isCompleted' => $tracker->is_completed,
                'calculatedDayNumber' => $result['calculatedDayNumber'] ?? null
            ]);
        } else {
            $message = $result['action'] === 'completed' 
                ? 'Daily completion logged successfully.' 
                : 'This day has already been completed.';
            
            echo json_encode([
                'success' => true,
                'message' => $message,
                'action' => $result['action'],
                'status' => $result['status'],
                'calculatedDayNumber' => $result['calculatedDayNumber'] ?? null
            ]);
        }
    } else {
        echo json_encode([
            'success' => false, 
            'message' => 'Failed to log daily completion: ' . ($result['error'] ?? 'Unknown error')
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    error_log("Error in logDailyCompletion.php: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}
