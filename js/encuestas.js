document.addEventListener(
    "DOMContentLoaded",
    () => {

        inicializarEncuesta();

    }
);

// ======================================
// INICIALIZAR
// ======================================

async function inicializarEncuesta() {

    const formulario =
        document.getElementById(
            "survey-form"
        );

    if (!formulario) return;

    // Mostrar campo "Otro"

    const ocupacion =
        document.getElementById(
            "survey-occupation"
        );

    const wrapper =
        document.getElementById(
            "survey-occupation-other-wrapper"
        );

    ocupacion.addEventListener(
        "change",
        () => {

            wrapper.classList.toggle(
                "hidden",
                ocupacion.value !== "otro"
            );

        }
    );

    // Verificar si ya respondió

    await verificarEncuesta();

    // Enviar

    formulario.addEventListener(
        "submit",
        enviarEncuesta
    );

}
// ======================================
// VERIFICAR ENCUESTA
// ======================================

async function verificarEncuesta() {

    const token =
        localStorage.getItem("token");

    if (!token) return;

    try {

        const respuesta =
            await fetch(

                `${urlBase}/api/encuestas/verificar`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );

        const resultado =
            await respuesta.json();

        if (resultado.respondida) {

            const formulario =
                document.getElementById(
                    "survey-form"
                );

            formulario.innerHTML = `

            <div class="text-center py-10">

                <i class="fas fa-check-circle text-green-500 text-6xl mb-4"></i>

                <h3 class="text-2xl font-bold">

                    Ya respondiste esta encuesta

                </h3>

                <p class="mt-3 text-gray-600">

                    Gracias por ayudar a mejorar Stgo Joven.

                </p>

            </div>

            `;

        }

    }

    catch (error) {

        console.error(error);

    }

}

// ======================================
// ENVIAR
// ======================================

async function enviarEncuesta(e) {

    e.preventDefault();

    const token =
        localStorage.getItem("token");

    if (!token) {

        alert("Debes iniciar sesión.");

        return;

    }

    const intereses = [];

    document
        .querySelectorAll(
            "input[name='interests']:checked"
        )
        .forEach(c => {

            intereses.push(c.value);

        });

    const body = {

        rango_edad:
            document.getElementById(
                "survey-age"
            ).value,

        ocupacion:
            document.getElementById(
                "survey-occupation"
            ).value,

        ocupacion_otra:
            document.getElementById(
                "survey-occupation-other"
            ).value,

        intereses,

        calificacion:
            document.querySelector(
                "input[name='rating']:checked"
            )?.value,

        problema:
            document.getElementById(
                "survey-problem"
            ).value,

        sugerencia:
            document.getElementById(
                "survey-suggestion"
            ).value

    };

    try {

        const respuesta =
            await fetch(

                `${urlBase}/api/encuestas`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body:
                        JSON.stringify(body)

                }

            );

        const resultado =
            await respuesta.json();

        if (respuesta.ok) {

            alert(resultado.mensaje);

            verificarEncuesta();

        }

        else {

            alert(resultado.error);

        }

    }

    catch (error) {

        console.error(error);

        alert("Error del servidor");

    }

}