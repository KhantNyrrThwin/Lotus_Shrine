<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents('php://input'), true) ?? [];

require_once __DIR__ . '/vendor/autoload.php';
use Libs\Database\MySQL;
use Libs\Database\LoginRateLimitTable;

if (empty($data['action']) || empty($data['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'action and email are required']);
    exit;
}

$action = $data['action'];
$email = $data['email'];
$ip = $_SERVER['REMOTE_ADDR'] ?? ($data['ip'] ?? null);
$lockDuration = isset($data['lockDuration']) ? (int)$data['lockDuration'] : 15;

try {
    $db = new MySQL();
    $limiter = new LoginRateLimitTable($db->connect());

    if ($action === 'check') {
        $result = $limiter->checkLoginAttempt($email, null, $lockDuration);
        if (!$result['allowed']) {
            http_response_code(429);
        }
        echo json_encode(array_merge(['success' => $result['allowed']], $result));
        exit;
    }

    if ($action === 'record') {
        $limiter->recordFailedLogin($email, $ip, $lockDuration);
        echo json_encode(['success' => true, 'message' => 'recorded']);
        exit;
    }

    if ($action === 'clear') {
        $limiter->clearAttempts($email);
        echo json_encode(['success' => true, 'message' => 'cleared']);
        exit;
    }

    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'unknown action']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error']);
}

?>