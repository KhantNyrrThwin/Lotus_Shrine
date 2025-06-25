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
                INSERT INTO users (name, user_email, age, user_password) 
                VALUES ( :name, :email, :age, :password)";
            $statement = $this->db->prepare($query);
            $statement->execute($data);
            return $this->db->lastInsertId();
        } catch (PDOException $e) {
            return $e->getMessage()();
        }
    }
    public function getAll(){
        try{
            $statement = $this->db->query("SELECT user_id, name, user_email, age FROM users");
        return $statement->fetchAll();
        }catch (PDOException $e) {
            return $e->getMessage();
        }
    }

    public function findByEmailAndPassword($email, $password){
        try {
            $statement = $this->db->prepare("SELECT * FROM users WHERE user_email = :email AND user_password = :password");
            $statement->execute([
                ':email' => $email,
                ':password' => $password 
            ]);
            $row = $statement->fetch(PDO::FETCH_ASSOC); // Fetch as associative array
            
            // Return name if user exists, otherwise return false
            return ($row !== null) ? $row['name'] : false;
        } catch (PDOException $e) {
            return $e->getMessage(); // Return error message if query fails
        }
    }
}
