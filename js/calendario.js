document.addEventListener("DOMContentLoaded", () => {

    cargarCalendario();

});

async function cargarCalendario() {

    try {

        const respuesta =
            await fetch(
                "http://localhost:3000/api/comunidad"
            );

        const actividades =
            await respuesta.json();

        const contenedor =
            document.getElementById(
                "event-list"
            );

        if (!contenedor) return;

        contenedor.innerHTML = "";

        actividades.forEach(actividad => {

            let colorClase = `
                bg-blue-100
                text-blue-800
            `;

            if (actividad.tipo === "taller") {

                colorClase = `
                    bg-yellow-100
                    text-yellow-800
                `;
            }

            if (actividad.tipo === "curso") {

                colorClase = `
                    bg-green-100
                    text-green-800
                `;
            }

            if (actividad.tipo === "campana") {

                colorClase = `
                    bg-red-100
                    text-red-800
                `;
            }

            const fecha =
                new Date(
                    actividad.fecha
                ).toLocaleDateString(
                    "es-CL"
                );

            contenedor.innerHTML += `
                <div
                    class="event-card card"
                    data-type="${actividad.tipo}"
                >

                    <div
                        class="
                            px-3 py-1
                            ${colorClase}
                            rounded-full
                            text-sm
                            font-semibold
                            inline-block
                            mb-3
                        "
                    >
                        ${actividad.tipo}
                    </div>

                    <h4
                        class="text-xl font-semibold mb-2"
                    >
                        ${actividad.titulo}
                    </h4>

                    <p class="text-gray-600">

                        <i class="fas fa-calendar-day mr-2"></i>

                        ${fecha}

                    </p>

                    <p class="mt-3 text-sm">

                        ${actividad.descripcion}

                    </p>

                    <p class="mt-2 text-sm">

                        📍 ${actividad.ubicacion}

                    </p>

                    <p class="mt-2 text-sm">

                        👥 ${actividad.cupos} cupos

                    </p>

                </div>
            `;
        });

    } catch (error) {

        console.error(
            "Error cargando calendario:",
            error
        );
    }
}