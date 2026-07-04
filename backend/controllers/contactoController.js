const pool = require("../db");

// ======================================
// GUARDAR MENSAJE
// ======================================

const enviarMensaje = async (req, res) => {

    try {

        const {

            nombre,
            correo,
            mensaje

        } = req.body;

        if (!nombre || !correo || !mensaje) {

            return res.status(400).json({

                error: "Todos los campos son obligatorios"

            });

        }

        await pool.query(

            `
            INSERT INTO mensajes_contacto
            (nombre, correo, mensaje)

            VALUES ($1,$2,$3)
            `,

            [

                nombre,
                correo,
                mensaje

            ]

        );

        res.status(201).json({

            mensaje: "Mensaje enviado correctamente"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error del servidor"

        });

    }

};

// ======================================
// OBTENER MENSAJES
// ======================================

const obtenerMensajes = async (req, res) => {

    try {

        const resultado = await pool.query(

            `
            SELECT *

            FROM mensajes_contacto

            ORDER BY fecha DESC
            `

        );

        res.json(resultado.rows);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error del servidor"

        });

    }

};

// ======================================
// MARCAR COMO LEÍDO
// ======================================

const marcarLeido = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(

            `
            UPDATE mensajes_contacto

            SET leido = true

            WHERE id = $1
            `,

            [id]

        );

        res.json({

            mensaje: "Mensaje actualizado"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error del servidor"

        });

    }

};

module.exports = {

    enviarMensaje,
    obtenerMensajes,
    marcarLeido

};