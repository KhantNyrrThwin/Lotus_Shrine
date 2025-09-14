-- Add unique constraint to prevent duplicate daily log entries
-- This ensures only one completion per day per tracker

-- Add unique constraint on (tracker_id, log_date)
ALTER TABLE `ko_na_win_daily_log` 
ADD UNIQUE KEY `unique_tracker_date` (`tracker_id`, `log_date`);

-- Verify the constraint was added
SHOW INDEX FROM `ko_na_win_daily_log`;
