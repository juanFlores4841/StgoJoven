const pool = require("../db");

// ======================================
// GUARDAR ENCUESTA
// ======================================

const guardarEncuesta = async (req, res) => {

    try {

        const usuario_id = req.usuario.id;

        const {
            rango_edad,
            ocupacion,
            ocupacion_otra,
            intereses,
            calificacion,
            problema,
            sugerencia
        } = req.body;

        // Verificar si ya respondió

        const existe = await pool.query(
            `
            SELECT id
            FROM encuestas
            WHERE usuario_id = $1
            `,
            [usuario_id]
        );

        if (existe.rows.length > 0) {

            return res.status(400).json({
                error: "Ya respondiste esta encuesta."
            });

        }

        // Guardar encuesta

        const encuesta = await pool.query(
            `
            INSERT INTO encuestas
            (
                usuario_id,
                rango_edad,
                ocupacion,
                ocupacion_otra,
                calificacion,
                problema,
                sugerencia
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7)
            RETURNING id
            `,
            [
                usuario_id,
                rango_edad,
                ocupacion,
                ocupacion_otra,
                calificacion,
                problema,
                sugerencia
            ]
        );

        const encuesta_id = encuesta.rows[0].id;

        // Guardar intereses

        if (Array.isArray(intereses)) {

            for (const interes of intereses) {

                await pool.query(
                    `
                    INSERT INTO encuesta_intereses
                    (
                        encuesta_id,
                        interes
                    )
                    VALUES
                    ($1,$2)
                    `,
                    [
                        encuesta_id,
                        interes
                    ]
                );

            }

        }

        res.status(201).json({

            mensaje: "Encuesta enviada correctamente."

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error guardando encuesta."

        });

    }

};

// ======================================
// VERIFICAR SI YA RESPONDIÓ
// ======================================

const verificarEncuesta = async (req, res) => {

    try {

        const usuario_id = req.usuario.id;

        const resultado = await pool.query(
            `
            SELECT id
            FROM encuestas
            WHERE usuario_id = $1
            `,
            [usuario_id]
        );

        res.json({

            respondida: resultado.rows.length > 0

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error verificando encuesta."

        });

    }

};

// ======================================
// OBTENER TODAS
// ======================================

const obtenerEncuestas = async (req, res) => {

    try {

        const resultado = await pool.query(
            `
            SELECT *
            FROM encuestas
            ORDER BY fecha DESC
            `
        );

        res.json(resultado.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error obteniendo encuestas."

        });

    }

};

module.exports = {

    guardarEncuesta,
    verificarEncuesta,
    obtenerEncuestas

};