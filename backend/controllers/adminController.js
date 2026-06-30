const pool = require("../db");

// ======================================
// CREAR CURSO
// ======================================

const crearCurso = async (req, res) => {

    try {

        const {
            nombre,
            descripcion,
            fecha,
            cupos
        } = req.body;

        const nuevoCurso = await pool.query(
            `
            INSERT INTO cursos
            (
    nombre,
    descripcion,
    fecha,
    cupos
)
VALUES ($1, $2, $3, $4)

            RETURNING *
            `,
            [
                nombre,
                descripcion,
                fecha,
                cupos
            ]
        );

        res.status(201).json({
            mensaje: "Curso creado",
            curso: nuevoCurso.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error servidor"
        });
    }
};

// ======================================
// OBTENER CURSOS
// ======================================

const obtenerCursos = async (req, res) => {

    try {

        const cursos = await pool.query(
            `
            SELECT *
            FROM cursos

            ORDER BY fecha ASC
            `
        );

        res.json(cursos.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error servidor"
        });
    }
};

// ======================================
// ELIMINAR CURSO
// ======================================

const eliminarCurso = async (req, res) => {

    const { id } = req.params;

    try {

        await pool.query(
            'DELETE FROM inscripciones WHERE curso_id = $1',
            [id]
        );

        await pool.query(
            'DELETE FROM cursos WHERE id = $1',
            [id]
        );

        res.json({
            mensaje: 'Curso eliminado correctamente'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Error al eliminar curso'
        });
    }
};

// ======================================
// EDITAR CURSO
// ======================================

const editarCurso = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nombre,
            descripcion,
            fecha,
            cupos
        } = req.body;

        const cursoActualizado =
            await pool.query(
                `
                UPDATE cursos

                SET
                    nombre = $1,
                    descripcion = $2,
                    fecha = $3,
                    cupos = $4

                WHERE id = $5

                RETURNING *
                `,
                [
                    nombre,
                    descripcion,
                    fecha,
                    cupos,
                    id
                ]
            );

        res.json({
            mensaje: "Curso actualizado",
            curso: cursoActualizado.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error servidor"
        });
    }
};

module.exports = {
    crearCurso,
    obtenerCursos,
    eliminarCurso,
    editarCurso
};