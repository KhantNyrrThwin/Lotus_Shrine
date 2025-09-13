<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
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
        // Get daily logs for this tracker
        $dailyLogs = $koNaWinTable->getDailyLogs($tracker->tracker_id);
        
        // Calculate progress statistics
        $totalDays = 81;
        $completedDays = count($dailyLogs);
        $remainingDays = $totalDays - $completedDays;
        $progressPercentage = round(($completedDays / $totalDays) * 100, 2);
        
        // Calculate current stage progress
        $currentStageDays = (($tracker->current_stage - 1) * 9) + 1;
        $stageProgress = $tracker->current_day_count - $currentStageDays + 1;
        
        // Calculate day number within current stage (1-9)
        // Day 5 of each stage is the meat-free day
        $dayNumberInStage = (($tracker->current_day_count - 1) % 9)+1;
        
        echo json_encode([
            'success' => true,
            'tracker' => [
                'trackerId' => $tracker->tracker_id,
                'startDate' => $tracker->start_date,
                'currentDayCount' => $tracker->current_day_count,
                'currentStage' => $tracker->current_stage,
                'isCompleted' => $tracker->is_completed
            ],
            'progress' => [
                'completedDays' => $completedDays,
                'remainingDays' => $remainingDays,
                'progressPercentage' => $progressPercentage,
                'stageProgress' => $stageProgress,
                'stageDaysRemaining' => 9 - $stageProgress,
                'dayNumberInStage' => $dayNumberInStage
            ],
            'dailyLogs' => $dailyLogs
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'No active Koe Na Win vow found for this user.'
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    error_log("Error in getKoeNaWinProgress.php: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}