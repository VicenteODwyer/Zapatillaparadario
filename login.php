<?php
session_start();
require_once 'php/config.php';
require_once 'php/auth.php';



$error = '';
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];
    
    if (empty($email) || empty($password)) {
        $error = "Por favor, complete todos los campos";
    } else {
        try {
            $conn = conectarDB();
            
            // Primero verificamos si el email existe
            $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ? LIMIT 1");
            $stmt->execute([$email]);
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($usuario) {
                // Si el usuario existe, verificamos la contraseña
                if (password_verify($password, $usuario['password'])) {
                    // Regenerar ID de sesión por seguridad
                    session_regenerate_id(true);
                    
                    // Guardar datos en sesión
                    $_SESSION['usuario_id'] = $usuario['id_usuario'];
                    $_SESSION['nombre'] = $usuario['nombre'];
                    $_SESSION['apellido'] = $usuario['apellido'];
                    $_SESSION['email'] = $usuario['email'];
                    $_SESSION['tipo_usuario'] = $usuario['tipo_usuario'];
                    $_SESSION['ultimo_acceso'] = time();
                    
                    // Redirigir según el tipo de usuario
                    $redirect = ($usuario['tipo_usuario'] === 'admin') ? 'admin/dashboard.php' : 'index.html';
                    
                    // Usar JavaScript para redirigir
                    echo "<script>
                            alert('¡Inicio de sesión exitoso!');
                            window.location.href = '$redirect';
                            </script>";
                    exit;
                } else {
                    $error = "Contraseña incorrecta";
                }
            } else {
                $error = "El correo electrónico no está registrado";
            }
            // Pequeña pausa para prevenir ataques de fuerza bruta
            sleep(1);
        } catch(PDOException $e) {
            error_log("Error de login: " . $e->getMessage());
            $error = "Error en el sistema. Por favor, intente más tarde";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Inicio de sesión para tienda de zapatos">
    <title>Iniciar Sesión - Tienda de Zapatos</title>
    <link rel="stylesheet" href="Css/login.css">
    <link rel="stylesheet" href="Css/Header.css">
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
        .login-container {
            max-width: 400px;
            margin: 2rem auto;
            padding: 2rem;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .form-group {
            margin-bottom: 1rem;
        }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
        }
        .form-group input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
        }
        .btn-login {
            width: 100%;
            padding: 0.75rem;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .btn-login:hover {
            background: #0056b3;
        }
        .forgot-password {
            text-align: center;
            margin-top: 1rem;
        }
        .forgot-password a {
            color: #007bff;
            text-decoration: none;
        }
        .forgot-password a:hover {
            text-decoration: underline;
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
        <div class="login-container">
            <h1>Iniciar Sesión</h1>
            
            <?php if (isset($_GET['registro']) && $_GET['registro'] === 'exitoso'): ?>
                <div class="success-message" role="alert">
                    ¡Registro exitoso! Por favor, inicia sesión con tus credenciales.
                </div>
            <?php endif; ?>

            <?php if (!empty($error)): ?>
                <div class="error-message" role="alert">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST" novalidate>
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
                        autocomplete="current-password"
                        placeholder="Ingrese su contraseña"
                    >
                </div>

                <button type="submit" class="btn-login">Iniciar Sesión</button>
            </form>

            <div class="forgot-password">
                <a href="recuperar-password.php">¿Olvidaste tu contraseña?</a>
            </div>
            
            <div class="register-link">
                <p>¿No tienes cuenta? <a href="registro.php">Regístrate aquí</a></p>
            </div>
        </div>
    </main>

    <footer>
        <p>&copy; <?php echo date('Y'); ?> Tienda de Zapatos. Todos los derechos reservados.</p>
    </footer>

    <script>
        // Modificar la validación del formulario
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envío automático
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            let isValid = true;
            
            if (!email || !email.includes('@')) {
                isValid = false;
                alert('Por favor, ingrese un correo electrónico válido');
            }
            
            if (!password || password.length < 6) {
                isValid = false;
                alert('La contraseña debe tener al menos 6 caracteres');
            }
            
            if (isValid) {
                this.submit(); // Enviar el formulario si todo está correcto
            }
        });
    </script>
</body>
</html> 