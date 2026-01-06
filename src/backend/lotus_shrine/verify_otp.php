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
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate input
    if (empty($data['email']) || empty($data['otp'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'အီးမေးလ်နှင့် OTP ကုဒ် လိုအပ်ပါသည်'
        ]);
        exit;
    }

    $email = strtolower(filter_var($data['email'], FILTER_SANITIZE_EMAIL));
    $otp = $data['otp'];

    // Validate OTP format
    if (!is_numeric($otp) || strlen($otp) != 6) {
        echo json_encode([
            'success' => false,
            'message' => 'မှားယွင်းသော OTP ကုဒ်'
        ]);
        exit;
    }

    $table = new UsersTable(new MySQL());

    // Fetch pending signup
    $tempUser = $table->findTempUserByEmail($email);
    if (!$tempUser) {
        echo json_encode([
            'success' => false,
            'message' => 'သင်၏ အကောင့်အတည်ပြုခြင်းကို မတွေ့ပါ'
        ]);
        exit;
    }

    // Compare OTP explicitly (string-safe)
    $storedOtp = trim((string)($tempUser['otp'] ?? ''));
    $providedOtp = trim((string)$otp);
    if ($storedOtp !== $providedOtp) {
        echo json_encode([
            'success' => false,
            'message' => 'OTP ကုဒ်မှားယွင်းနေပါသည်'
        ]);
        exit;
    }

    // Check if OTP is expired (3 minutes) using exact seconds
    $createdAt = new DateTime($tempUser['created_at']);
    $now = new DateTime();
    $secondsDiff = $now->getTimestamp() - $createdAt->getTimestamp();
    
    if ($secondsDiff > 180) {
        // Delete expired temp user
        $table->deleteTempUser($tempUser['id']);
        echo json_encode([
            'success' => false,
            'message' => 'OTP ကုဒ်၏ သက်တမ်းကုန်ဆုံးသွားပါပြီ'
        ]);
        exit;
    }

    // Move user from temporary table to users table
    $userId = $table->insert([
        'name' => $tempUser['name'],
        'email' => $tempUser['email'],
        'dob' => $tempUser['dob'],
        'password' => $tempUser['password']
    ]);

    if ($userId) {
        // Delete from temporary table
        $table->deleteTempUser($tempUser['id']);
        
        // Send welcome email
        $mail = new PHPMailer(true);
        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->Port = 587;
            $mail->SMTPAuth = true;
            $mail->Username = 'lotusshrinemm@gmail.com';
            $mail->Password = 'jguo fizj tpje udhp';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

            // Recipients
            $mail->setFrom('lotusshrinemm@gmail.com', 'Lotus Shrine');
            $mail->addAddress($email, $tempUser['name']);

            // Content
            $mail->isHTML(true);
            $mail->CharSet = 'UTF-8';
            $mail->Subject = 'Lotus Shrine - အကောင့်ဖွင့်ခြင်းအောင်မြင်ပါသည်';

            $mail->Body = <<<HTML
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4f3016; text-align: center;">Lotus Shrine မှ ကြိုဆိုပါသည်</h2>
                    <p>သင်၏ Lotus Shrine အကောင့်ကို အောင်မြင်စွာ ဖွင့်လှစ်ပြီးပါပြီ။</p>
                    <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>အကောင့်အချက်အလက်များ:</strong></p>
                        <p>အမည်: {$tempUser['name']}</p>
                        <p>အီးမေးလ်: {$tempUser['email']}</p>
                        <p>မွေးနေ့: {$tempUser['dob']}</p>
                    </div>
                    <p>အကောင့်ဝင်ရန်: <a href="http://localhost:5173/login">http://localhost:5173/login</a></p>
                    <p style="color: #888; font-size: 12px; margin-top: 20px;">
                        ဤအီးမေးလ်သည် Lotus Shrine မှ အလိုအလျောက်ပေးပို့ခြင်းဖြစ်ပါသည်။ 
                        ဤအီးမေးလ်ကို သင်မတောင်းဆိုပါက လျစ်လျူရှုနိုင်ပါသည်။
                    </p>
                </div>
            HTML;

            $mail->AltBody = "Lotus Shrine မှ ကြိုဆိုပါသည်\n\n"
                           . "သင်၏ Lotus Shrine အကောင့်ကို အောင်မြင်စွာ ဖွင့်လှစ်ပြီးပါပြီ။\n\n"
                           . "အကောင့်အချက်အလက်များ:\n"
                           . "အမည်: {$tempUser['name']}\n"
                           . "အီးမေးလ်: {$tempUser['email']}\n"
                           . "မွေးနေ့: {$tempUser['dob']}\n\n"
                           . "အကောင့်ဝင်ရန်: http://localhost:5173/login\n\n"
                           . "ဤအီးမေးလ်သည် Lotus Shrine မှ အလိုအလျောက်ပေးပို့ခြင်းဖြစ်ပါသည်။";

            $mail->send();
        } catch (Exception $e) {
            // Log the error but don't fail the verification
            error_log("Welcome email sending failed: " . $e->getMessage());
        }

        echo json_encode([
            'success' => true,
            'message' => 'အကောင့်ကို အတည်ပြုပြီးပါပြီ'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'အကောင့်ဖွင့်ရာတွင် အမှားအယွင်းရှိပါသည်'
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}
?>