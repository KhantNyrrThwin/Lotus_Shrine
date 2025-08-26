<?php
// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0); // Preflight response

// Load dependencies
require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Parse JSON input
$data = json_decode(file_get_contents('php://input'), true);
$userEmail = $data['email'] ?? null;
$userMessage = $data['message'] ?? null;

// Validate input
if (!$userEmail || !filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'ကျေးဇူးပြု၍ မှန်ကန်သော အီးမေးလ်လိပ်စာ ထည့်သွင်းပါ။'
    ]);
    exit;
}

if (!$userMessage || strlen(trim($userMessage)) < 10) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'မက်ဆေ့ချ်သည် အနည်းဆုံး စာလုံး ၁၀ လုံး ပါဝင်ရပါမည်။'
    ]);
    exit;
}

try {
    // Create and configure PHPMailer
    $mail = new PHPMailer(true);
    
    // SMTP Configuration (same as your OTP script)
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->Username = 'lotusshrinemm@gmail.com'; // Your server email
    $mail->Password = 'jguo fizj tpje udhp';     // Your app password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    
    // Email content - TO LOTUS SHRINE
    $mail->setFrom('lotusshrinemm@gmail.com', 'Lotus Shrine Website');
    $mail->addAddress('lotusshrinemm@gmail.com'); // Messages go to Lotus Shrine
    
    // Include user's email as reply-to
    $mail->addReplyTo($userEmail);
    
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = 'ဝက်ဘ်ဆိုဒ်မှ ဆက်သွယ်လာသူ၏ မက်ဆေ့ချ် - ' . date('d/m/Y H:i');
    
    // HTML Body with Burmese formatting
    $mail->Body = <<<HTML
    <div style="font-family: 'Pyidaungsu', 'Noto Sans Myanmar', sans-serif; direction: ltr;">
        <h2 style="color: #4f3016;">Lotus Shrine ဝက်ဘ်ဆိုဒ်မှ ဆက်သွယ်လာသူ</h2>
        
        <div style="margin-top: 20px;">
            <p><strong>အီးမေးလ်:</strong> {$userEmail}</p>
            <p><strong>ပို့သည့်အချိန်:</strong> {$mail->Subject}</p>
        </div>
        
        <div style="margin: 25px 0; padding: 15px; border-left: 3px solid #4f3016; background: #f8f8f8;">
            <h3 style="margin-top: 0; color: #4f3016;">မက်ဆေ့ချ်အကြောင်းအရာ</h3>
            <p>{$userMessage}</p>
        </div>
        
        <div style="margin-top: 30px; font-size: 12px; color: #888;">
            <p>ဤအီးမေးလ်ကို ဝက်ဘ်ဆိုဒ်ဆက်သွယ်ရန်ပုံစံမှ အလိုအလျောက်ပို့ပေးခြင်းဖြစ်ပါသည်။</p>
        </div>
    </div>
    HTML;
    
    // Plain text version for email clients
    $mail->AltBody = "Lotus Shrine ဝက်ဘ်ဆိုဒ်မှ ဆက်သွယ်လာသူ\n\n"
                   . "အီးမေးလ်: {$userEmail}\n"
                   . "ပို့သည့်အချိန်: " . date('d/m/Y H:i') . "\n\n"
                   . "မက်ဆေ့ချ်အကြောင်းအရာ:\n{$userMessage}\n\n"
                   . "--\nဤအီးမေးလ်ကို ဝက်ဘ်ဆိုဒ်ဆက်သွယ်ရန်ပုံစံမှ အလိုအလျောက်ပို့ပေးခြင်းဖြစ်ပါသည်။";

    // Send the email
    $mail->send();

    // Success response
    echo json_encode([
        'success' => true,
        'message' => 'ကျေးဇူးတင်ပါသည်။ သင့်မက်ဆေ့ချ်ကို လက်ခံရရှိပြီး မကြာမီပြန်လည်ဆက်သွယ်ပေးပါမည်။'
    ]);

} catch (Exception $e) {
    error_log("Mailer Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'မက်ဆေ့ချ်ပို့ရာတွင် ပြဿနာတစ်ခု ဖြစ်နေပါသည်။'
    ]);
} catch (\Throwable $e) {
    error_log("Server Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server မှာ တစ်စုံတစ်ရာ ပြဿနာ ဖြစ်နေပါသည်။'
    ]);
}