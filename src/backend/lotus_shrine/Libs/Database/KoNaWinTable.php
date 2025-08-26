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
            // Select all columns including the new 'current_stage'
            $statement = $this->db->prepare("SELECT * FROM ko_na_win_tracker WHERE user_id = :user_id");
            $statement->execute([':user_id' => $userId]);
            return $statement->fetch();
        } catch (PDOException $e) {
            error_log("Error in findTrackerByUserId: " . $e->getMessage());
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

            // Insert new vow, initializing current_day_count and current_stage to 1
            $query = "INSERT INTO ko_na_win_tracker (user_id, start_date, current_day_count, current_stage) VALUES (:user_id, :start_date, 1, 1)";
            $statement = $this->db->prepare($query);
            $statement->execute([
                ':user_id' => $userId,
                ':start_date' => $startDate
            ]);
            return $this->db->lastInsertId();
        } catch (PDOException $e) {
            error_log("Error in startNewVow: " . $e->getMessage());
            return false;
        }
    }

    // Method to log daily completion
    public function logDailyCompletion($trackerId, $dayNumber)
    {
        try {
            $logDate = date('Y-m-d'); // Current date
            // Using INSERT IGNORE to prevent duplicate entries if the user tries to log twice for the same day
            // Or, using ON DUPLICATE KEY UPDATE completion_status = 1 (if you add a UNIQUE constraint on (tracker_id, log_date))
            // For now, let's assume we want to prevent re-logging if already exists for the day
            $query = "INSERT INTO ko_na_win_daily_log (tracker_id, log_date, day_number, completion_status) VALUES (:tracker_id, :log_date, :day_number, 1)";
            $statement = $this->db->prepare($query);
            $statement->execute([
                ':tracker_id' => $trackerId,
                ':log_date' => $logDate,
                ':day_number' => $dayNumber // This dayNumber is the day within the stage (1-9)
            ]);
            return true;
        } catch (PDOException $e) {
            // Handle error, e.g., if a user tries to complete the same day twice.
            // If you get a duplicate key error, it means the day was already logged.
            if ($e->getCode() == 23000) { // SQLSTATE for integrity constraint violation
                 error_log("Attempt to log already completed day for tracker_id {$trackerId} on {$logDate}");
                 return true; // Consider it successful if it was already logged
            }
            error_log("Error in logDailyCompletion: " . $e->getMessage());
            return false;
        }
    }

    // Method to update the overall progress in ko_na_win_tracker
    public function updateTrackerProgress($trackerId, $newCurrentDayCount, $newCurrentStage, $isCompleted)
    {
        try {
            $query = "UPDATE ko_na_win_tracker SET current_day_count = :current_day_count, current_stage = :current_stage, is_completed = :is_completed WHERE tracker_id = :tracker_id";
            $statement = $this->db->prepare($query);
            $statement->execute([
                ':current_day_count' => $newCurrentDayCount,
                ':current_stage' => $newCurrentStage,
                ':is_completed' => $isCompleted,
                ':tracker_id' => $trackerId
            ]);
            return $statement->rowCount() > 0;
        } catch (PDOException $e) {
            error_log("Error in updateTrackerProgress: " . $e->getMessage());
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
            error_log("Error in isDayCompleted: " . $e->getMessage());
            return false;
        }
    }

    // Method to get all daily logs for a specific vow
    public function getDailyLogs($trackerId)
    {
        try {
            $statement = $this->db->prepare("SELECT * FROM ko_na_win_daily_log WHERE tracker_id = :tracker_id ORDER BY log_date ASC"); // Order by log_date for chronological order
            $statement->execute([':tracker_id' => $trackerId]);
            return $statement->fetchAll();
        } catch (PDOException $e) {
            error_log("Error in getDailyLogs: " . $e->getMessage());
            return [];
        }
    }
}
