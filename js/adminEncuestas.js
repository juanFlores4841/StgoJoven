// ======================================
// VARIABLES GLOBALES
// ======================================

let graficoEdades = null;
let graficoOcupaciones = null;
let graficoIntereses = null;

// ======================================
// NOMBRES LEGIBLES
// ======================================

const nombresIntereses = {

    salud_mental: "Salud Mental",

    educacion: "Apoyo Educativo",

    empleo: "Empleo y Capacitación",

    cultura: "Arte, Cultura y Recreación",

    seguridad: "Seguridad y Espacios Públicos",

    medioambiente: "Medioambiente y Reciclaje"

};

// ======================================
// INICIAR
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    cargarEstadisticasEncuestas();

});

// ======================================
// CARGAR ESTADÍSTICAS
// ======================================

async function cargarEstadisticasEncuestas() {

    try {

        const token = localStorage.getItem("token");

        const respuesta = await fetch(

            `${urlBase}/api/estadisticas/encuestas`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const datos = await respuesta.json();

        console.log("Datos estadísticas:", datos);

        if (!respuesta.ok) {

            throw new Error(datos.error);

        }

        //==================================
        // TARJETAS SUPERIORES
        //==================================

        document.getElementById("estadistica-total").textContent =
            datos.total;

        document.getElementById("estadistica-rating").textContent =
            datos.promedio;

        document.getElementById("estadistica-participacion").textContent =
            "100%";

        if (datos.intereses.length > 0) {

            document.getElementById(
                "estadistica-interes"
            ).textContent =

                nombresIntereses[
                datos.intereses[0].interes
                ] ||

                datos.intereses[0].interes;

        }

        //==================================
        // LISTA EDADES
        //==================================

        const listaEdades =
            document.getElementById(
                "estadistica-edades"
            );

        if (listaEdades) {

            listaEdades.innerHTML = "";

            datos.edades.forEach(item => {

                listaEdades.innerHTML += `

                    <div class="flex justify-between border-b py-2">

                        <span>${item.rango_edad}</span>

                        <strong>${item.cantidad}</strong>

                    </div>

                `;

            });

        }

        //==================================
        // LISTA OCUPACIONES
        //==================================

        const listaOcupaciones =
            document.getElementById(
                "estadistica-ocupaciones"
            );

        if (listaOcupaciones) {

            listaOcupaciones.innerHTML = "";

            datos.ocupaciones.forEach(item => {

                listaOcupaciones.innerHTML += `

                    <div class="flex justify-between border-b py-2">

                        <span>${item.ocupacion}</span>

                        <strong>${item.cantidad}</strong>

                    </div>

                `;

            });

        }

        //==================================
        // LISTA INTERESES
        //==================================

        const listaIntereses =
            document.getElementById(
                "estadistica-intereses"
            );

        if (listaIntereses) {

            listaIntereses.innerHTML = "";

            datos.intereses.forEach(item => {

                listaIntereses.innerHTML += `

                    <div class="flex justify-between border-b py-2">

                        <span>

                            ${nombresIntereses[item.interes] || item.interes}

                        </span>

                        <strong>

                            ${item.cantidad}

                        </strong>

                    </div>

                `;

            });

        }

        //==================================
        // SUGERENCIAS
        //==================================

        const sugerencias =
            document.getElementById(
                "estadistica-sugerencias"
            );

        if (sugerencias) {

            sugerencias.innerHTML = "";

            if (datos.sugerencias.length === 0) {

                sugerencias.innerHTML = `

                    <p class="text-gray-500">

                        No existen sugerencias.

                    </p>

                `;

            }

            else {

                datos.sugerencias.forEach(item => {

                    sugerencias.innerHTML += `

                        <div class="bg-gray-50 rounded-xl p-4 border">

                            <p class="text-gray-700">

                                ${item.sugerencia}

                            </p>

                        </div>

                    `;

                });

            }

        }

        //==================================
        // GRAFICOS
        //==================================

        crearGraficoEdades(datos);

        crearGraficoOcupaciones(datos);

        crearGraficoIntereses(datos);

    }

    catch (error) {

        console.error(
            "Error cargando estadísticas:",
            error
        );

    }

}
// ======================================
// GRÁFICO EDADES
// ======================================

function crearGraficoEdades(datos) {

    const canvas =
        document.getElementById("graficoEdades");

    if (!canvas) return;

    if (graficoEdades) {

        graficoEdades.destroy();

    }

    graficoEdades = new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: datos.edades.map(
                e => e.rango_edad
            ),

            datasets: [{

                label: "Encuestas",

                data: datos.edades.map(
                    e => e.cantidad
                ),

                backgroundColor: [

                    "#3B82F6",
                    "#10B981",
                    "#F59E0B",
                    "#EF4444",
                    "#8B5CF6",
                    "#14B8A6"

                ],

                borderWidth: 2

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}

// ======================================
// GRÁFICO OCUPACIONES
// ======================================

function crearGraficoOcupaciones(datos) {

    const canvas =
        document.getElementById(
            "graficoOcupaciones"
        );

    if (!canvas) return;

    if (graficoOcupaciones) {

        graficoOcupaciones.destroy();

    }

    graficoOcupaciones = new Chart(canvas, {

        type: "bar",

        data: {

            labels: datos.ocupaciones.map(
                o => o.ocupacion
            ),

            datasets: [{

                label: "Personas",

                data: datos.ocupaciones.map(
                    o => o.cantidad
                ),

                backgroundColor: "#3B82F6",

                borderRadius: 8

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        precision: 0

                    }

                }

            }

        }

    });

}

// ======================================
// GRÁFICO INTERESES
// ======================================

function crearGraficoIntereses(datos) {

    const canvas =
        document.getElementById(
            "graficoIntereses"
        );

    if (!canvas) return;

    if (graficoIntereses) {

        graficoIntereses.destroy();

    }

    graficoIntereses = new Chart(canvas, {

        type: "bar",

        data: {

            labels: datos.intereses.map(

                i =>
                    nombresIntereses[
                    i.interes
                    ] || i.interes

            ),

            datasets: [{

                label: "Votos",

                data: datos.intereses.map(
                    i => i.cantidad
                ),

                backgroundColor: "#10B981",

                borderRadius: 8

            }]

        },

        options: {

            responsive: true,

            indexAxis: "y",

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                x: {

                    beginAtZero: true,

                    ticks: {

                        precision: 0

                    }

                }

            }

        }

    });

}

