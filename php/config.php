<?php
// Configuración de la base de datos
define('DB_HOST', 'localhost');
define('DB_USER', 'usuario_regular');
define('DB_PASS', 'password123');
define('DB_NAME', 'tienda_online');

// Crear conexión
function conectarDB() {
    try {
        $conn = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
            DB_USER,
            DB_PASS,
            array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
        );
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch(PDOException $e) {
        die("Error de conexión: " . $e->getMessage());
    }
}
?> 