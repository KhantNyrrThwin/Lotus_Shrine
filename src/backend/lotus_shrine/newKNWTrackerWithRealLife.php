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
$currentDayCount = null;
$currentStage = null;
$dayInStage = null;

$data = json_decode(file_get_contents('php://input'), true);

// Validate required parameters
if (isset($data['userId'])) {
    $userId = $data['userId'];
}

if (isset($data['startDate'])) {
    $startDate = $data['startDate'];
}

if (isset($data['currentDayCount'])) {
    $currentDayCount = (int)$data['currentDayCount'];
}

if (isset($data['currentStage'])) {
    $currentStage = (int)$data['currentStage'];
}

if (isset($data['dayInStage'])) {
    $dayInStage = (int)$data['dayInStage'];
}

// Validate required parameters
if (!$userId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'User ID is required.']);
    exit;
}

if ($currentDayCount === null || $currentStage === null || $dayInStage === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'currentDayCount, currentStage, and dayInStage are required.']);
    exit;
}

// Validate stage and day ranges
if ($currentStage < 1 || $currentStage > 9) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'currentStage must be between 1 and 9.']);
    exit;
}

if ($dayInStage < 1 || $dayInStage > 9) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'dayInStage must be between 1 and 9.']);
    exit;
}

// Validate that currentDayCount matches the calculation
$expectedCurrentDayCount = ($currentStage - 1) * 9 + $dayInStage - 1;
if ($currentDayCount !== $expectedCurrentDayCount) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => "currentDayCount ($currentDayCount) does not match expected value ($expectedCurrentDayCount) for stage $currentStage, day $dayInStage."
    ]);
    exit;
}

try {
    // Debug logging
    error_log("newKNWTrackerWithRealLife.php - Received data: " . json_encode($data));
    error_log("newKNWTrackerWithRealLife.php - Processed: userId=$userId, startDate=$startDate, currentDayCount=$currentDayCount, currentStage=$currentStage, dayInStage=$dayInStage");

    $mysql = new MySQL();
    $koNaWinTable = new KoNaWinTable($mysql);

    // Check if user already has an active vow
    $existingTracker = $koNaWinTable->findTrackerByUserId($userId);
    if ($existingTracker) {
        error_log("newKNWTrackerWithRealLife.php - User $userId already has an active vow");
        http_response_code(409); // Conflict
        echo json_encode([
            'success' => false, 
            'message' => 'User already has an active Ko Na Win vow. Please complete or reset the existing vow first.'
        ]);
        exit;
    }

    // Create new vow with real-life progress
    $trackerId = $koNaWinTable->startNewVowWithRealLifeProgress($userId, $startDate, $currentDayCount, $currentStage);
    error_log("newKNWTrackerWithRealLife.php - Created tracker with ID: $trackerId, currentDayCount: $currentDayCount, currentStage: $currentStage");

    if ($trackerId) {
        // Log only the previous day as completed (the day before current day)
        $logResult = $koNaWinTable->logPreviousDayForRealLifeProgress($trackerId, $currentDayCount, $startDate);
        error_log("newKNWTrackerWithRealLife.php - Logged previous day result: " . ($logResult ? 'success' : 'failed'));
        
        echo json_encode([
            'success' => true,
            'message' => 'Ko Na Win vow started successfully with real-life progress.',
            'trackerId' => $trackerId,
            'startDate' => $startDate,
            'currentDayCount' => $currentDayCount,
            'currentStage' => $currentStage,
            'dayInStage' => $dayInStage+1
        ]);
    } else {
        error_log("newKNWTrackerWithRealLife.php - Failed to create tracker for user $userId");
        echo json_encode([
            'success' => false, 
            'message' => 'Failed to start Ko Na Win vow with real-life progress.'
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    error_log("Error in newKNWTrackerWithRealLife.php: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}
