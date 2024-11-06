-- Crear la base de datos
CREATE DATABASE tienda_online;
USE tienda_online;

-- Tabla de usuarios
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('regular', 'admin') DEFAULT 'regular',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de compras
CREATE TABLE compras (
    id_compra INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabla de detalle de compra
CREATE TABLE detalle_compra (
    id_detalle INT PRIMARY KEY AUTO_INCREMENT,
    id_compra INT,
    id_producto INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_compra) REFERENCES compras(id_compra),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- Crear usuario regular
CREATE USER 'usuario_regular'@'localhost' IDENTIFIED BY 'password123';
GRANT SELECT, INSERT ON tienda_online.usuarios TO 'usuario_regular'@'localhost';
GRANT SELECT ON tienda_online.productos TO 'usuario_regular'@'localhost';
GRANT INSERT, SELECT ON tienda_online.compras TO 'usuario_regular'@'localhost';
GRANT INSERT, SELECT ON tienda_online.detalle_compra TO 'usuario_regular'@'localhost';

-- Crear usuario administrador
CREATE USER 'usuario_admin'@'localhost' IDENTIFIED BY 'admin123';
GRANT ALL PRIVILEGES ON tienda_online.* TO 'usuario_admin'@'localhost';

-- Aplicar los cambios
FLUSH PRIVILEGES; 