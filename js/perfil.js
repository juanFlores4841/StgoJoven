document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");

    // ======================================
    // NO LOGIN
    // ======================================

    if (!token) {

        window.location.href = "index.html";

        return;
    }

    try {

        // ======================================
        // OBTENER PERFIL
        // ======================================

        const respuesta = await fetch(
            `${urlBase}/api/usuarios/perfil`,
            {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const usuario = await respuesta.json();

        // ======================================
        // SI ERROR
        // ======================================

        if (!respuesta.ok) {

            alert(usuario.error);

            return;
        }

        // ======================================
        // RENDER PERFIL
        // ======================================

        document.getElementById("perfil-nombre").textContent =
            `${usuario.nombre} ${usuario.apellido}`;

        document.getElementById("perfil-email").textContent =
            usuario.email;

        document.getElementById("perfil-telefono").textContent =
            usuario.telefono || "No registrado";

        console.log(usuario.fecha_nacimiento);
        console.log(typeof usuario.fecha_nacimiento);

        document.getElementById("perfil-fecha").textContent =
            usuario.fecha_nacimiento
                ? new Date(usuario.fecha_nacimiento)
                    .toLocaleDateString("es-CL")
                : "No registrada";

        document.getElementById("perfil-rol").textContent =
            usuario.rol;

        // ======================================
        // CARGAR CURSOS
        // ======================================

        cargarCursos(token);

    } catch (error) {

        console.error(error);

        alert("Error cargando perfil");
    }
});

// ======================================
// CURSOS
// ======================================

const cargarCursos = async (token) => {

    try {

        const respuesta = await fetch(
            `${urlBase}/api/cursos/mis-cursos`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const cursos = await respuesta.json();

        const contenedor = document.getElementById("mis-cursos");

        if (!contenedor) return;

        contenedor.innerHTML = "";

        // ======================================
        // SIN CURSOS
        // ======================================

        if (cursos.length === 0) {

            contenedor.innerHTML = `
            
            <p class="text-gray-500">
                No tienes cursos inscritos
            </p>
            `;

            return;
        }

        // ======================================
        // RENDER CURSOS
        // ======================================

        cursos.forEach(curso => {

            contenedor.innerHTML += `

            <div class="bg-white shadow-lg rounded-2xl p-5 border">

                <h3 class="text-xl font-bold mb-2">
                    ${curso.nombre}
                </h3>

                <p class="text-gray-600 mb-3">
                    ${curso.descripcion}
                </p>

                <span class="text-sm text-primary-500 font-semibold">
                    ${curso.fecha}
                </span>

            </div>
            `;
        });

    } catch (error) {

        console.error(error);
    }
};