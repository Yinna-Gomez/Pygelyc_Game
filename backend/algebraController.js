const { pool } = require('./server');

/**
 * Banco de ejercicios de factorización
 */
const ejerciciosFactorizacion = {
    basico: [
        {
            expresion_original: "2x + 4",
            expresion_resultado: "2(x + 2)",
            tipo_factorizacion: "factor_comun",
            pasos_resolucion: [
                "Identifica el factor común: 2",
                "Extrae el factor común: 2(x + 2)",
                "Verifica multiplicando: 2·x + 2·2 = 2x + 4 ✓"
            ],
            puntos: 10
        },
        {
            expresion_original: "x² - 9",
            expresion_resultado: "(x - 3)(x + 3)",
            tipo_factorizacion: "diferencia_cuadrados",
            pasos_resolucion: [
                "Reconoce la diferencia de cuadrados: a² - b²",
                "Identifica: a = x, b = 3",
                "Aplica la fórmula: (x - 3)(x + 3)",
                "Verifica: (x-3)(x+3) = x² - 9 ✓"
            ],
            puntos: 15
        },
        {
            expresion_original: "x² + 6x + 9",
            expresion_resultado: "(x + 3)²",
            tipo_factorizacion: "trinomio_cuadrado_perfecto",
            pasos_resolucion: [
                "Reconoce el trinomio cuadrado perfecto: a² + 2ab + b²",
                "Identifica: a = x, b = 3",
                "Verifica: 2·x·3 = 6x ✓",
                "Resultado: (x + 3)²"
            ],
            puntos: 15
        }
    ],
    intermedio: [
        {
            expresion_original: "x² + 5x + 6",
            expresion_resultado: "(x + 2)(x + 3)",
            tipo_factorizacion: "trinomio_forma_x2_bx_c",
            pasos_resolucion: [
                "Busca dos números que sumen 5 y multipliquen 6",
                "Los números son: 2 y 3 (2+3=5, 2×3=6)",
                "Factoriza: (x + 2)(x + 3)",
                "Verifica: x² + 3x + 2x + 6 = x² + 5x + 6 ✓"
            ],
            puntos: 20
        },
        {
            expresion_original: "2x² + 7x + 3",
            expresion_resultado: "(2x + 1)(x + 3)",
            tipo_factorizacion: "trinomio_forma_ax2_bx_c",
            pasos_resolucion: [
                "Multiplica a×c: 2×3 = 6",
                "Busca dos números que sumen 7 y multipliquen 6: son 1 y 6",
                "Reescribe: 2x² + x + 6x + 3",
                "Agrupa: x(2x + 1) + 3(2x + 1)",
                "Factoriza: (2x + 1)(x + 3)"
            ],
            puntos: 25
        }
    ],
    avanzado: [
        {
            expresion_original: "xy + 2x + 3y + 6",
            expresion_resultado: "(x + 3)(y + 2)",
            tipo_factorizacion: "agrupacion",
            pasos_resolucion: [
                "Agrupa términos: (xy + 2x) + (3y + 6)",
                "Factor común en cada grupo: x(y + 2) + 3(y + 2)",
                "Factor común final: (y + 2)(x + 3)",
                "Verifica expandiendo: xy + 2x + 3y + 6 ✓"
            ],
            puntos: 30
        }
    ]
};

/**
 * Banco de ejercicios de racionalización
 */
const ejerciciosRacionalizacion = {
    basico: [
        {
            expresion_original: "1/√2",
            expresion_resultado: "√2/2",
            pasos_resolucion: [
                "Multiplica numerador y denominador por √2",
                "(1 × √2)/(√2 × √2) = √2/2",
                "Simplifica: √2/2"
            ],
            puntos: 10
        },
        {
            expresion_original: "3/√5",
            expresion_resultado: "3√5/5",
            pasos_resolucion: [
                "Multiplica numerador y denominador por √5",
                "(3 × √5)/(√5 × √5) = 3√5/5"
            ],
            puntos: 15
        }
    ],
    intermedio: [
        {
            expresion_original: "1/(√3 + 1)",
            expresion_resultado: "(√3 - 1)/2",
            pasos_resolucion: [
                "Multiplica por el conjugado: (√3 - 1)/(√3 - 1)",
                "Numerador: 1 × (√3 - 1) = √3 - 1",
                "Denominador: (√3 + 1)(√3 - 1) = 3 - 1 = 2",
                "Resultado: (√3 - 1)/2"
            ],
            puntos: 20
        }
    ],
    avanzado: [
        {
            expresion_original: "2/(√5 - √3)",
            expresion_resultado: "(√5 + √3)",
            pasos_resolucion: [
                "Multiplica por el conjugado: (√5 + √3)/(√5 + √3)",
                "Numerador: 2(√5 + √3) = 2√5 + 2√3",
                "Denominador: (√5)² - (√3)² = 5 - 3 = 2",
                "Simplifica: (2√5 + 2√3)/2 = √5 + √3"
            ],
            puntos: 30
        }
    ]
};

/**
 * Normalizar expresión para comparación
 */
const normalizarExpresion = (expr) => {
    if (!expr) return '';
    return expr
        .replace(/\s+/g, '')           // Eliminar espacios
        .replace(/\*\*/g, '^')         // Normalizar potencias
        .replace(/\*/g, '')            // Eliminar multiplicaciones explícitas
        .replace(/\^2/g, '²')          // Normalizar cuadrados
        .toLowerCase()
        .split('')
        .sort()
        .join('');
};

/**
 * Generar ejercicio aleatorio
 */
const generarEjercicio = async (req, res) => {
    try {
        const { tipo, nivel } = req.query;

        if (!tipo || !nivel) {
            return res.status(400).json({ error: 'Tipo y nivel son requeridos' });
        }

        let ejercicios;
        if (tipo === 'factorizacion') {
            ejercicios = ejerciciosFactorizacion[nivel];
        } else if (tipo === 'racionalizacion') {
            ejercicios = ejerciciosRacionalizacion[nivel];
        } else {
            return res.status(400).json({ error: 'Tipo inválido' });
        }

        if (!ejercicios || ejercicios.length === 0) {
            return res.status(404).json({ error: 'No hay ejercicios disponibles para este nivel' });
        }

        // Seleccionar ejercicio aleatorio
        const ejercicioAleatorio = ejercicios[Math.floor(Math.random() * ejercicios.length)];

        res.json({
            id: Math.random().toString(36).substr(2, 9), // ID temporal
            tipo,
            nivel,
            ...ejercicioAleatorio
        });
    } catch (error) {
        console.error('Error al generar ejercicio:', error);
        res.status(500).json({ error: error.message });
    }
};

/**
 * Validar respuesta del estudiante
 */
const validarRespuesta = async (req, res) => {
    try {
        const { ejercicio_id, tipo, nivel, expresion_original, respuesta } = req.body;
        const id_estudiante = req.user?.id || null;

        // Obtener el ejercicio correcto del banco
        let ejercicios;
        if (tipo === 'factorizacion') {
            ejercicios = ejerciciosFactorizacion[nivel];
        } else if (tipo === 'racionalizacion') {
            ejercicios = ejerciciosRacionalizacion[nivel];
        } else {
            return res.status(400).json({ error: 'Tipo inválido' });
        }

        const ejercicio = ejercicios.find(e => e.expresion_original === expresion_original);

        if (!ejercicio) {
            return res.status(404).json({ error: 'Ejercicio no encontrado' });
        }

        // Normalizar y comparar
        const respuestaNormalizada = normalizarExpresion(respuesta);
        const solucionNormalizada = normalizarExpresion(ejercicio.expresion_resultado);

        const correcto = respuestaNormalizada === solucionNormalizada;

        // Registrar intento (solo si hay usuario autenticado)
        if (id_estudiante) {
            await pool.query(
                'INSERT INTO intentos_algebra (id_estudiante, tipo_ejercicio, nivel, expresion_original, respuesta_dada, es_correcto) VALUES (?, ?, ?, ?, ?, ?)',
                [id_estudiante, tipo, nivel, expresion_original, respuesta, correcto]
            );
        }

        res.json({
            correcto,
            solucion: correcto ? null : ejercicio.expresion_resultado,
            pasos: correcto ? null : ejercicio.pasos_resolucion,
            puntos_ganados: correcto ? ejercicio.puntos : 0
        });
    } catch (error) {
        console.error('Error al validar respuesta:', error);
        res.status(500).json({ error: error.message });
    }
};

/**
 * Obtener estadísticas del estudiante (solo si está autenticado)
 */
const obtenerEstadisticas = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        const [stats] = await pool.query(
            `SELECT 
                tipo_ejercicio, 
                nivel,
                COUNT(*) as total_intentos,
                SUM(CASE WHEN es_correcto THEN 1 ELSE 0 END) as aciertos,
                ROUND(SUM(CASE WHEN es_correcto THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as porcentaje_acierto
            FROM intentos_algebra
            WHERE id_estudiante = ?
            GROUP BY tipo_ejercicio, nivel`,
            [req.user.id]
        );

        res.json(stats);
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    generarEjercicio,
    validarRespuesta,
    obtenerEstadisticas
};