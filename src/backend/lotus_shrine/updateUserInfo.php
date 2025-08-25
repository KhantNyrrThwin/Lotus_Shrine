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
    if (empty($data['email']) || empty($data['name']) || empty($data['dob'])) {
        throw new Exception('အချက်အလက်များ လိုအပ်နေပါသည်');
    }

    // Sanitize inputs
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $name = filter_var($data['name'], FILTER_SANITIZE_STRING);
    $dob = filter_var($data['dob'], FILTER_SANITIZE_STRING);

    // Validate DOB format
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $dob)) {
        throw new Exception('မှားယွင်းသော မွေးသက္ကရာဇ် ပုံစံ');
    }

    // Validate DOB - calculate age from DOB
    $dobDate = new DateTime($dob);
    $today = new DateTime();
    $age = $today->diff($dobDate)->y;
    
    if ($age < 10 || $age > 120) {
        throw new Exception('အသုံးပြုသူသည် ၁၀နှစ်နှင့် အထက်ရှိရမည်');
    }

    $table = new UsersTable(new MySQL());

    // Update user info
    $success = $table->updateUserInfo($email, $name, $dob);

    if ($success) {
        echo json_encode([
            'success' => true,
            'message' => 'အချက်အလက် များအောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ'
        ]);
    } else {
        throw new Exception('အချက်အလက် ပြင်ဆင်ရာတွင် အမှားအယွင်းရှိပါသည်');
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>