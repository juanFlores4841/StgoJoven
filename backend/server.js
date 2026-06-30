require("dotenv").config();
const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/admin");

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

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});