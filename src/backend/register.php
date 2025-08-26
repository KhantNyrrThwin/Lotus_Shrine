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

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Libs\Database\MySQL;
use Libs\Database\UsersTable;

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate input
    if (empty($data['name']) || empty($data['email']) || empty($data['password']) || empty($data['dob'])) {
        throw new Exception('အချက်အလက်များ လိုအပ်နေပါသည်');
    }

    // Sanitize inputs
    $name = filter_var($data['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $dob = filter_var($data['dob'], FILTER_SANITIZE_STRING);
    $password = $data['password'];

    // Validate DOB - calculate age from DOB
    $dobDate = new DateTime($dob);
    $today = new DateTime();
    $age = $today->diff($dobDate)->y;
    
    if ($age < 10 || $age > 120) {
        throw new Exception('မှားယွင်းသော မွေးသက္ကရာဇ်');
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
        'dob' => $dob,
        'password' => $hashedPassword
    ]);

    if ($userId) {
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
            $mail->addAddress($email, $name);

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
                        <p>အမည်: $name</p>
                        <p>အီးမေးလ်: $email</p>
                        <p>မွေးနေ့: $dob</p>
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
                           . "အမည်: $name\n"
                           . "အီးမေးလ်: $email\n"
                           . "မွေးနေ့: $dob\n\n"
                           . "အကောင့်ဝင်ရန်: http://localhost:5173/login\n\n"
                           . "ဤအီးမေးလ်သည် Lotus Shrine မှ အလိုအလျောက်ပေးပို့ခြင်းဖြစ်ပါသည်။";

            $mail->send();
        } catch (Exception $e) {
            // Log the error but don't fail the registration
            error_log("Email sending failed: " . $e->getMessage());
        }

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