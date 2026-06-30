const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

    try {

        const bearerHeader = req.headers["authorization"];

        if (!bearerHeader) {

            return res.status(401).json({
                error: "Token requerido"
            });
        }

        const token = bearerHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = decoded;

        next();

    } catch (error) {

        console.error(error);

        return res.status(401).json({
            error: "Token inválido"
        });
    }
};

module.exports = verificarToken;