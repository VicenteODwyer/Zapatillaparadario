-- Consulta para crear un nuevo usuario (Signup)
INSERT INTO usuarios (nombre, apellido, email, password, tipo_usuario)
VALUES (?, ?, ?, ?, 'regular');

-- Consulta para verificar el login de usuario
SELECT id_usuario, nombre, apellido, email, tipo_usuario 
FROM usuarios 
WHERE email = ? AND password = ?;

-- Consulta para verificar si el email ya existe (antes del signup)
SELECT COUNT(*) as count 
FROM usuarios 
WHERE email = ?; 