<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Optional: Reject if not JSON
if (stripos($_SERVER["CONTENT_TYPE"], "application/json") === false) {
    http_response_code(415);
    echo json_encode([
        'success' => false,
        'message' => 'Unsupported Media Type'
    ]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

// Include Composer's autoloader
require_once __DIR__ . '/vendor/autoload.php';

use Libs\Database\MySQL;
use Libs\Database\UsersTable;

if (empty($data['email']) || empty($data['newPassword'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'အချက်အလက်များ မပြည့်စုံပါ'
    ]);
    exit;
}

$email = $data['email'];
$newPassword = $data['newPassword'];

try {
    $mysql = new MySQL();
    $table = new UsersTable($mysql);
    
    // Hash the new password
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    // Use a method to update password inside UsersTable class
    $success = $table->updatePasswordByEmail($email, $hashedPassword);

    if ($success) {
        echo json_encode([
            'success' => true,
            'message' => 'စကားဝှက်အောင်မြင်စွာ ပြောင်းလဲပြီးပါပြီ'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'စကားဝှက်ပြောင်းရာတွင် အမှားအယွင်းရှိပါသည်'
        ]);
    }
} catch (Exception $e) {
    error_log("Password Update Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'တခြားအမှားတစ်ခုခု ဖြစ်နေပါသည်'
    ]);
}
