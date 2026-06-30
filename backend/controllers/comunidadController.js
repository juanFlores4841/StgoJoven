const pool = require("../db");

// ======================================
// CREAR ACTIVIDAD
// ======================================

const crearActividad = async (req, res) => {

    try {

        const {
            titulo,
            descripcion,
            tipo,
            fecha,
            hora,
            ubicacion,
            cupos,
            imagen,
            estado
        } = req.body;

        // Validación básica
        if (
            !titulo ||
            !descripcion ||
            !tipo ||
            !fecha ||
            !hora ||
            !ubicacion ||
            !cupos
        ) {
            return res.status(400).json({
                error: "Faltan campos obligatorios."
            });
        }

        const nuevaActividad = await pool.query(
            `
            INSERT INTO actividades_comunitarias
            (
                titulo,
                descripcion,
                tipo,
                fecha,
                hora,
                ubicacion,
                cupos,
                imagen,
                estado
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9
            )
            RETURNING *
            `,
            [
                titulo,
                descripcion,
                tipo,
                fecha,
                hora,
                ubicacion,
                cupos,
                imagen || null,
                estado || "Publicado"
            ]
        );

        res.status(201).json(
            nuevaActividad.rows[0]
        );

    } catch (error) {

        console.error("Error creando actividad:", error);

        res.status(500).json({
            error: "Error creando actividad."
        });

    }

};

// ======================================
// OBTENER ACTIVIDADES
// ======================================

const obtenerActividades = async (req, res) => {

    try {

        const actividades = await pool.query(
            `
            SELECT *
            FROM actividades_comunitarias
            ORDER BY
                fecha ASC,
                hora ASC
            `
        );

        res.json(
            actividades.rows
        );

    } catch (error) {

        console.error("Error obteniendo actividades:", error);

        res.status(500).json({
            error: "Error obteniendo actividades."
        });

    }

};

// ======================================
// ACTUALIZAR ACTIVIDAD
// ======================================

const actualizarActividad = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            titulo,
            descripcion,
            tipo,
            fecha,
            hora,
            ubicacion,
            cupos,
            imagen,
            estado
        } = req.body;

        const actividadActualizada =
            await pool.query(
                `
                UPDATE actividades_comunitarias
                SET
                    titulo = $1,
                    descripcion = $2,
                    tipo = $3,
                    fecha = $4,
                    hora = $5,
                    ubicacion = $6,
                    cupos = $7,
                    imagen = $8,
                    estado = $9
                WHERE id = $10
                RETURNING *
                `,
                [
                    titulo,
                    descripcion,
                    tipo,
                    fecha,
                    hora,
                    ubicacion,
                    cupos,
                    imagen,
                    estado,
                    id
                ]
            );

        if (actividadActualizada.rows.length === 0) {

            return res.status(404).json({
                error: "Actividad no encontrada."
            });

        }

        res.json(
            actividadActualizada.rows[0]
        );

    } catch (error) {

        console.error("Error actualizando actividad:", error);

        res.status(500).json({
            error: "Error actualizando actividad."
        });

    }

};

// ======================================
// ELIMINAR ACTIVIDAD
// ======================================

const eliminarActividad = async (req, res) => {

    try {

        const { id } = req.params;

        const actividadEliminada =
            await pool.query(
                `
                DELETE FROM actividades_comunitarias
                WHERE id = $1
                RETURNING *
                `,
                [id]
            );

        if (actividadEliminada.rows.length === 0) {

            return res.status(404).json({
                error: "Actividad no encontrada."
            });

        }

        res.json({
            mensaje: "Actividad eliminada correctamente."
        });

    } catch (error) {

        console.error("Error eliminando actividad:", error);

        res.status(500).json({
            error: "Error eliminando actividad."
        });

    }

};

module.exports = {
    crearActividad,
    obtenerActividades,
    actualizarActividad,
    eliminarActividad
};