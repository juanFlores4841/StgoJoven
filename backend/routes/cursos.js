const pool = require("../db");

const express = require("express");

const router = express.Router();

const verificarToken = require("../middleware/authMiddleware");

const {
    inscribirCurso,
    obtenerMisCursos
} = require("../controllers/cursosController");

// ======================================
// INSCRIBIR CURSO
// ======================================

router.post(
    "/inscribirse",
    verificarToken,
    inscribirCurso
);

// ======================================
// MIS CURSOS
// ======================================

router.get(
    "/mis-cursos",
    verificarToken,
    obtenerMisCursos
);

// ======================================
// OBTENER CURSOS PÚBLICOS
// ======================================

router.get("/", async (req, res) => {

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
});

module.exports = router;