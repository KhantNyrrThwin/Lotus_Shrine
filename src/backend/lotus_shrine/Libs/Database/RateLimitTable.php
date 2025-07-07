<?php
namespace Libs\Database;

class RateLimitTable {
    private $db;

    public function __construct(MySQL $db) {
        $this->db = $db->connect();
    }

    public function recordAttempt($email, $ip) {
        $statement = $this->db->prepare(
            "INSERT INTO rate_limits (email, ip, created_at) 
             VALUES (:email, :ip, NOW())
             ON DUPLICATE KEY UPDATE attempts = attempts + 1, created_at = NOW()"
        );
        $statement->execute([
            ':email' => $email,
            ':ip' => $ip
        ]);
    }

    public function checkRateLimit($email, $ip) {
    // Check attempts by email within last hour
        $emailStmt = $this->db->prepare(
            "SELECT COALESCE(SUM(attempts), 0) as total 
            FROM rate_limits 
            WHERE email = :email AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)"
        );
        $emailStmt->execute([':email' => $email]);
        $emailAttempts = $emailStmt->fetch()->total;

        // Check attempts by IP within last hour
        $ipStmt = $this->db->prepare(
            "SELECT COALESCE(SUM(attempts), 0) as total 
            FROM rate_limits 
            WHERE ip = :ip AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)"
        );
        $ipStmt->execute([':ip' => $ip]);
        $ipAttempts = $ipStmt->fetch()->total;

        return ($emailAttempts >= 3) || ($ipAttempts > 5);
    }
}