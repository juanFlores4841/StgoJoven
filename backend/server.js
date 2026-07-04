require("dotenv").config();
const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/admin");
const contactoRoutes =
    require("./routes/contactoRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/cursos", require("./routes/cursos"));
app.use("/api/admin", adminRoutes);
app.use(
    "/api/comunidad",
    require("./routes/comunidad")
);
app.use(
    "/api/encuestas",
    require("./routes/encuestas")
);
app.use(
    "/api/estadisticas",
    require("./routes/estadisticas")
);
app.use(
    "/api/contacto",
    contactoRoutes
);
app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});