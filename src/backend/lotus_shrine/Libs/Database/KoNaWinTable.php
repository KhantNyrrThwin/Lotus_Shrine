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

    // Method to find tracker by tracker ID
    public function findTrackerById($trackerId)
    {
        try {
            $statement = $this->db->prepare("SELECT * FROM ko_na_win_tracker WHERE tracker_id = :tracker_id");
            $statement->execute([':tracker_id' => $trackerId]);
            return $statement->fetch();
        } catch (PDOException $e) {
            error_log("Error in findTrackerById: " . $e->getMessage());
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
            $query = "INSERT INTO ko_na_win_tracker (user_id, start_date, current_day_count, current_stage) VALUES (:user_id, :start_date, 0, 1)";
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

    // Method to create a new Koe Na Win vow with real-life progress
    public function startNewVowWithRealLifeProgress($userId, $startDate, $currentDayCount, $currentStage)
    {
        try {
            // Check if user already has an active vow
            if ($this->findTrackerByUserId($userId)) {
                return false; // Vow already exists
            }

            // Calculate if the vow is completed
            $isCompleted = ($currentDayCount >= 81) ? 1 : 0;

            // Insert new vow with the provided progress
            $query = "INSERT INTO ko_na_win_tracker (user_id, start_date, current_day_count, current_stage, is_completed) VALUES (:user_id, :start_date, :current_day_count, :current_stage, :is_completed)";
            $statement = $this->db->prepare($query);
            $result = $statement->execute([
                ':user_id' => $userId,
                ':start_date' => $startDate,
                ':current_day_count' => $currentDayCount,
                ':current_stage' => $currentStage,
                ':is_completed' => $isCompleted
            ]);
            
            $trackerId = $this->db->lastInsertId();
            error_log("startNewVowWithRealLifeProgress - Inserted tracker with ID: $trackerId, current_day_count: $currentDayCount, current_stage: $currentStage, is_completed: $isCompleted");
            
            return $trackerId;
        } catch (PDOException $e) {
            error_log("Error in startNewVowWithRealLifeProgress: " . $e->getMessage());
            return false;
        }
    }

    // Method to log daily completion (one-time only) - RACE CONDITION FIXED
    public function logDailyCompletion($trackerId, $dayNumber, $logDate = null)
    {
        try {
            $logDate = $logDate ?: date('Y-m-d'); // Use provided date or current date
            error_log("logDailyCompletion - trackerId: $trackerId, logDate: $logDate, dayNumber: $dayNumber");
            
            // Calculate the correct day number based on current progress
            $correctDayNumber = $this->calculateNextDayNumber($trackerId);
            
            // First check if entry already exists for this date
            $existingEntry = $this->getDailyLogByDate($trackerId, $logDate);
            
            if ($existingEntry) {
                // Day already completed, return success without action
                error_log("logDailyCompletion - Day already completed for date: $logDate");
                return ['success' => true, 'action' => 'already_completed', 'status' => 1];
            }
            
            // Insert new entry
            $query = "INSERT INTO ko_na_win_daily_log (tracker_id, log_date, day_number, completion_status) 
                     VALUES (:tracker_id, :log_date, :day_number, 1)";
            
            $statement = $this->db->prepare($query);
            $result = $statement->execute([
                ':tracker_id' => $trackerId,
                ':log_date' => $logDate,
                ':day_number' => $correctDayNumber
            ]);
            
            if (!$result) {
                error_log("logDailyCompletion - Insert failed for trackerId: $trackerId, logDate: $logDate");
                return ['success' => false, 'error' => 'Failed to insert daily log entry'];
            }
            
            // New entry was inserted successfully
            error_log("logDailyCompletion - New entry inserted for trackerId: $trackerId, logDate: $logDate, dayNumber: $correctDayNumber");
            return ['success' => true, 'action' => 'completed', 'status' => 1, 'calculatedDayNumber' => $correctDayNumber];
            
        } catch (PDOException $e) {
            // Check if it's a duplicate key error (should not happen with ON DUPLICATE KEY UPDATE)
            if ($e->getCode() == 23000) { // Duplicate entry error
                error_log("logDailyCompletion - Duplicate entry detected for trackerId: $trackerId, logDate: $logDate");
                return ['success' => true, 'action' => 'already_completed', 'status' => 1];
            }
            
            error_log("Error in logDailyCompletion: " . $e->getMessage());
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    // Method to calculate the next day number based on current progress
    public function calculateNextDayNumber($trackerId)
    {
        try {
            // Find the largest day_number for this tracker where completion_status = 1
            $statement = $this->db->prepare(
                "SELECT MAX(day_number) AS max_day FROM ko_na_win_daily_log WHERE tracker_id = :tracker_id AND completion_status = 1"
            );
            $statement->execute([':tracker_id' => $trackerId]);
            $result = $statement->fetch(PDO::FETCH_ASSOC);
        
            // If there are no completed rows, MAX will be NULL — treat as 0
            $maxDay = isset($result['max_day']) && $result['max_day'] !== null ? (int)$result['max_day'] : 0;
        
            // Per your request: completedDays is max day + 1
            $completedDays = $maxDay;
        
            // Calculate the next day number (1-9 within each stage)
            $nextDayNumber = ($completedDays % 9) + 1;
        
            error_log("calculateNextDayNumber - trackerId: $trackerId, maxDay: $maxDay, completedDays: $completedDays, nextDayNumber: $nextDayNumber");
        
            return $nextDayNumber;
        } catch (PDOException $e) {
            error_log("Error in calculateNextDayNumber: " . $e->getMessage());
            return 1; // Default to day 1 if there's an error
        }
    }

    // Method to get daily log entry by date
    public function getDailyLogByDate($trackerId, $logDate)
    {
        try {
            $statement = $this->db->prepare("SELECT * FROM ko_na_win_daily_log WHERE tracker_id = :tracker_id AND log_date = :log_date");
            $statement->execute([
                ':tracker_id' => $trackerId,
                ':log_date' => $logDate
            ]);
            return $statement->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error in getDailyLogByDate: " . $e->getMessage());
            return null;
        }
    }

    // Method to update the overall progress in ko_na_win_tracker
    public function updateTrackerProgress($trackerId, $newCurrentDayCount, $newCurrentStage, $isCompleted)
    {
        try {
            // First, get current values to compare
            $currentTracker = $this->findTrackerById($trackerId);
            if (!$currentTracker) {
                error_log("updateTrackerProgress: Tracker with ID $trackerId not found");
                return false;
            }
            
            // Check if values are actually different
            $hasChanges = (
                $currentTracker->current_day_count != $newCurrentDayCount ||
                $currentTracker->current_stage != $newCurrentStage ||
                $currentTracker->is_completed != $isCompleted
            );
            
            if (!$hasChanges) {
                error_log("updateTrackerProgress: No changes needed for trackerId: $trackerId");
                return true; // No changes needed, consider it successful
            }
            
            $query = "UPDATE ko_na_win_tracker SET current_day_count = :current_day_count, current_stage = :current_stage, is_completed = :is_completed WHERE tracker_id = :tracker_id";
            $statement = $this->db->prepare($query);
            $result = $statement->execute([
                ':current_day_count' => $newCurrentDayCount,
                ':current_stage' => $newCurrentStage,
                ':is_completed' => $isCompleted,
                ':tracker_id' => $trackerId
            ]);
            
            if (!$result) {
                error_log("updateTrackerProgress: Execute failed for trackerId: $trackerId");
                return false;
            }
            
            $rowCount = $statement->rowCount();
            error_log("updateTrackerProgress - trackerId: $trackerId, rowCount: $rowCount, newValues: dayCount=$newCurrentDayCount, stage=$newCurrentStage, completed=$isCompleted");
            
            return $rowCount > 0;
        } catch (PDOException $e) {
            error_log("Error in updateTrackerProgress: " . $e->getMessage());
            return false;
        }
    }

    // Method to recalculate and update tracker progress based on actual completed days - OPTIMIZED
    public function recalculateTrackerProgress($trackerId)
    {
        try {
            // Get tracker and completed days in a single optimized query
            $query = "
                SELECT 
                    t.tracker_id, t.current_day_count, t.current_stage, t.is_completed,
                    COUNT(d.log_id) as completed_count
                FROM ko_na_win_tracker t
                LEFT JOIN ko_na_win_daily_log d ON t.tracker_id = d.tracker_id AND d.completion_status = 1
                WHERE t.tracker_id = :tracker_id
                GROUP BY t.tracker_id, t.current_day_count, t.current_stage, t.is_completed
            ";
            
            $statement = $this->db->prepare($query);
            $statement->execute([':tracker_id' => $trackerId]);
            $result = $statement->fetch(PDO::FETCH_ASSOC);
            
            if (!$result) {
                error_log("recalculateTrackerProgress: Tracker with ID $trackerId not found");
                return false;
            }
            
            $currentDayCount = (int)$result['current_day_count'];
            $completedDays = (int)$result['completed_count'];
            
            // For real-life continuation, preserve the original current_day_count and increment it
            if ($currentDayCount > $completedDays) {
                // This is a real-life continuation - increment the current_day_count
                $newCurrentDayCount = $currentDayCount + 1;
                $newCurrentStage = (int)ceil($newCurrentDayCount / 9);
                $isCompleted = ($newCurrentDayCount >= 81) ? 1 : 0;
                
                error_log("recalculateTrackerProgress (real-life) - trackerId: $trackerId, originalDayCount: $currentDayCount, newDayCount: $newCurrentDayCount, newStage: $newCurrentStage");
                
                return $this->updateTrackerProgress($trackerId, $newCurrentDayCount, $newCurrentStage, $isCompleted);
            } else {
                // Regular calculation for normal users
                $currentStage = (int)ceil($completedDays / 9);
                $isCompleted = ($completedDays >= 81) ? 1 : 0;
                $currentDayCount = $completedDays;
                
                error_log("recalculateTrackerProgress (regular) - trackerId: $trackerId, completedDays: $completedDays, currentStage: $currentStage, currentDayCount: $currentDayCount");
                
                return $this->updateTrackerProgress($trackerId, $currentDayCount, $currentStage, $isCompleted);
            }
        } catch (PDOException $e) {
            error_log("Error in recalculateTrackerProgress: " . $e->getMessage());
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
            $statement = $this->db->prepare("SELECT log_id, tracker_id, log_date, day_number, completion_status FROM ko_na_win_daily_log WHERE tracker_id = :tracker_id ORDER BY log_date ASC"); // Order by log_date for chronological order
            $statement->execute([':tracker_id' => $trackerId]);
            $logs = $statement->fetchAll(PDO::FETCH_ASSOC);
            
            // Debug logging
            error_log("getDailyLogs - trackerId: $trackerId, logs count: " . count($logs));
            foreach ($logs as $log) {
                error_log("Daily log: " . json_encode($log));
            }
            
            return $logs;
        } catch (PDOException $e) {
            error_log("Error in getDailyLogs: " . $e->getMessage());
            return [];
        }
    }

    // Method to log only the previous day for real-life progress continuation
    public function logPreviousDayForRealLifeProgress($trackerId, $currentDayCount, $startDate)
    {
        try {
            // If currentDayCount is 0, no previous day to log
            if ($currentDayCount <= 0) {
                return true;
            }

            $previousDayDate = date('Y-m-d', strtotime($startDate . ' -1 day'));
            
            // Calculate the day number within the stage for the previous day
            $previousDayNumber = (($currentDayCount - 1) % 9) + 1;
            
            // Check if this day is already logged
            $existingEntry = $this->getDailyLogByDate($trackerId, $previousDayDate);
            
            if (!$existingEntry) {
                // Insert only the previous day as completed
                $query = "INSERT INTO ko_na_win_daily_log (tracker_id, log_date, day_number, completion_status) VALUES (:tracker_id, :log_date, :day_number, 1)";
                $statement = $this->db->prepare($query);
                $statement->execute([
                    ':tracker_id' => $trackerId,
                    ':log_date' => $previousDayDate,
                    ':day_number' => $previousDayNumber
                ]);
                
                error_log("logPreviousDayForRealLifeProgress - trackerId: $trackerId, previousDayDate: $previousDayDate, dayNumber: $previousDayNumber");
            }
            
            return true;
        } catch (PDOException $e) {
            error_log("Error in logPreviousDayForRealLifeProgress: " . $e->getMessage());
            return false;
        }
    }

    // Updated: saveCompletion (no tracker_id in insert)
    public function saveCompletion($trackerId)
    {
        try {
            // Fetch tracker to validate and copy data
            $tracker = $this->findTrackerById($trackerId);
            if (!$tracker || $tracker->is_completed != 1) {
                return ['success' => false, 'error' => 'Tracker not completed.'];
            }

            // Check if already saved (by user_id + start_date, since tracker will be deleted)
            $existingCompletion = $this->db->prepare("
                SELECT completion_id FROM ko_na_win_completions 
                WHERE user_id = :user_id AND start_date = :start_date
            ");
            $existingCompletion->execute([
                ':user_id' => $tracker->user_id,
                ':start_date' => $tracker->start_date
            ]);
            if ($existingCompletion->fetch()) {
                return ['success' => false, 'error' => 'Already saved for this vow.'];
            }

            // Insert completion (no tracker_id)
            $query = "INSERT INTO ko_na_win_completions (user_id, start_date, end_date) 
                    VALUES (:user_id, :start_date, CURDATE())";
            $statement = $this->db->prepare($query);
            $result = $statement->execute([
                ':user_id' => $tracker->user_id,
                ':start_date' => $tracker->start_date,
            ]);

            if (!$result) {
                return ['success' => false, 'error' => 'Insert failed.'];
            }

            $completionId = $this->db->lastInsertId();
            $endDate = date('Y-m-d');
            error_log("saveCompletion - Saved completion ID: $completionId for user: {$tracker->user_id}, start_date: {$tracker->start_date}");

            return [
                'success' => true,
                'completion_id' => (int)$completionId,
                'end_date' => $endDate
            ];

        } catch (PDOException $e) {
            error_log("Error in saveCompletion: " . $e->getMessage());
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    // Updated: getUserCompletions (simpler, no JOIN to tracker)
    public function getUserCompletions($userId)
    {
        try {
            $statement = $this->db->prepare("
                SELECT * FROM ko_na_win_completions 
                WHERE user_id = :user_id 
                ORDER BY completed_at DESC
            ");
            $statement->execute([':user_id' => $userId]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error in getUserCompletions: " . $e->getMessage());
            return [];
        }
    }

    // Delete KoNaWinTable 
    public function deleteTrackerById($trackerId)
    {
        try {
            // Start transaction so partial deletes don't leave inconsistent state
            $this->db->beginTransaction();

            // 1) Delete related daily logs
            $stmtLogs = $this->db->prepare("DELETE FROM ko_na_win_daily_log WHERE tracker_id = :tracker_id");
            $stmtLogs->execute([':tracker_id' => $trackerId]);
            $deletedLogs = $stmtLogs->rowCount();

            // 2) Delete the tracker row
            $stmtTracker = $this->db->prepare("DELETE FROM ko_na_win_tracker WHERE tracker_id = :tracker_id");
            $stmtTracker->execute([':tracker_id' => $trackerId]);
            $deletedTracker = $stmtTracker->rowCount();

            if ($deletedTracker === 0) {
                // Nothing deleted for tracker -> rollback and report not found
                $this->db->rollBack();
                error_log("deleteTrackerById: Tracker with ID {$trackerId} not found.");
                return ['success' => false, 'error' => 'Tracker not found', 'deleted_logs' => $deletedLogs, 'deleted_tracker' => 0];
            }

            // Commit changes
            $this->db->commit();
            error_log("deleteTrackerById: Deleted tracker {$trackerId} and {$deletedLogs} related log(s).");

            return ['success' => true, 'deleted_logs' => $deletedLogs, 'deleted_tracker' => $deletedTracker];
        } catch (PDOException $e) {
            // Rollback on error
            if ($this->db->inTransaction()) {
                $this->db->rollBack();
            }
            error_log("Error in deleteTrackerById: " . $e->getMessage());
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }


}
