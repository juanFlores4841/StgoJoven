const express = require("express");

const router = express.Router();

const verificarToken =
    require("../middleware/authMiddleware");

const {

    obtenerEstadisticasEncuestas

} = require("../controllers/estadisticasController");

router.get(
    "/encuestas",
    verificarToken,
    obtenerEstadisticasEncuestas
);

module.exports = router;
