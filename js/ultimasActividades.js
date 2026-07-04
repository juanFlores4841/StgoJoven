document.addEventListener("DOMContentLoaded", () => {

    cargarUltimasActividades();

});

async function cargarUltimasActividades() {

    try {

        const respuesta = await fetch(
            `${urlBase}/api/comunidad`
        );

        if (!respuesta.ok) {

            throw new Error(
                "No fue posible cargar las actividades."
            );

        }

        const actividades =
            await respuesta.json();

        const contenedor =
            document.getElementById(
                "contenedor-ultimas-actividades"
            );

        if (!contenedor) return;

        contenedor.innerHTML = "";

        actividades

            .sort((a, b) =>
                new Date(b.fecha) -
                new Date(a.fecha)
            )

            .slice(0, 6)

            .forEach(actividad => {

                contenedor.innerHTML += `

<div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">

    <img
        src="${actividad.imagen || 'img/no-image.jpg'}"
        class="w-full h-56 object-cover">

    <div class="p-6">

        <span class="text-sm text-blue-600 font-semibold">

            ${actividad.tipo}

        </span>

        <h3 class="text-xl font-bold mt-2">

            ${actividad.titulo}

        </h3>

        <p class="text-gray-600 mt-3 line-clamp-3">

            ${actividad.descripcion}

        </p>

        <div class="mt-5 space-y-2">

            <p>

                📅
                ${new Date(
                    actividad.fecha
                ).toLocaleDateString("es-CL")}

            </p>

            <p>

                📍
                ${actividad.ubicacion}

            </p>

        </div>

        <button
            class="mt-6 w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl">

            Ver detalles

        </button>

    </div>

</div>

`;

            });

    }

    catch (error) {

        console.error(error);

    }

}