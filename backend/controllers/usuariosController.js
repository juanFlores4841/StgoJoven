const pool = require("../db");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

// ======================================
// REGISTRAR USUARIO
// ======================================

const registrarUsuario = async (req, res) => {

    try {

        const {
            nombre,
            apellido,
            email,
            telefono,
            fecha_nacimiento,
            password
        } = req.body;

        // ======================================
        // VALIDAR EMAIL EXISTENTE
        // ======================================

        const usuarioExiste = await pool.query(
            `
            SELECT * FROM usuarios
            WHERE email = $1
            `,
            [email]
        );

        if (usuarioExiste.rows.length > 0) {

            return res.status(400).json({
                error: "El correo ya está registrado"
            });
        }

        // ======================================
        // ENCRIPTAR PASSWORD
        // ======================================

        const saltRounds = 10;

        const passwordHash = await bcrypt.hash(
            password,
            saltRounds
        );

        // ======================================
        // INSERTAR USUARIO
        // ======================================

        const nuevoUsuario = await pool.query(
            `
            INSERT INTO usuarios
            (
                nombre,
                apellido,
                email,
                telefono,
                fecha_nacimiento,
                password
            )
            VALUES
            ($1, $2, $3, $4, $5, $6)

            RETURNING
                id,
                nombre,
                email,
                rol
            `,
            [
                nombre,
                apellido,
                email,
                telefono,
                fecha_nacimiento,
                passwordHash
            ]
        );

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: nuevoUsuario.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error servidor"
        });
    }
};

// ======================================
// LOGIN USUARIO
// ======================================

const loginUsuario = async (req, res) => {

    try {

        const { email, password } = req.body;

        // ======================================
        // BUSCAR USUARIO
        // ======================================

        const usuarioDB = await pool.query(
            `
            SELECT * FROM usuarios
            WHERE email = $1
            `,
            [email]
        );

        if (usuarioDB.rows.length === 0) {

            return res.status(400).json({
                error: "Usuario no encontrado"
            });
        }

        const usuario = usuarioDB.rows[0];

        // ======================================
        // VALIDAR PASSWORD
        // ======================================

        const passwordValida = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordValida) {

            return res.status(400).json({
                error: "Contraseña incorrecta"
            });
        }

        // ======================================
        // CREAR TOKEN
        // ======================================

        const token = jwt.sign(
            {
                id: usuario.id,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // ======================================
        // RESPUESTA LOGIN
        // ======================================

        res.json({
            token,
            usuario: usuario.nombre,
            rol: usuario.rol
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error servidor"
        });
    }
};

// ======================================
// OBTENER PERFIL
// ======================================

const obtenerPerfil = async (req, res) => {

    try {

        const usuarioID = req.usuario.id;

        const usuarioDB = await pool.query(
            `
            SELECT
                id,
                nombre,
                apellido,
                email,
                telefono,
                fecha_nacimiento,
                rol
            FROM usuarios
            WHERE id = $1
            `,
            [usuarioID]
        );

        if (usuarioDB.rows.length === 0) {

            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        res.json(usuarioDB.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error servidor"
        });
    }
};

// ======================================
// EXPORTAR
// ======================================

module.exports = {
    registrarUsuario,
    loginUsuario,
    obtenerPerfil
};