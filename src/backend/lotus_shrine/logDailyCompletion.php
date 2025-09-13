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
        // Recalculate tracker progress based on actual completed days
        $recalculateSuccess = $koNaWinTable->recalculateTrackerProgress($trackerId);
        
        // Debug logging
        error_log("recalculateTrackerProgress result: " . ($recalculateSuccess ? 'true' : 'false'));
        error_log("logDailyCompletion - trackerId: $trackerId, logResult: " . json_encode($result));
        
        if ($recalculateSuccess) {
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
                    'isCompleted' => $tracker->is_completed
                ]);
            } else {
                $message = $result['action'] === 'completed' 
                    ? 'Daily completion logged successfully.' 
                    : 'This day has already been completed.';
                
                echo json_encode([
                    'success' => true,
                    'message' => $message,
                    'action' => $result['action'],
                    'status' => $result['status']
                ]);
            }
        } else {
            error_log("Failed to recalculate tracker progress for trackerId: $trackerId");
            echo json_encode([
                'success' => false,
                'message' => 'Daily completion updated but failed to recalculate tracker progress. Please try refreshing the page.'
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
