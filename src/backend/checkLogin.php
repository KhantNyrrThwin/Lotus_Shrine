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
include 'Libs/Database/MySQL.php';
include 'Libs/Database/UsersTable.php';

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
    $user = $table->findByEmailAndPassword($email, $password);

     if ($user !== false) {
        // Return user's name along with success message
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'name' => $user  // User's name from database
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error']);
}   
?>