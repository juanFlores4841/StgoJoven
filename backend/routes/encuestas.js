const express = require("express");

const router = express.Router();

const verificarToken =
    require("../middleware/authMiddleware");

const {

    guardarEncuesta,
    verificarEncuesta,
    obtenerEncuestas

} = require("../controllers/encuestaController");

// ======================================
// GUARDAR
// ======================================

router.post(
    "/",
    verificarToken,
    guardarEncuesta
);

// ======================================
// VERIFICAR
// ======================================

router.get(
    "/verificar",
    verificarToken,
    verificarEncuesta
);

// ======================================
// LISTAR
// (Más adelante restringiremos a admin)
// ======================================

router.get(
    "/",
    verificarToken,
    obtenerEncuestas
);

module.exports = router;