<?php
// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0); // Preflight response

// Load dependencies
require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Libs\Database\MySQL;
use Libs\Database\UsersTable;
use Libs\Database\RateLimitTable;

// Parse input
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? null;

// Validate input
if (!$email) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'အီးမေးလ်လိုအပ်ပါသည်။'
    ]);
    exit;
}

$clientIp = $_SERVER['REMOTE_ADDR'];

try {
    $db = new MySQL();
    $usersTable = new UsersTable($db);
    $rateLimitTable = new RateLimitTable($db);

    // Check rate limit
    if ($rateLimitTable->checkRateLimit($email, $clientIp)) {
        http_response_code(429); // Too Many Requests
        echo json_encode([
            'success' => false,
            'message' => 'တစ်နာရီအတွင်း OTP ကုဒ် အကြိမ်ရေ ကန့်သတ်ချက်ကျော်လွန်သွားပါသည်။ နာရီအနည်းငယ်အကြာတွင် ပြန်လည်ကြိုးစားပါ။'
        ]);
        exit;
    }

    // Find user
    $user = $usersTable->findByEmail($email);
    if (!$user) {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'တရားမဝင်သော အီးမေးလ်'
        ]);
        exit;
    }

    // Generate 6-digit OTP
    $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    $expiry = date('Y-m-d H:i:s', time() + 300); // Valid for 5 minutes

    // Save OTP
    $usersTable->updateResetToken($email, $otp, $expiry);
    $rateLimitTable->recordAttempt($email, $clientIp);

    // Send email
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->Username = 'lotusshrinemm@gmail.com';
    $mail->Password = 'jguo fizj tpje udhp';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

    $mail->setFrom('lotusshrinemm@gmail.com', 'Lotus Shrine');
    $mail->addAddress($email);
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = 'စကားဝှက်ပြန်လည်သတ်မှတ်ရန် OTP ကုဒ်';

    $mail->Body = <<<HTML
        <h3>OTP ကုဒ်အသစ်</h3>
        <p>သင်၏ စကားဝှက်ပြန်လည်သတ်မှတ်ရန် ကုဒ်: <strong>{$otp}</strong></p>
        <p>ကုဒ်သည် 5 မိနစ်အတွင်းသာအသုံးပြုနိုင်ပါသည်။</p>
        <p style='color: #888; font-size: 12px; margin-top: 20px;'>
            ဤအီးမေးလ်ကို သင်မတောင်းဆိုပါက လျစ်လျူရှုနိုင်သည်။ 
            မည်သူ့ကိုမျှ ဤကုဒ်ကို မမျှဝေပါနှင့်။
        </p>
    HTML;

    $mail->AltBody = "သင်၏ စကားဝှက်ပြန်လည်သတ်မှတ်ရန် ကုဒ်: {$otp}\n"
                   . "ကုဒ်သည် 5 မိနစ်အတွင်းသာအသုံးပြုနိုင်ပါသည်။\n\n"
                   . "ဤအီးမေးလ်ကို သင်မတောင်းဆိုပါက လျစ်လျူရှုနိုင်သည်။";

    $mail->send();

    echo json_encode([
        'success' => true,
        'message' => 'OTP ကုဒ်အသစ်ကို သင့်အီးမေးလ်သို့ ပေးပို့ပြီးပါပြီ။'
    ]);

} catch (Exception $e) {
    error_log("Mailer Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'အီးမေးလ်ပို့ရာတွင် ပြဿနာတစ်ခု ဖြစ်နေပါသည်။'
    ]);
} catch (\Throwable $e) {
    error_log("Server Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server မှာ တစ်စုံတစ်ရာ ပြဿနာ ဖြစ်နေပါသည်။'
    ]);
}
