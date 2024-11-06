<?php
function verificarSesion() {
    if (!isset($_SESSION['usuario_id'])) {
        header('Location: login.php');
        exit;
    }
    
    // Verificar si la sesión ha expirado (30 minutos)
    if (isset($_SESSION['ultimo_acceso']) && (time() - $_SESSION['ultimo_acceso'] > 1800)) {
        session_destroy();
        header('Location: login.php?expired=1');
        exit;
    }
    
    $_SESSION['ultimo_acceso'] = time();
}
?> 