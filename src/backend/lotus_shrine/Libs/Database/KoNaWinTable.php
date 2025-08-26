<?php

namespace Libs\Database;

use PDO;
use PDOException;

class KoNaWinTable
{
    private $db = null;

    public function __construct(MySQL $db)
    {
        $this->db = $db->connect();
    }

    // Method to check if a user has an active Koe Na Win vow
    public function findTrackerByUserId($userId)
    {
        try {
            $statement = $this->db->prepare("SELECT * FROM ko_na_win_tracker WHERE user_id = :user_id");
            $statement->execute([':user_id' => $userId]);
            return $statement->fetch();
        } catch (PDOException $e) {
            return null;
        }
    }

    // Method to create a new Koe Na Win vow for a user
    public function startNewVow($userId, $startDate)
    {
        try {
            // Check if user already has an active vow
            if ($this->findTrackerByUserId($userId)) {
                return false; // Vow already exists
            }

            $query = "INSERT INTO ko_na_win_tracker (user_id, start_date, current_day_count) VALUES (:user_id, :start_date, 1)";
            $statement = $this->db->prepare($query);
            $statement->execute([
                ':user_id' => $userId,
                ':start_date' => $startDate
            ]);
            return $this->db->lastInsertId();
        } catch (PDOException $e) {
            return false;
        }
    }

    // Method to log daily completion
    public function logDailyCompletion($trackerId, $dayNumber)
    {
        try {
            $logDate = date('Y-m-d'); // Current date
            $query = "INSERT INTO ko_na_win_daily_log (tracker_id, log_date, day_number, completion_status) VALUES (:tracker_id, :log_date, :day_number, 1) ON DUPLICATE KEY UPDATE completion_status = 1";
            $statement = $this->db->prepare($query);
            $statement->execute([
                ':tracker_id' => $trackerId,
                ':log_date' => $logDate,
                ':day_number' => $dayNumber
            ]);
            return true;
        } catch (PDOException $e) {
            // Handle error, e.g., if a user tries to complete the same day twice.
            return false;
        }
    }

    // Method to check if a specific day is completed
    public function isDayCompleted($trackerId, $logDate)
    {
        try {
            $statement = $this->db->prepare("SELECT completion_status FROM ko_na_win_daily_log WHERE tracker_id = :tracker_id AND log_date = :log_date");
            $statement->execute([
                ':tracker_id' => $trackerId,
                ':log_date' => $logDate
            ]);
            $result = $statement->fetch(PDO::FETCH_ASSOC);
            return $result && $result['completion_status'] == 1;
        } catch (PDOException $e) {
            return false;
        }
    }

    // Method to get all daily logs for a specific vow
    public function getDailyLogs($trackerId)
    {
        try {
            $statement = $this->db->prepare("SELECT * FROM ko_na_win_daily_log WHERE tracker_id = :tracker_id ORDER BY day_number ASC");
            $statement->execute([':tracker_id' => $trackerId]);
            return $statement->fetchAll();
        } catch (PDOException $e) {
            return [];
        }
    }
}