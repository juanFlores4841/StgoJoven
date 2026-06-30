const pool = require("../db");

// ======================================
// INSCRIBIR CURSO
// ======================================

const inscribirCurso = async (req, res) => {

    try {

        const usuario_id = req.usuario.id;

        const { curso_id } = req.body;

        // ======================================
        // VALIDAR DUPLICADO
        // ======================================

        const existe = await pool.query(
            `
            SELECT * FROM inscripciones
            WHERE usuario_id = $1
            AND curso_id = $2
            `,
            [usuario_id, curso_id]
        );

        if (existe.rows.length > 0) {

            return res.status(400).json({
                error: "Ya estás inscrito en este curso"
            });
        }

        // ======================================
        // INSERTAR INSCRIPCIÓN
        // ======================================

        await pool.query(
            `
            INSERT INTO inscripciones
            (usuario_id, curso_id)
            VALUES ($1, $2)
            `,
            [usuario_id, curso_id]
        );

        // ======================================
        // DESCONTAR CUPO
        // ======================================

        await pool.query(
            `
    UPDATE cursos
    SET cupos = cupos - 1
    WHERE id = $1
    `,
            [curso_id]
        );

        res.status(201).json({
            mensaje: "Inscripción realizada"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error servidor"
        }); inscribirCurso
    }

    // ======================================
    // VALIDAR CUPOS
    // ======================================

    const cursoDB = await pool.query(
        `
    SELECT *
    FROM cursos
    WHERE id = $1
    `,
        [curso_id]
    );

    if (cursoDB.rows.length === 0) {

        return res.status(404).json({
            error: "Curso no encontrado"
        });
    }

    const curso = cursoDB.rows[0];

    if (curso.cupos <= 0) {

        return res.status(400).json({
            error: "No hay cupos disponibles"
        });
    }
};

// ======================================
// OBTENER MIS CURSOS
// ======================================

const obtenerMisCursos = async (req, res) => {

    try {

        const usuario_id = req.usuario.id;

        const cursos = await pool.query(
            `
            SELECT
                cursos.id,
                cursos.nombre,
                cursos.descripcion,
                cursos.fecha

            FROM inscripciones

            JOIN cursos
            ON inscripciones.curso_id = cursos.id

            WHERE inscripciones.usuario_id = $1

            ORDER BY cursos.fecha ASC
            `,
            [usuario_id]
        );

        res.json(cursos.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error servidor"
        });
    }
};

module.exports = {
    inscribirCurso,
    obtenerMisCursos
};