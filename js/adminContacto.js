document.addEventListener("DOMContentLoaded", () => {

    cargarMensajes();

});

// ======================================
// CARGAR MENSAJES
// ======================================

async function cargarMensajes() {

    try {

        const token =
            localStorage.getItem("token");

        const respuesta =
            await fetch(

                `${urlBase}/api/contacto`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );

        const mensajes =
            await respuesta.json();

        const lista =
            document.getElementById(
                "lista-mensajes"
            );

        if (!lista) return;

        lista.innerHTML = "";

        if (mensajes.length === 0) {

            lista.innerHTML = `

                <div class="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-500">

                    No existen mensajes.

                </div>

            `;

            return;

        }

        mensajes.forEach(mensaje => {

            lista.innerHTML += `

            <div class="bg-white rounded-2xl shadow-lg p-6 border-l-8

                ${mensaje.leido

                    ? "border-green-500"

                    : "border-red-500"}

            ">

                <div class="flex justify-between items-center mb-4">

                    <div>

                        <h3 class="text-xl font-bold">

                            ${mensaje.nombre}

                        </h3>

                        <p class="text-blue-600">

                            ${mensaje.correo}

                        </p>

                    </div>

                    <div>

                        ${mensaje.leido

                    ?

                    `<span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                                Revisado

                            </span>`

                    :

                    `<span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">

                                Nuevo

                            </span>`

                }

                    </div>

                </div>

                <p class="text-gray-700 mb-5">

                    ${mensaje.mensaje}

                </p>

                <div class="flex justify-between items-center">

                    <small class="text-gray-500">

                        ${new Date(mensaje.fecha).toLocaleString("es-CL")}

                    </small>

                    <div class="flex gap-3">

                        <a

                            href="mailto:${mensaje.correo}"

                            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition">

                            📧 Responder

                        </a>

                        ${!mensaje.leido

                    ?

                    `<button

                                onclick="marcarLeido(${mensaje.id})"

                                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition">

                                ✓ Marcar leído

                            </button>`

                    :

                    ""

                }

                    </div>

                </div>

            </div>

            `;

        });

    }

    catch (error) {

        console.error(error);

    }

}
// ======================================
// MARCAR COMO LEÍDO
// ======================================

async function marcarLeido(id) {

    try {

        const token =
            localStorage.getItem("token");

        const respuesta =
            await fetch(

                `${urlBase}/api/contacto/${id}`,

                {

                    method: "PUT",

                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );

        const resultado =
            await respuesta.json();

        if (!respuesta.ok) {

            alert(resultado.error);

            return;

        }

        cargarMensajes();

    }

    catch (error) {

        console.error(error);

        alert("Error del servidor");

    }

}