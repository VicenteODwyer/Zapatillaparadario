-- Actualizar contraseña
UPDATE usuarios 
SET password = ? 
WHERE id_usuario = ?; 