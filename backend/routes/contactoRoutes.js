const express = require("express");

const router = express.Router();

const verificarToken = require("../middleware/authMiddleware");

const {

    enviarMensaje,
    obtenerMensajes,
    marcarLeido

} = require("../controllers/contactoController");

// ======================================
// ENVIAR MENSAJE (PÚBLICO)
// ======================================

router.post(

    "/",

    enviarMensaje

);

// ======================================
// OBTENER MENSAJES (ADMIN)
// ======================================

router.get(

    "/",

    verificarToken,

    obtenerMensajes

);

// ======================================
// MARCAR COMO LEÍDO
// ======================================

router.put(

    "/:id",

    verificarToken,

    marcarLeido

);

module.exports = router;