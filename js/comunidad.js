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

        if (!respuesta.ok) {

            throw new Error(
                "No se pudieron obtener las actividades."
            );

        }

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
                    .toLocaleDateString("es-CL");

            const html = `

            <div class="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">

                <img
                    src="${item.imagen || 'img/no-image.jpg'}"
                    alt="${item.titulo}"
                    class="w-full h-52 object-cover">

                <div class="p-5">

                    <span class="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full mb-3">

                        ${item.tipo}

                    </span>

                    <h4 class="text-xl font-bold text-gray-800 mb-2">

                        ${item.titulo}

                    </h4>

                    <p class="text-gray-600 text-sm mb-4">

                        ${item.descripcion}

                    </p>

                    <div class="space-y-2 text-sm text-gray-600">

                        <p>

                            <i class="fas fa-calendar-alt text-primary-500 mr-2"></i>

                            ${fecha}

                        </p>

                        <p>

                            <i class="fas fa-map-marker-alt text-red-500 mr-2"></i>

                            ${item.ubicacion}

                        </p>

                        <p>

                            <i class="fas fa-users text-green-500 mr-2"></i>

                            Cupos disponibles:
                            ${item.cupos}

                        </p>

                    </div>

                    <button
                        class="mt-5 w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-xl transition">

                        Ver detalles

                    </button>

                </div>

            </div>

            `;

            if (item.tipo === "Actividad") {

                listaActividades.innerHTML += html;

            }

            if (item.tipo === "Taller") {

                listaTalleres.innerHTML += html;

            }

        });

    }

    catch (error) {

        console.error(
            "Error cargando conexión comunitaria:",
            error
        );

    }

}