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
    $table = new UsersTable(new MySQL());
    $user = $table->findByEmail($email);

     if ($user) {
        // Verify password in PHP instead of SQL
        if (password_verify($password, $user['user_password'])){
            // Password matches - login successful
            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'name' => $user['name'],
                'dob' => $user['dob']
            ]);
        } else {
            // Email exists but password is wrong
            echo json_encode([
                'success' => false,
                'message' => 'Invalid password'
            ]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error']);
}   
?>