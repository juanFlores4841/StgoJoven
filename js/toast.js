// ======================================
// TOAST NOTIFICATION
// ======================================

const mostrarToast = (
    mensaje,
    tipo = "success"
) => {

    // ======================================
    // CONTENEDOR
    // ======================================

    let contenedor =
        document.getElementById(
            "toast-container"
        );

    if (!contenedor) {

        contenedor =
            document.createElement("div");

        contenedor.id =
            "toast-container";

        contenedor.className =
            `
            fixed top-5 right-5
            z-[9999]
            flex flex-col gap-4
            `;

        document.body.appendChild(
            contenedor
        );
    }

    // ======================================
    // COLORES
    // ======================================

    let color = "";

    let icono = "";

    switch (tipo) {

        case "error":

            color =
                "bg-red-500";

            icono =
                "fa-circle-xmark";

            break;

        case "warning":

            color =
                "bg-yellow-500";

            icono =
                "fa-triangle-exclamation";

            break;

        default:

            color =
                "bg-green-500";

            icono =
                "fa-circle-check";
    }

    // ======================================
    // TOAST
    // ======================================

    const toast =
        document.createElement("div");

    toast.className =
        `
        ${color}
        text-white
        px-6
        py-4
        rounded-2xl
        shadow-2xl
        flex items-center gap-3
        min-w-[300px]
        animate-toast
        `;

    toast.innerHTML = `

        <i class="fas ${icono} text-xl"></i>

        <span class="font-medium">
            ${mensaje}
        </span>
    `;

    contenedor.appendChild(toast);

    // ======================================
    // ELIMINAR
    // ======================================

    setTimeout(() => {

        toast.classList.add(
            "opacity-0",
            "translate-x-10"
        );

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);
};