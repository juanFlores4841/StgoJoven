const verificarRol = (...rolesPermitidos) => {

    return (req, res, next) => {

        try {

            const rolUsuario = req.usuario.rol;

            if (!rolesPermitidos.includes(rolUsuario)) {

                return res.status(403).json({
                    error: "No tienes permisos"
                });
            }

            next();

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error: "Error servidor"
            });
        }
    };
};

module.exports = verificarRol;