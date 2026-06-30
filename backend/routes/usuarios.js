const express = require("express");
const router = express.Router();

const {
    registrarUsuario,
    loginUsuario,
    obtenerPerfil
} = require("../controllers/usuariosController");

const verificarToken = require("../middleware/authMiddleware");

router.post("/registrar", registrarUsuario);
router.post("/login", loginUsuario);

router.get(
    "/perfil",
    verificarToken,
    obtenerPerfil
);

module.exports = router;