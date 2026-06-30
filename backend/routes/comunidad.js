const express = require("express");

const router = express.Router();

const verificarToken =
    require("../middleware/authMiddleware");

const {
    crearActividad,
    obtenerActividades,
    eliminarActividad
} = require("../controllers/comunidadController");

// ======================================
// CREAR
// ======================================

router.post(
    "/",
    verificarToken,
    crearActividad
);

// ======================================
// LISTAR
// ======================================

router.get(
    "/",
    obtenerActividades
);

// ======================================
// ELIMINAR
// ======================================

router.delete(
    "/:id",
    verificarToken,
    eliminarActividad
);

module.exports = router;