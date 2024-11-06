<?php
session_start();
require_once 'php/config.php';
require_once 'php/registro.php';



$error = '';
$success = '';
$nombre = '';
$apellido = '';
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
    $apellido = filter_var($_POST['apellido'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm-password'];

    // Validaciones
    if (empty($nombre) || empty($apellido) || empty($email) || empty($password) || empty($confirmPassword)) {
        $error = "Todos los campos son obligatorios";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "El formato del email no es válido";
    } elseif (strlen($password) < 6) {
        $error = "La contraseña debe tener al menos 6 caracteres";
    } elseif ($password !== $confirmPassword) {
        $error = "Las contraseñas no coinciden";
    } else {
        // Intentar registrar al usuario
        $resultado = registrarUsuario($nombre, $apellido, $email, $password);
        
        if ($resultado === true) {
            // Redirigir a login.php con mensaje de éxito
            header('Location: login.php?registro=exitoso');
            exit;
        } else {
            $error = $resultado; // Mensaje de error desde la función registrarUsuario
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro - Tienda de Zapatos</title>
    <link rel="stylesheet" href="Css/login.css">
    <link rel="stylesheet" href="Css/Header.css">
    <link rel="stylesheet" href="Css/register.css">
    <style>
        .error-message {
            color: #721c24;
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 1rem;
            text-align: center;
        }
        .success-message {
            color: #155724;
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 1rem;
            text-align: center;
        }
    </style>
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="nav-brand">
                <a href="index.php">
                    <img src="img/logo.png" alt="Logo Tienda" class="logo">
                </a>
            </div>
            <button id="menu-btn" class="menu-btn" aria-label="Menú">
                <span class="hamburger-icon"></span>
            </button>
            <div class="nav-menu">
                <a href="index.php">Inicio</a>
                <a href="productos.php">Productos</a>
                <a href="contacto.php">Contacto</a>
            </div>
        </nav>
    </header>

    <main>
        <div class="login-container register-container">
            <h1>Crear Cuenta</h1>
            
            <?php if (!empty($error)): ?>
                <div class="error-message" role="alert">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <?php if (!empty($success)): ?>
                <div class="success-message" role="alert">
                    <?php echo htmlspecialchars($success); ?>
                </div>
            <?php endif; ?>

            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST" novalidate>
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        value="<?php echo htmlspecialchars($nombre); ?>"
                        required 
                        autocomplete="given-name"
                        placeholder="Tu nombre"
                    >
                </div>

                <div class="form-group">
                    <label for="apellido">Apellido</label>
                    <input 
                        type="text" 
                        id="apellido" 
                        name="apellido" 
                        value="<?php echo htmlspecialchars($apellido); ?>"
                        required 
                        autocomplete="family-name"
                        placeholder="Tu apellido"
                    >
                </div>

                <div class="form-group">
                    <label for="email">Correo electrónico</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value="<?php echo htmlspecialchars($email); ?>"
                        required 
                        autocomplete="email"
                        placeholder="ejemplo@correo.com"
                    >
                </div>

                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        autocomplete="new-password"
                        placeholder="Mínimo 6 caracteres"
                    >
                </div>

                <div class="form-group">
                    <label for="confirm-password">Confirmar contraseña</label>
                    <input 
                        type="password" 
                        id="confirm-password" 
                        name="confirm-password" 
                        required 
                        autocomplete="new-password"
                        placeholder="Repite tu contraseña"
                    >
                </div>

                <button type="submit" class="btn-login">Crear cuenta</button>
            </form>

            <div class="login-link">
                <p>¿Ya tienes cuenta? <a href="login.php">Inicia sesión aquí</a></p>
            </div>
        </div>
    </main>

    <footer>
        <p>&copy; <?php echo date('Y'); ?> Tienda de Zapatos. Todos los derechos reservados.</p>
    </footer>

    <script>
        // Validación del formulario del lado del cliente
        document.querySelector('form').addEventListener('submit', function(e) {
            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            let isValid = true;
            
            if (!nombre || !apellido) {
                isValid = false;
                alert('Por favor, completa tu nombre y apellido');
            }
            
            if (!email || !email.includes('@')) {
                isValid = false;
                alert('Por favor, ingresa un correo electrónico válido');
            }
            
            if (!password || password.length < 6) {
                isValid = false;
                alert('La contraseña debe tener al menos 6 caracteres');
            }
            
            if (password !== confirmPassword) {
                isValid = false;
                alert('Las contraseñas no coinciden');
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    </script>
</body>
</html> 