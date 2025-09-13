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
            return $e->getMessage()();
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
