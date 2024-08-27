CREATE DATABASE usuarios_db;

USE usuarios_db;

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100)
);

INSERT INTO usuarios (nombre, email) VALUES ('Juan Pérez', 'juan.perez@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('María García', 'maria.garcia@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('Carlos López', 'carlos.lopez@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('Ana Fernández', 'ana.fernandez@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('Pedro Martínez', 'pedro.martinez@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('Luisa Sánchez', 'luisa.sanchez@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('Miguel Torres', 'miguel.torres@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('Laura Díaz', 'laura.diaz@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('David Gómez', 'david.gomez@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('Sofía Ramírez', 'sofia.ramirez@example.com');

SELECT * FROM usuarios;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE usuarios;