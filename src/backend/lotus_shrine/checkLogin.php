<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents('php://input'), true);

require_once __DIR__ . '/vendor/autoload.php';
use Libs\Database\MySQL;
use Libs\Database\UsersTable;
use Libs\Database\LoginRateLimitTable;

if (empty($data['email']) || empty($data['password'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Email and password are required'
    ]);
    exit;
}

$email = $data['email'];
$password = $data['password'];
$success = false;

try {
    $db = new MySQL();
    $table = new UsersTable($db);
    $user = $table->findByEmail($email);

    // Instantiate login rate limiter
    $loginRateLimit = new LoginRateLimitTable($db->connect());

    // Check rate limit for this email (locks by email after threshold)
    $clientIp = $_SERVER['REMOTE_ADDR'] ?? '';
    $rateCheck = $loginRateLimit->checkLoginAttempt($email, null, 15);
    if (!$rateCheck['allowed']) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => $rateCheck['message']
        ]);
        exit;
    }

    if ($user) {
        // Verify password in PHP instead of SQL
        if (password_verify($password, $user['user_password'])){
            // Password matches - login successful
            // Clear any previous attempts for this email
            $loginRateLimit->clearAttempts($email);

            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'name' => $user['name'],
                'dob' => $user['dob'],
                'user_id' => $user['user_id']
            ]);
        } else {
            // Email exists but password is wrong - record failed attempt
            $loginRateLimit->recordFailedLogin($email, $clientIp);
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid password'
            ]);
        }
    } else {
        // If email not found we still return 404 but do not record login attempts to avoid account enumeration
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Invalid email']);
    }
} catch (Exception $e) {
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}   
?>