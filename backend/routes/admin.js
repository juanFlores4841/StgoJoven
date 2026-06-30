const express = require("express");

const router = express.Router();

const verificarToken = require("../middleware/authMiddleware");

const verificarRol = require("../middleware/verificarRol");

const {
    crearCurso,
    obtenerCursos,
    eliminarCurso,
    editarCurso
} = require("../controllers/adminController");

// ======================================
// CREAR CURSO
// ======================================

router.post(
    "/cursos",
    verificarToken,
    verificarRol("admin", "superadmin"),
    crearCurso
);

// ======================================
// OBTENER CURSOS
// ======================================

router.get(
    "/cursos",
    verificarToken,
    verificarRol("admin", "superadmin"),
    obtenerCursos
);

// ======================================
// ELIMINAR CURSO
// ======================================

router.delete(
    "/cursos/:id",
    verificarToken,
    verificarRol("admin", "superadmin"),
    eliminarCurso
);

// ======================================
// EDITAR CURSO
// ======================================

router.put(
    "/cursos/:id",

    verificarToken,

    verificarRol(
        "admin",
        "superadmin"
    ),

    editarCurso
);

module.exports = router;