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
            $statement->execute([
            ':name' => $data['name'],
            ':email' => $data['email'],
            ':age' => $data['age'],
            ':password' => $data['password']
            ]);
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

    public function findByEmail($email) {
        try {
            $statement = $this->db->prepare("SELECT * FROM users WHERE user_email = :email");
            $statement->execute([':email' => $email]);
            return $statement->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return null;
        }
    }
}
