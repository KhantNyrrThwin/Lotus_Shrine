<?php
namespace Libs\Database;


class LoginRateLimitTable {
    private $db;
    
    public function __construct($db) {
        $this->db = $db;
    }
    
    public function checkLoginAttempt($email, $ip = null, $lockDuration = 15) {
        // Clean old records (older than 24 hours)
        $this->cleanOldRecords();
        // Aggregate across any rows for this email (schema uses UNIQUE(email, ip))
        $now = date('Y-m-d H:i:s');
    
        $query = "SELECT COALESCE(SUM(attempts), 0) AS total_attempts, 
                         MAX(last_attempt) AS last_attempt, 
                         MAX(locked_until) AS locked_until
                  FROM login_attempts WHERE email = ?";
        $stmt = $this->db->prepare($query);
        $stmt->execute([$email]);
        $record = $stmt->fetch(\PDO::FETCH_ASSOC);  // Explicitly fetch as assoc array
    
        $totalAttempts = $record ? (int)$record['total_attempts'] : 0;
        $lastAttempt = $record ? $record['last_attempt'] : null;
        $lockedUntil = $record ? $record['locked_until'] : null;
    
        // If account is currently locked (any row's locked_until set)
        if (!empty($lockedUntil) && $lockedUntil > $now) {
            return [
                'allowed' => false,
                'message' => 'အကောင့်ဝင်ရန် ကြိုးစားမှု အကြိမ်အရေကျော်လွန်နေပါသည်။ ' .
                             $this->getRemainingTime($lockedUntil) . ' မိနစ်အကြာတွင် ထပ်မံကြိုးစားပါ။'
            ];
        }
    
        // If last attempt (most recent) was long ago (e.g. more than 30 minutes), reset attempts
        if (!empty($lastAttempt)) {
            $lastAttemptTs = strtotime($lastAttempt);
            if ($lastAttemptTs < strtotime('-30 minutes')) {
                $this->resetAttempts($email);
                return ['allowed' => true];
            }
        }
    
        // If aggregated attempts reached threshold, lock account (update all rows for this email)
        if ($totalAttempts >= 3) {
            $lockedUntilNew = date('Y-m-d H:i:s', strtotime("+{$lockDuration} minutes"));
            $this->lockAccount($email, $lockedUntilNew);
            return [
                'allowed' => false,
                'message' => 'အကောင့်ဝင်ရန် ကြိုးစားမှု အကြိမ်အရေကျော်လွန်နေပါသည်။ ' .
                                 $lockDuration . ' မိနစ်အကြာတွင် ထပ်မံကြိုးစားပါ။'
            ];
        }
    
        return ['allowed' => true];
    }
    
    public function recordFailedLogin($email, $ip = null, $lockDuration = 15) {
        $now = date('Y-m-d H:i:s');

        // Insert or increment attempts for the email
        $query = "INSERT INTO login_attempts (email, ip, attempts, last_attempt, created_at)
                  VALUES (?, ?, 1, ?, ?)
                  ON DUPLICATE KEY UPDATE
                  attempts = attempts + 1, last_attempt = ?, created_at = VALUES(created_at), ip = COALESCE(VALUES(ip), ip)";
        $stmt = $this->db->prepare($query);
       $stmt->execute([$email, $ip ?? '', $now, $now, $now]);

        // Check aggregated attempts across IPs and lock if threshold reached
        $check = $this->db->prepare("SELECT COALESCE(SUM(attempts),0) as total_attempts FROM login_attempts WHERE email = ?");
        $check->execute([$email]);
        $row = $check->fetch(\PDO::FETCH_ASSOC);
        $attempts = $row ? (int)$row['total_attempts'] : 0;
        if ($attempts >= 3) {
            $lockedUntil = date('Y-m-d H:i:s', strtotime("+{$lockDuration} minutes"));
            $this->lockAccount($email, $lockedUntil);
        }
    }
    
    public function clearAttempts($email, $ip = null) {
        // Remove all records for this email (regardless of IP)
        $query = "DELETE FROM login_attempts WHERE email = ?";
        $stmt = $this->db->prepare($query);
        $stmt->execute([$email]);
    }
    
    private function lockAccount($email, $lockedUntil) {
        // Update all rows for this email to set locked_until
        $query = "UPDATE login_attempts SET locked_until = ? WHERE email = ?";
        $stmt = $this->db->prepare($query);
        $stmt->execute([$lockedUntil, $email]);
    }
    
    private function resetAttempts($email) {
        // Reset attempts for all rows with this email
        $query = "UPDATE login_attempts SET attempts = 0, locked_until = NULL, last_attempt = NULL WHERE email = ?";
        $stmt = $this->db->prepare($query);
        $stmt->execute([$email]);
    }
    
    private function cleanOldRecords() {
        // Clean records older than 24 hours to keep the table small
        $query = "DELETE FROM login_attempts WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 DAY)";
        $this->db->query($query);
    }
    
    private function getRemainingTime($lockedUntil) {
        $now = time();
        $locked = strtotime($lockedUntil);
        return ceil(($locked - $now) / 60);
    }
}