document.addEventListener("DOMContentLoaded", () => {

    const formulario =
        document.getElementById("contact-form");

    if (!formulario) return;

    formulario.addEventListener(
        "submit",
        enviarMensaje
    );

});

// ======================================
// ENVIAR MENSAJE
// ======================================

async function enviarMensaje(e) {

    e.preventDefault();

    const nombre =
        document.getElementById("contact-name").value.trim();

    const correo =
        document.getElementById("contact-email").value.trim();

    const mensaje =
        document.getElementById("contact-message").value.trim();

    const estado =
        document.getElementById("contact-status");

    if (!nombre || !correo || !mensaje) {

        mostrarEstado(
            "Todos los campos son obligatorios.",
            false
        );

        return;

    }

    try {

        const respuesta = await fetch(

            `${urlBase}/api/contacto`,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    nombre,
                    correo,
                    mensaje

                })

            }

        );

        const resultado =
            await respuesta.json();

        if (respuesta.ok) {

            mostrarEstado(

                "Mensaje enviado correctamente. Nos pondremos en contacto contigo a la brevedad.",

                true

            );

            document
                .getElementById("contact-form")
                .reset();

        }

        else {

            mostrarEstado(

                resultado.error,

                false

            );

        }

    }

    catch (error) {

        console.error(error);

        mostrarEstado(

            "Error del servidor.",

            false

        );

    }

}

// ======================================
// MENSAJE VISUAL
// ======================================

function mostrarEstado(texto, correcto) {

    const estado =
        document.getElementById("contact-status");

    estado.classList.remove("hidden");

    estado.textContent = texto;

    estado.className =
        correcto

            ?

            "mb-4 p-4 rounded-lg bg-green-100 text-green-700"

            :

            "mb-4 p-4 rounded-lg bg-red-100 text-red-700";

}