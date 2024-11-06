<?php
require_once 'config.php';

function registrarUsuario($nombre, $apellido, $email, $password) {
    try {
        $conn = conectarDB();
        
        // Verificar si el email ya existe
        $stmt = $conn->prepare("SELECT COUNT(*) as count FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($result['count'] > 0) {
            return "El email ya está registrado";
        }
        
        // Hash de la contraseña
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        
        // Insertar nuevo usuario
        $stmt = $conn->prepare("INSERT INTO usuarios (nombre, apellido, email, password, tipo_usuario) VALUES (?, ?, ?, ?, 'regular')");
        $stmt->execute([$nombre, $apellido, $email, $passwordHash]);
        
        return true;
    } catch(PDOException $e) {
        return "Error: " . $e->getMessage();
    }
}