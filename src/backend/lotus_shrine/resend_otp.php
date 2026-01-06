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
    if (empty($data['email'])) {
        throw new Exception('အီးမေးလ်လိုအပ်ပါသည်');
    }

    $email = strtolower(filter_var($data['email'], FILTER_SANITIZE_EMAIL));

    $table = new UsersTable(new MySQL());

    // Check if user exists in temporary table
    $tempUser = $table->findTempUserByEmail($email);
    
    if (!$tempUser) {
        throw new Exception('အကောင့်မတွေ့ရပါ');
    }

    // Check if last OTP was sent less than 30 seconds ago
    $createdAt = new DateTime($tempUser['created_at']);
    $now = new DateTime();
    $interval = $createdAt->diff($now);
    $seconds = $interval->s + ($interval->i * 60) + ($interval->h * 3600) + ($interval->days * 24 * 3600);
    
    if ($seconds < 30) {
        throw new Exception('OTP ကုဒ်ကို ၃၀ စက္ကန့်အတွင်း ထပ်တူပေးပို့၍ မရပါ');
    }

    // Generate new OTP
    $newOtp = rand(100000, 999999);
    
    // Update OTP in database
    $updated = $table->updateTempUserOtp($tempUser['id'], $newOtp);
    
    if ($updated) {
        // Send new OTP email
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
            $mail->Subject = 'Lotus Shrine - အကောင့်အတည်ပြုခြင်း OTP ကုဒ် (ပြန်ပေးပို့ခြင်း)';

            $mail->Body = <<<HTML
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4f3016; text-align: center;">Lotus Shrine မှ ကြိုဆိုပါသည်</h2>
                    <p>သင့်အကောင့်ကို ဖွင့်လှစ်ပေးပို့ပါသည်။ အကောင့်ကို အတည်ပြုရန် အောက်ပါ OTP ကုဒ်ကို သုံးပါ။</p>
                    <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
                        <h3 style="margin: 0; color: #4f3016;">OTP ကုဒ်</h3>
                        <p style="font-size: 24px; font-weight: bold; margin: 10px 0;">$newOtp</p>
                        <p style="margin: 0; color: #666;">ဤကုဒ်သည် ၃ မိနစ်အတွင်းသာ သက်တမ်းရှိမည်ဖြစ်ပါသည်။</p>
                    </div>
                    <p style="color: #888; font-size: 12px; margin-top: 20px;">
                        ဤအီးမေးလ်သည် Lotus Shrine မှ အလိုအလျောက်ပေးပို့ခြင်းဖြစ်ပါသည်။ 
                        ဤအီးမေးလ်ကို သင်မတောင်းဆိုပါက လျစ်လျူရှုနိုင်ပါသည်။
                    </p>
                </div>
            HTML;

            $mail->AltBody = "Lotus Shrine မှ ကြိုဆိုပါသည်\n\n"
                           . "သင့်အကောင့်ကို ဖွင့်လှစ်ပေးပို့ပါသည်။ အကောင့်ကို အတည်ပြုရန် အောက်ပါ OTP ကုဒ်ကို သုံးပါ။\n\n"
                           . "OTP ကုဒ်: $newOtp\n\n"
                           . "ဤကုဒ်သည် ၃ မိနစ်အတွင်းသာ သက်တမ်းရှိမည်ဖြစ်ပါသည်။\n\n"
                           . "ဤအီးမေးလ်သည် Lotus Shrine မှ အလိုအလျောက်ပေးပို့ခြင်းဖြစ်ပါသည်။";

            $mail->send();
            
            echo json_encode([
                'success' => true,
                'message' => 'OTP ကုဒ်အသစ်ကို သင့်အီးမေးလ်သို့ ပေးပို့ပြီးပါပြီ'
            ]);
        } catch (Exception $e) {
            // Log the error but don't fail the resend
            error_log("OTP resend failed: " . $e->getMessage());
            
            echo json_encode([
                'success' => true,
                'message' => 'OTP ကုဒ်အသစ်ကို သင့်အီးမေးလ်သို့ ပေးပို့ရာတွင် အမှားအယွင်းရှိပါသည်။ သို့ရာတွင် အကောင့်ဖွင့်ခြင်း ဆက်လုပ်နိုင်ပါသည်။'
            ]);
        }
    } else {
        throw new Exception('OTP ကုဒ်ပြန်ပေးပို့ရာတွင် အမှားအယွင်းရှိပါသည်');
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>