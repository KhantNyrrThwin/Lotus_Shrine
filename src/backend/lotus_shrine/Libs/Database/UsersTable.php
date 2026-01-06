<?php
namespace Libs\Database;
use PDOException;
use PDO;
class UsersTable
{
    private $db = null;
    public function __construct(MySQL $db){
        $this->db = $db->connect();
    }
    
    public function insert($data){
        try {
            $query = "
                INSERT INTO users (name, user_email, dob, user_password) 
                VALUES ( :name, :email, :dob, :password)";
            $statement = $this->db->prepare($query);
            $statement->execute([
            ':name' => $data['name'],
            ':email' => $data['email'],
            ':dob' => $data['dob'],
            ':password' => $data['password']
            ]);
            return $this->db->lastInsertId();
        } catch (PDOException $e) {
            error_log("Insert user error: " . $e->getMessage());
            return false;
        }
    }
    
    public function insertTempUser($data){
        try {
            $query = "
                INSERT INTO temp_users (name, user_email, dob, user_password, otp, created_at) 
                VALUES (:name, :email, :dob, :password, :otp, :created_at)";
            $statement = $this->db->prepare($query);
            $statement->execute([
                ':name' => $data['name'],
                ':email' => $data['email'],
                ':dob' => $data['dob'],
                ':password' => $data['password'],
                ':otp' => $data['otp'],
                ':created_at' => $data['created_at']
            ]);
            return $this->db->lastInsertId();
        } catch (PDOException $e) {
            error_log("Insert temp user error: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Insert or update a temp user record keyed by email.
     * Useful when the same email retries signup and we need to refresh OTP and credentials.
     */
    public function upsertTempUser(array $data) {
        try {
            $query = "
                INSERT INTO temp_users (name, user_email, dob, user_password, otp, created_at)
                VALUES (:name, :email, :dob, :password, :otp, :created_at)
                ON DUPLICATE KEY UPDATE
                    name = VALUES(name),
                    dob = VALUES(dob),
                    user_password = VALUES(user_password),
                    otp = VALUES(otp),
                    created_at = VALUES(created_at)";

            $statement = $this->db->prepare($query);
            $statement->execute([
                ':name' => $data['name'],
                ':email' => $data['email'],
                ':dob' => $data['dob'],
                ':password' => $data['password'],
                ':otp' => $data['otp'],
                ':created_at' => $data['created_at']
            ]);

            return $this->db->lastInsertId() ?: true;
        } catch (PDOException $e) {
            error_log("Upsert temp user error: " . $e->getMessage());
            return false;
        }
    }
    
    public function findTempUserByEmail($email) {
        try {
            $statement = $this->db->prepare("SELECT * FROM temp_users WHERE user_email = :email");
            $statement->execute([':email' => $email]);
            return $statement->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return null;
        }
    }
    
    public function findTempUserByEmailAndOtp($email, $otp) {
        try {
            $statement = $this->db->prepare("SELECT * FROM temp_users WHERE user_email = :email AND otp = :otp");
            $statement->execute([
                ':email' => $email,
                ':otp' => $otp
            ]);
            return $statement->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return null;
        }
    }
    
    public function deleteTempUser($id) {
        try {
            $statement = $this->db->prepare("DELETE FROM temp_users WHERE id = :id");
            return $statement->execute([':id' => $id]);
        } catch (PDOException $e) {
            return false;
        }
    }
    
    public function updateTempUserOtp($id, $otp) {
        try {
            $statement = $this->db->prepare("UPDATE temp_users SET otp = :otp, created_at = :created_at WHERE id = :id");
            return $statement->execute([
                ':id' => $id,
                ':otp' => $otp,
                ':created_at' => date('Y-m-d H:i:s')
            ]);
        } catch (PDOException $e) {
            return false;
        }
    }
    
    public function getAll(){
        try{
            $statement = $this->db->query("SELECT user_id, name, user_email, dob FROM users");
        return $statement->fetchAll();
        }catch (PDOException $e) {
            return $e->getMessage();
        }
    }

    public function findByEmail($email) {
        try {
            $statement = $this->db->prepare("SELECT * FROM users WHERE user_email = :email");
            $statement->execute([':email' => $email]);
            return $statement->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return null;
        }
    }
    
    public function updateResetToken($email, $token, $expiry){
        $statement = $this->db->prepare(
            "UPDATE users SET 
            reset_token = :token,
            reset_token_expiry = :expiry
            WHERE user_email = :email"
        );
        
        $statement->execute([
            ':email' => $email,
            ':token' => $token,
            ':expiry' => $expiry
        ]);
    }
    
    public function updatePasswordByEmail($email, $hashedPassword)
    {
        $statement = $this->db->prepare(
            "UPDATE users SET 
                user_password = :password,
                reset_token = NULL,
                reset_token_expiry = NULL
            WHERE user_email = :email"
        );
        return $statement->execute([
            ':email' => $email,
            ':password' => $hashedPassword
        ]);
    }

    public function updateUserInfo($email, $name, $dob) {
        try {
            $query = "
                UPDATE users 
                SET name = :name, dob = :dob 
                WHERE user_email = :email";
            
            $statement = $this->db->prepare($query);
            $statement->execute([
                ':name' => $name,
                ':dob' => $dob,
                ':email' => $email
            ]);
            
            return $statement->rowCount() > 0;
        } catch (PDOException $e) {
            error_log("Update user info error: " . $e->getMessage());
            return false;
        }
    }

}
?>