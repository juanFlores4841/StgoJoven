// ======================================
// CARGAR CONEXIÓN COMUNITARIA
// ======================================
console.log("comunidad.js cargado");
document.addEventListener(
    "DOMContentLoaded",
    cargarConexionComunitaria
);

async function cargarConexionComunitaria() {

    try {

        const respuesta =
            await fetch(
                `${urlBase}/api/comunidad`
            );

        const actividades =
            await respuesta.json();

        const listaActividades =
            document.getElementById(
                "lista-actividades-comunidad"
            );

        const listaTalleres =
            document.getElementById(
                "lista-talleres-comunidad"
            );

        if (
            !listaActividades ||
            !listaTalleres
        ) {
            return;
        }

        listaActividades.innerHTML = "";
        listaTalleres.innerHTML = "";

        actividades.forEach(item => {

            const fecha =
                new Date(item.fecha)
                    .toLocaleDateString(
                        "es-CL"
                    );

            const html = `

            <li class="card flex items-start gap-4">

                <i class="fas fa-calendar-check text-2xl text-secondary-500"></i>

                <div>

                    <h4 class="font-bold text-lg">

                        ${item.titulo}

                    </h4>

                    <p class="text-gray-600 text-sm">

                        ${item.descripcion}

                    </p>

                    <p class="text-gray-500 text-xs mt-2">

                        📅 ${fecha}
                    </p>

                    <p class="text-gray-500 text-xs">

                        📍 ${item.ubicacion}
                    </p>

                    <p class="text-green-600 text-xs font-semibold">

                        Cupos: ${item.cupos}
                    </p>

                </div>

            </li>
            `;

            if (
                item.tipo ===
                "Actividad"
            ) {

                listaActividades
                    .innerHTML += html;
            }

            if (
                item.tipo ===
                "Taller"
            ) {

                listaTalleres
                    .innerHTML += html;
            }

        });

    } catch (error) {

        console.error(
            "Error cargando conexión comunitaria:",
            error
        );
    }
}