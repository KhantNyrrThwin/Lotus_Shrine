<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents('php://input'), true);

// Include Composer's autoloader
require_once __DIR__ . '/vendor/autoload.php';

use Libs\Database\MySQL;
use Libs\Database\UsersTable;

if (empty($data['email']) || empty($data['otp'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'အီးမေးလ်နှင့် OTP ကုဒ် လိုအပ်ပါသည်'
    ]);
    exit;
}

$email = $data['email'];
$otp = $data['otp'];

try {
    $mysql = new MySQL();
    $table = new UsersTable($mysql);
    
    // Get user by email
    $user = $table->findByEmail($email);
    
    if (!$user) {
        echo json_encode([
            'success' => false,
            'message' => 'အသုံးပြုသူအကောင့် မရှိပါ'
        ]);
        exit;
    }
    
    // Check if OTP matches and is not expired
    $currentTime = date('Y-m-d H:i:s');
    
    if ($user['reset_token'] === $otp && $user['reset_token_expiry'] > $currentTime) {
        // Generate a simple token for password change authorization
        $authToken = bin2hex(random_bytes(16));
        
        // Store token in database (optional)
        $table->updateResetToken($email, $authToken, date('Y-m-d H:i:s', time() + 300));
        
        echo json_encode([
            'success' => true,
            'message' => 'OTP ကုဒ် အတည်ပြုပြီးပါပြီ',
            'token' => $authToken
        ]);
    } else {
        $message = 'OTP ကုဒ် မှားယွင်းနေပါသည်';
        
        // Provide specific error if expired
        if ($user->reset_token === $otp && $user->reset_token_expiry <= $currentTime) {
            $message = 'OTP ကုဒ် သက်တမ်းကုန်သွားပါပြီ';
        }
        
        echo json_encode([
            'success' => false,
            'message' => $message
        ]);
    }
} catch (Exception $e) {
    error_log("OTP Verification Error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'တခြားအမှားတစ်ခုခု ဖြစ်နေပါသည်'
    ]);
}