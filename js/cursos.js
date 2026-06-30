document.addEventListener("DOMContentLoaded", () => {

    cargarCursos();
});

// ======================================
// CARGAR CURSOS
// ======================================

const cargarCursos = async () => {

    try {

        const respuesta = await fetch(
            `${urlBase}/api/cursos`
        );

        const cursos = await respuesta.json();

        const contenedor =
            document.getElementById(
                "contenedor-cursos"
            );

        if (!contenedor) return;

        contenedor.innerHTML = "";

        cursos.forEach(curso => {

            // ======================================
            // ESTADO CUPOS
            // ======================================

            let estadoCupos = "";
            let colorEstado = "";
            let botonDisabled = "";

            if (curso.cupos <= 0) {

                estadoCupos = "Sin cupos";

                colorEstado = "text-red-500";

                botonDisabled = "disabled";

            } else if (curso.cupos <= 5) {

                estadoCupos = `Últimos ${curso.cupos} cupos`;

                colorEstado = "text-yellow-500";

            } else {

                estadoCupos = `${curso.cupos} cupos disponibles`;

                colorEstado = "text-green-600";
            }

            contenedor.innerHTML += `

            <div class="bg-white rounded-3xl shadow-xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-gray-100">

                <!-- HEADER -->

                <div class="bg-gradient-to-r from-primary-500 to-primary-700 p-6 text-white">

                    <div class="flex justify-between items-center">

                        <h3 class="text-2xl font-bold">
                            ${curso.nombre}
                        </h3>

                        <i class="fas fa-graduation-cap text-3xl opacity-70"></i>

                    </div>

                    <p class="mt-3 opacity-90">
                        ${curso.fecha}
                    </p>

                </div>

                <!-- BODY -->

                <div class="p-6">

                    <p class="text-gray-600 leading-relaxed mb-6 min-h-[90px]">
                        ${curso.descripcion}
                    </p>

                    <div class="flex justify-between items-center mb-6">

                        <span class="${colorEstado} font-bold text-sm">

                            ${estadoCupos}

                        </span>

                    </div>

                    <button
                        ${botonDisabled}
                        class="btn-inscribirse w-full py-3 rounded-2xl font-semibold transition-all duration-300
                        
                        ${curso.cupos <= 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-primary-500 hover:bg-primary-600 text-white hover:scale-105'
                        }"

                        data-id="${curso.id}">

                        ${
                            curso.cupos <= 0
                            ? 'Agotado'
                            : 'Inscribirse'
                        }

                    </button>

                </div>

            </div>
            `;
        });

        activarInscripciones();

    } catch (error) {

        console.error(error);

        alert("Error cargando cursos");
    }
};

// ======================================
// INSCRIPCIONES
// ======================================

const activarInscripciones = () => {

    const botones =
        document.querySelectorAll(
            ".btn-inscribirse"
        );

    botones.forEach(btn => {

        btn.addEventListener(
            "click",
            async () => {

                const token =
                    localStorage.getItem("token");

                if (!token) {

                    alert(
                        "Debes iniciar sesión"
                    );

                    return;
                }

                const curso_id =
                    btn.dataset.id;

                try {

                    const respuesta =
                        await fetch(
                            `${urlBase}/api/cursos/inscribirse`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    Authorization:
                                        `Bearer ${token}`
                                },

                                body: JSON.stringify({
                                    curso_id
                                })
                            }
                        );

                    const resultado =
                        await respuesta.json();

                    if (respuesta.ok) {

                        alert(
                            "Inscripción realizada"
                        );

                        cargarCursos();

                    } else {

                        alert(resultado.error);
                    }

                } catch (error) {

                    console.error(error);

                    alert("Error servidor");
                }
            }
        );
    });
};