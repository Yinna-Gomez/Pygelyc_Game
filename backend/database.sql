-- Base de datos para el juego de límites
CREATE DATABASE IF NOT EXISTS pygelyc_game;
USE pygelyc_game;

-- Tabla de usuarios (estudiantes y docentes)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    tipo ENUM('estudiante', 'docente') DEFAULT 'estudiante',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de mundos/niveles
CREATE TABLE mundos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    orden INT NOT NULL,
    estado ENUM('activo', 'bloqueado') DEFAULT 'bloqueado'
);

-- Tabla de desafíos por mundo
CREATE TABLE desafios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_mundo INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(50),
    parametros JSON,
    respuesta_correcta FLOAT,
    FOREIGN KEY (id_mundo) REFERENCES mundos(id) ON DELETE CASCADE
);

-- Tabla de progreso del estudiante
CREATE TABLE progreso_estudiante (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_estudiante INT NOT NULL,
    id_mundo INT NOT NULL,
    id_desafio INT,
    estado ENUM('no_iniciado', 'en_progreso', 'completado') DEFAULT 'no_iniciado',
    porcentaje_completado FLOAT DEFAULT 0,
    intentos INT DEFAULT 0,
    tiempo_total INT DEFAULT 0, -- en segundos
    fecha_inicio TIMESTAMP NULL,
    fecha_completado TIMESTAMP NULL,
    FOREIGN KEY (id_estudiante) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_mundo) REFERENCES mundos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_desafio) REFERENCES desafios(id) ON DELETE CASCADE
);

-- Tabla de intentos detallados
CREATE TABLE intentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_estudiante INT NOT NULL,
    id_desafio INT NOT NULL,
    respuesta_dada FLOAT,
    es_correcto BOOLEAN,
    distancia_al_punto FLOAT,
    tiempo_respuesta INT, -- en segundos
    fecha_intento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_estudiante) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_desafio) REFERENCES desafios(id) ON DELETE CASCADE
);

-- Tabla de errores comunes
CREATE TABLE errores_comunes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_estudiante INT NOT NULL,
    id_desafio INT NOT NULL,
    tipo_error VARCHAR(100),
    descripcion TEXT,
    frecuencia INT DEFAULT 1,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_estudiante) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_desafio) REFERENCES desafios(id) ON DELETE CASCADE
);

-- Tabla de gamificación (puntos, insignias)
CREATE TABLE gamificacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_estudiante INT NOT NULL,
    tipo_recompensa ENUM('puntos', 'insignia', 'logro') NOT NULL,
    valor INT DEFAULT 0,
    nombre VARCHAR(100),
    descripcion TEXT,
    fecha_obtencion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_estudiante) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de pistas utilizadas
CREATE TABLE pistas_utilizadas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_estudiante INT NOT NULL,
    id_desafio INT NOT NULL,
    nivel_pista INT,
    texto_pista TEXT,
    personaje_guia VARCHAR(50),
    fecha_uso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_estudiante) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_desafio) REFERENCES desafios(id) ON DELETE CASCADE
);

-- Insertar datos iniciales
INSERT INTO mundos (nombre, descripcion, orden, estado) VALUES
('Mundo 1: Definición de Límite', 'Valle con río serpenteante. Mecánica: Plataformas móviles para aproximación sucesiva al valor límite.', 1, 'activo'),
('Mundo 2: Límites Laterales y Existencia', 'Torre mística y caminos izquierdo/derecho para comprobar si los límites laterales coinciden.', 2, 'bloqueado'),
('Mundo 3: Propiedades de Límites', 'Taller de alquimia matemática para combinar límites como ingredientes (suma, producto, cociente).', 3, 'bloqueado'),
('Mundo 4: Límites Trigonométricos', 'Observatorio astronómico místico para calcular límites notables y funciones trigonométricas.', 4, 'bloqueado'),
('Mundo 5: Continuidad Puntual', 'Puente colgante roto sobre un vórtice para clasificar discontinuidades (removible, de salto, infinita).', 5, 'bloqueado'),
('Mundo 6: Teoremas de Continuidad en un Punto', 'Laboratorio de verificación con terminales de prueba de los tres requisitos de continuidad.', 6, 'bloqueado'),
('Mundo 7: Continuidad en un Intervalo Abierto', 'Carretera flotante donde Límix viaja en ContiCar esquivando huecos de discontinuidad.', 7, 'bloqueado'),
('Mundo 8: Continuidad en un Intervalo Cerrado', 'Circuito de carreras final donde se verifica la continuidad, incluyendo los límites laterales en los extremos.', 8, 'bloqueado');

-- Insertar desafíos del Mundo 1
INSERT INTO desafios (id_mundo, nombre, descripcion, tipo, parametros, respuesta_correcta) VALUES
(1, 'Aproximación Inicial', 'Mover a Límix sobre las piedras para aproximarse al punto a=2', 'aproximacion', 
'{"punto_objetivo": 2, "tolerancia": 0.1, "funcion": "x^2"}', 4.0),
(1, 'Observar Valores', 'Identificar los valores de f(x) en diferentes piedras', 'observacion',
'{"valores_x": [1.5, 1.8, 1.9, 2.0, 2.1], "funcion": "x^2"}', 4.0),
(1, 'Desafío de Precisión', 'Alcanzar el punto más cercano a a dentro del rango de tolerancia', 'precision',
'{"punto_objetivo": 3, "tolerancia": 0.05, "funcion": "2x+1"}', 7.0);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_progreso_estudiante ON progreso_estudiante(id_estudiante, id_mundo);
CREATE INDEX idx_intentos_estudiante ON intentos(id_estudiante, id_desafio);
CREATE INDEX idx_gamificacion_estudiante ON gamificacion(id_estudiante);
