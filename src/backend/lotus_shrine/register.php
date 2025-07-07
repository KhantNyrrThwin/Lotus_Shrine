<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
require_once __DIR__ . '/vendor/autoload.php';

use Libs\Database\MySQL;
use Libs\Database\UsersTable;

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate input
    if (empty($data['name']) || empty($data['email']) || empty($data['password']) || empty($data['age'])) {
        throw new Exception('အချက်အလက်များ လိုအပ်နေပါသည်');
    }

    // Sanitize inputs
    $name = filter_var($data['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $age = filter_var($data['age'], FILTER_VALIDATE_INT);
    $password = $data['password'];

    // Validate age
    if ($age <+ 10 || $age > 120) {
        throw new Exception('မှားယွင်းသော အသက်အရွယ်');
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $table = new UsersTable(new MySQL());

    // Check if email exists
    if ($table->findByEmail($email)) {
        throw new Exception('ဤအီးမေးလ်ဖြင့် အကောင့်ရှိပြီးသားဖြစ်ပါသည်');
    }

    // Insert user
    $userId = $table->insert([
        'name' => $name,
        'email' => $email,
        'age' => $age,
        'password' => $hashedPassword
    ]);

    if ($userId) {
        echo json_encode([
            'success' => true,
            'message' => 'အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါသည်'
        ]);
    } else {
        throw new Exception('အကောင့်ဖွင့်ရာတွင် အမှားအယွင်းရှိပါသည်');
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>