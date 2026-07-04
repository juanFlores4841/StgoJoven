const pool = require("../db");

// ======================================
// OBTENER ESTADÍSTICAS
// ======================================

const obtenerEstadisticasEncuestas = async (req, res) => {

    try {

        // Total encuestas
        const total = await pool.query(`
            SELECT COUNT(*)::int AS total
            FROM encuestas
        `);

        // Promedio calificación
        const promedio = await pool.query(`
            SELECT
                ROUND(AVG(calificacion),1) AS promedio
            FROM encuestas
        `);

        // Rangos de edad
        const edades = await pool.query(`
            SELECT
                rango_edad,
                COUNT(*)::int AS cantidad
            FROM encuestas
            GROUP BY rango_edad
            ORDER BY cantidad DESC
        `);

        // Ocupaciones
        const ocupaciones = await pool.query(`
            SELECT
                ocupacion,
                COUNT(*)::int AS cantidad
            FROM encuestas
            GROUP BY ocupacion
            ORDER BY cantidad DESC
        `);

        // Intereses
        const intereses = await pool.query(`
            SELECT
                interes,
                COUNT(*)::int AS cantidad
            FROM encuesta_intereses
            GROUP BY interes
            ORDER BY cantidad DESC
        `);

        // Últimas sugerencias
        const sugerencias = await pool.query(`
            SELECT
                sugerencia,
                fecha
            FROM encuestas
            WHERE sugerencia IS NOT NULL
              AND sugerencia <> ''
            ORDER BY fecha DESC
            LIMIT 10
        `);

        res.json({

            total:
                total.rows[0].total,

            promedio:
                promedio.rows[0].promedio || 0,

            edades:
                edades.rows,

            ocupaciones:
                ocupaciones.rows,

            intereses:
                intereses.rows,

            sugerencias:
                sugerencias.rows

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            error:"Error obteniendo estadísticas."

        });

    }

};

module.exports = {

    obtenerEstadisticasEncuestas

};

