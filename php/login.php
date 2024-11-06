<?php
session_start();
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];
    
    try {
        $conn = conectarDB();
        
        // Preparar la consulta
        $stmt = $conn->prepare("SELECT id_usuario, nombre, apellido, email, tipo_usuario, password 
                                FROM usuarios 
                                WHERE email = ?");
        $stmt->execute([$email]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Verificar si existe el usuario y la contraseña es correcta
        if ($usuario && password_verify($password, $usuario['password'])) {
            // Crear sesión
            $_SESSION['usuario_id'] = $usuario['id_usuario'];
            $_SESSION['nombre'] = $usuario['nombre'];
            $_SESSION['tipo_usuario'] = $usuario['tipo_usuario'];
            
            // Redirigir según el tipo de usuario
            if ($usuario['tipo_usuario'] === 'admin') {
                header('Location: admin/dashboard.php');
            } else {
                header('Location: index.php');
            }
            exit;
        } else {
            $error = "Credenciales incorrectas";
        }
        
    } catch(PDOException $e) {
        $error = "Error en el sistema: " . $e->getMessage();
    }
}
?> 