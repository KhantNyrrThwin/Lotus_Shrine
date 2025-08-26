<?php
namespace Libs\Database;

use PDO;
use PDOException;

class KoeNaWinTable
{
    private $db = null;

    public function __construct(MySQL $db)
    {
        $this->db = $db->connect();
    }

    public function getProgressByEmail(string $email): ?array
    {
        try {
            $stmt = $this->db->prepare("SELECT start_date, completed_dates FROM koenawin_progress WHERE user_email = :email LIMIT 1");
            $stmt->execute([':email' => $email]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$row) return null;
            return [
                'start_date' => $row['start_date'],
                'completed_dates' => $row['completed_dates'] ? json_decode($row['completed_dates'], true) : [],
            ];
        } catch (PDOException $e) {
            return null;
        }
    }

    public function upsertProgress(string $email, string $startDate, array $completedDates): bool
    {
        try {
            $this->db->beginTransaction();

            $json = json_encode(array_values($completedDates));

            $stmt = $this->db->prepare("INSERT INTO koenawin_progress (user_email, start_date, completed_dates)
                VALUES (:email, :start_date, :completed_dates)
                ON DUPLICATE KEY UPDATE start_date = VALUES(start_date), completed_dates = VALUES(completed_dates)");

            $ok = $stmt->execute([
                ':email' => $email,
                ':start_date' => $startDate,
                ':completed_dates' => $json,
            ]);

            if ($ok) {
                $this->db->commit();
                return true;
            }
            $this->db->rollBack();
            return false;
        } catch (PDOException $e) {
            if ($this->db->inTransaction()) $this->db->rollBack();
            return false;
        }
    }
}
