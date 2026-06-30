document.addEventListener("DOMContentLoaded", () => {

    verificarAdmin();

    cargarCursos();

    cargarActividades();

    const formActividad =
        document.getElementById(
            "form-actividad"
        );

    console.log(
        document.getElementById(
            "form-actividad"
        )
    );
    if (formActividad) {

        formActividad.addEventListener(
            "submit",
            crearActividad
        );
    }

    // ======================================
    // FORM CREAR CURSO
    // ======================================

    const formCurso =
        document.getElementById("form-curso");

    if (formCurso) {

        formCurso.addEventListener(
            "submit",
            crearCurso
        );

    }
});

// ======================================
// VERIFICAR ADMIN
// ======================================

const verificarAdmin = () => {

    const rol = localStorage.getItem("rol");

    if (
        rol !== "admin" &&
        rol !== "superadmin"
    ) {

        alert("No autorizado");

        window.location.href = "index.html";
    }
};

// ======================================
// CARGAR CURSOS
// ======================================

const cargarCursos = async () => {

    try {

        const token =
            localStorage.getItem("token");

        const respuesta = await fetch(
            `${urlBase}/api/admin/cursos`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        const cursos =
            await respuesta.json();

        console.log("Respuesta cursos:", cursos);

        if (!respuesta.ok) {

            throw new Error(
                cursos.error || "Error obteniendo cursos"
            );
        }

        if (!Array.isArray(cursos)) {

            throw new Error(
                "La respuesta no es un array"
            );
        }

        const lista =
            document.getElementById(
                "lista-cursos"
            );

        lista.innerHTML = "";

        cursos.forEach(curso => {

            lista.innerHTML += `

            <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

                <h3 class="text-2xl font-bold mb-3">
                    ${curso.nombre}
                </h3>

                <p class="text-gray-600 mb-4">
                    ${curso.descripcion}
                </p>

                <p class="text-sm text-primary-500 mb-2">
    Fecha:
${new Date(curso.fecha)
                    .toLocaleDateString("es-CL")
                }
</p>

<p class="text-sm text-green-600 font-semibold mb-5">
    Cupos: ${curso.cupos}
</p>

                <div class="flex gap-3">

    <button
        onclick='abrirEditar(
            ${JSON.stringify(curso)}
        )'

        class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition">

        Editar

    </button>

    <button
        onclick="eliminarCurso(${curso.id})"

        class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition">

        Eliminar

    </button>

</div>

            </div>
            `;
        });

    } catch (error) {

        console.error("Error cargando cursos:", error);

        alert(
            error.message ||
            "Error cargando cursos."
        );
    }
};

// ======================================
// CREAR CURSO
// ======================================

const crearCurso = async (e) => {

    e.preventDefault();

    try {

        const token =
            localStorage.getItem("token");

        const nombre =
            document.getElementById("nombre").value;

        const descripcion =
            document.getElementById("descripcion").value;

        const fecha =
            document.getElementById("fecha").value;

        const cupos =
            document.getElementById("cupos").value;

        const respuesta = await fetch(
            `${urlBase}/api/admin/cursos`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${token}`
                },

                body: JSON.stringify({
                    nombre,
                    descripcion,
                    fecha,
                    cupos
                })
            }
        );

        const resultado =
            await respuesta.json();

        if (respuesta.ok) {

            alert("Curso creado");

            document
                .getElementById("form-curso")
                .reset();

            cargarCursos();

        } else {

            alert(resultado.error);
        }

    } catch (error) {

        console.error(error);

        alert("Error servidor");
    }
};

// ======================================
// ELIMINAR CURSO
// ======================================

const eliminarCurso = async (id) => {

    const confirmar =
        confirm(
            "¿Deseas eliminar este curso?\nEsta acción no se puede deshacer."
        );

    if (!confirmar) return;

    try {

        const token =
            localStorage.getItem("token");

        const respuesta = await fetch(
            `${urlBase}/api/admin/cursos/${id}`,
            {
                method: "DELETE",

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        const resultado =
            await respuesta.json();

        if (respuesta.ok) {

            alert("Curso eliminado");

            cargarCursos();

        } else {

            alert(resultado.error);
        }

    } catch (error) {

        console.error(error);

        alert("Error servidor");
    }
};

// ======================================
// EDITAR CURSO
// ======================================

const abrirEditar = async (curso) => {

    const nombre =
        prompt(
            "Nuevo nombre",
            curso.nombre
        );

    if (!nombre) return;

    const descripcion =
        prompt(
            "Nueva descripción",
            curso.descripcion
        );

    if (!descripcion) return;

    const fecha =
        prompt(
            "Nueva fecha",
            curso.fecha.split("T")[0]
        );

    if (!fecha) return;

    const cupos =
        prompt(
            "Nuevos cupos",
            curso.cupos
        );

    if (!cupos) return;

    try {

        const token =
            localStorage.getItem("token");

        const respuesta =
            await fetch(
                `${urlBase}/api/admin/cursos/${curso.id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        nombre,
                        descripcion,
                        fecha,
                        cupos
                    })
                }
            );

        const resultado =
            await respuesta.json();

        if (respuesta.ok) {

            mostrarToast(
                "Curso actualizado"
            );

            cargarCursos();

        } else {

            mostrarToast(
                resultado.error,
                "error"
            );
        }

    } catch (error) {

        console.error(error);

        mostrarToast(
            "Error servidor",
            "error"
        );
    }

};

// ======================================
// CREAR ACTIVIDAD
// ======================================

const crearActividad = async (e) => {

    e.preventDefault();

    try {

        const token =
            localStorage.getItem("token");

        const titulo =
            document.getElementById(
                "actividad-titulo"
            ).value;

        const descripcion =
            document.getElementById(
                "actividad-descripcion"
            ).value;

        const tipo =
            document.getElementById(
                "actividad-tipo"
            ).value;

        const fecha =
            document.getElementById(
                "actividad-fecha"
            ).value;

        const hora =
            document.getElementById(
                "actividad-hora"
            ).value;

        const ubicacion =
            document.getElementById(
                "actividad-ubicacion"
            ).value;

        const cupos =
            document.getElementById(
                "actividad-cupos"
            ).value;

        const imagen =
            document.getElementById(
                "actividad-imagen"
            ).value;

        const estado =
            document.getElementById(
                "actividad-estado"
            ).value;

        const respuesta =
            await fetch(
                `${urlBase}/api/comunidad`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({

                        titulo,
                        descripcion,
                        tipo,
                        fecha,
                        hora,
                        ubicacion,
                        cupos,
                        imagen,
                        estado

                    })
                }
            );

        const resultado =
            await respuesta.json();

        if (respuesta.ok) {

           alert(
    "Actividad creada correctamente"
);

            document
                .getElementById(
                    "form-actividad"
                )
                .reset();

            cargarActividades();

        } else {

            mostrarToast(
                resultado.error ||
                "Error creando actividad",
                "error"
            );

        }

    } catch (error) {

        console.error(error);

        mostrarToast(
            "Error del servidor",
            "error"
        );

    }

};
// ======================================
// CARGAR ACTIVIDADES
// ======================================

const cargarActividades = async () => {

    try {

        const respuesta =
            await fetch(
                `${urlBase}/api/comunidad`
            );

        if (!respuesta.ok) {

            throw new Error(
                "Error obteniendo actividades"
            );

        }

        const actividades =
            await respuesta.json();

        const lista =
            document.getElementById(
                "lista-actividades"
            );

        if (!lista) return;

        lista.innerHTML = "";

        actividades.forEach(
            actividad => {

                lista.innerHTML += `

                <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6">

                    ${actividad.imagen
                        ?
                        `
                        <img
                            src="${actividad.imagen}"
                            class="w-full h-48 object-cover rounded-xl mb-4">
                        `
                        :
                        ""
                    }

                    <h3 class="text-xl font-bold mb-2">

                        ${actividad.titulo}

                    </h3>

                    <p class="text-gray-600 mb-4">

                        ${actividad.descripcion}

                    </p>

                    <p class="text-blue-600 font-semibold">

                        ${actividad.tipo}

                    </p>

                    <p class="text-sm mt-2">

                        📅 ${new Date(
                        actividad.fecha
                    ).toLocaleDateString("es-CL")}

                    </p>

                    <p class="text-sm">

                        🕒 ${actividad.hora || "Sin hora"}

                    </p>

                    <p class="text-sm">

                        📍 ${actividad.ubicacion}

                    </p>

                    <p class="text-sm">

                        👥 Cupos:
                        ${actividad.cupos}

                    </p>

                    <p class="text-sm mt-2">

                        Estado:

                        <span class="font-semibold text-green-600">

                            ${actividad.estado}

                        </span>

                    </p>

                    <div class="flex gap-3 mt-5">

                        <button

                            onclick='editarActividad(
                                ${JSON.stringify(actividad)}
                            )'

                            class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl">

                            Editar

                        </button>

                        <button

                            onclick="eliminarActividad(${actividad.id})"

                            class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl">

                            Eliminar

                        </button>

                    </div>

                </div>

                `;

            }

        );

    }

    catch (error) {

        console.error(error);

        mostrarToast(
            "Error cargando actividades",
            "error"
        );

    }

};
// ======================================
// ELIMINAR ACTIVIDAD
// ======================================

const eliminarActividad = async (id) => {

    const confirmar = confirm(

        "¿Deseas eliminar esta actividad?\nEsta acción no se puede deshacer."

    );

    if (!confirmar) return;

    try {

        const token =
            localStorage.getItem("token");

        const respuesta =
            await fetch(

                `${urlBase}/api/comunidad/${id}`,

                {

                    method: "DELETE",

                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );

        const resultado =
            await respuesta.json();

        if (respuesta.ok) {

            mostrarToast(

                resultado.mensaje ||
                "Actividad eliminada"

            );

            cargarActividades();

        }

        else {

            mostrarToast(

                resultado.error,

                "error"

            );

        }

    }

    catch (error) {

        console.error(error);

        mostrarToast(

            "Error del servidor",

            "error"

        );

    }

};

// ======================================
// EDITAR ACTIVIDAD
// ======================================

const editarActividad = async (actividad) => {

    const titulo =
        prompt(
            "Nuevo título",
            actividad.titulo
        );

    if (titulo === null) return;

    const descripcion =
        prompt(
            "Nueva descripción",
            actividad.descripcion
        );

    if (descripcion === null) return;

    const tipo =
        prompt(
            "Tipo",
            actividad.tipo
        );

    if (tipo === null) return;

    const fecha =
        prompt(
            "Fecha",
            actividad.fecha.split("T")[0]
        );

    if (fecha === null) return;

    const hora =
        prompt(
            "Hora",
            actividad.hora || ""
        );

    if (hora === null) return;

    const ubicacion =
        prompt(
            "Ubicación",
            actividad.ubicacion
        );

    if (ubicacion === null) return;

    const cupos =
        prompt(
            "Cupos",
            actividad.cupos
        );

    if (cupos === null) return;

    const imagen =
        prompt(
            "URL Imagen",
            actividad.imagen || ""
        );

    if (imagen === null) return;

    const estado =
        prompt(
            "Estado",
            actividad.estado || "Publicado"
        );

    if (estado === null) return;

    try {

        const token =
            localStorage.getItem("token");

        const respuesta =
            await fetch(

                `${urlBase}/api/comunidad/${actividad.id}`,

                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        titulo,
                        descripcion,
                        tipo,
                        fecha,
                        hora,
                        ubicacion,
                        cupos,
                        imagen,
                        estado

                    })

                }

            );

        const resultado =
            await respuesta.json();

        if (respuesta.ok) {

            mostrarToast(
                "Actividad actualizada"
            );

            cargarActividades();

        }

        else {

            mostrarToast(

                resultado.error,

                "error"

            );

        }

    }

    catch (error) {

        console.error(error);

        mostrarToast(

            "Error del servidor",

            "error"

        );

    }

};
