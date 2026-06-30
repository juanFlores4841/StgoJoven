document.addEventListener('DOMContentLoaded', () => {

    // =====================================
    // ELEMENTOS AUTH
    // =====================================

    const authBackdrop = document.getElementById('auth-backdrop');
    const modalsContainer = document.getElementById('auth-modals');

    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');

    const openLoginBtn = document.getElementById('open-login-btn');

    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    const mainContent = document.getElementById('main-content-wrapper');

    // =====================================
    // ABRIR MODAL
    // =====================================

    const openAuthModal = (modal) => {

        if (!authBackdrop || !modalsContainer) return;

        authBackdrop.classList.remove('hidden');
        modalsContainer.classList.remove('hidden');

        setTimeout(() => {

            authBackdrop.classList.remove('opacity-0');
            modalsContainer.classList.remove('opacity-0');

        }, 10);

        if (loginModal) loginModal.classList.add('hidden');
        if (registerModal) registerModal.classList.add('hidden');

        modal.classList.remove('hidden');

        if (mainContent) {

            mainContent.classList.add(
                'blur-lg',
                'pointer-events-none'
            );
        }
    };

    // =====================================
    // CERRAR MODAL
    // =====================================

    const closeAuthModal = () => {

        if (!authBackdrop || !modalsContainer) return;

        authBackdrop.classList.add('opacity-0');
        modalsContainer.classList.add('opacity-0');

        setTimeout(() => {

            authBackdrop.classList.add('hidden');
            modalsContainer.classList.add('hidden');

            if (mainContent) {

                mainContent.classList.remove(
                    'blur-lg',
                    'pointer-events-none'
                );
            }

        }, 300);
    };

    // =====================================
    // NAVBAR USUARIO
    // =====================================

    const actualizarUIUsuario = (nombreUsuario) => {

        const navUsuario = document.getElementById('nav-usuario');

        const rol = localStorage.getItem("rol");

        if (!navUsuario) return;

        navUsuario.innerHTML = `

    <div class="flex items-center gap-4">

        <!-- PERFIL -->

        <a 
            href="perfil.html"
            class="flex items-center gap-2 text-primary-500 font-bold hover:text-primary-700 transition">

            <i class="fas fa-user"></i>

            <span>${nombreUsuario}</span>

        </a>

        <!-- PANEL ADMIN -->

        ${rol === "admin" || rol === "superadmin"
                ? `
            <a
                href="admin.html"
                class="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl transition">

                <i class="fas fa-user-shield"></i>

                <span>Panel Admin</span>

            </a>
            `
                : ""
            }

        <!-- LOGOUT -->

        <button
            id="btn-logout"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition">

            Salir

        </button>

    </div>
    `;

        // =====================================
        // LOGOUT
        // =====================================

        const btnLogout = document.getElementById('btn-logout');

        if (btnLogout) {

            btnLogout.addEventListener('click', () => {

                localStorage.removeItem('token');

                localStorage.removeItem('usuario');

                localStorage.removeItem('rol');

                window.location.reload();
            });
        }
    };

    // =====================================
    // LOGIN
    // =====================================

    if (loginForm) {

        loginForm.addEventListener('submit', async (e) => {

            e.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {

                const respuesta = await fetch(
                    `${urlBase}/api/usuarios/login`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    }
                );

                const resultado = await respuesta.json();

                if (respuesta.ok) {

                    // ===============================
                    // GUARDAR SESIÓN
                    // ===============================

                    localStorage.setItem(
                        'token',
                        resultado.token
                    );

                    localStorage.setItem(
                        'usuario',
                        resultado.usuario
                    );

                    localStorage.setItem(
                        'rol',
                        resultado.rol
                    );

                    // ===============================
                    // ACTUALIZAR NAVBAR
                    // ===============================

                    actualizarUIUsuario(resultado.usuario);

                    // ===============================
                    // CERRAR MODAL
                    // ===============================

                    closeAuthModal();

                } else {

                    alert(resultado.error || 'Error login');
                }

            } catch (error) {

                console.error(error);

                alert('Error de conexión con el servidor');
            }
        });
    }

    // =====================================
    // REGISTER
    // =====================================

    if (registerForm) {

        registerForm.addEventListener('submit', async (e) => {

            e.preventDefault();

            const nombre = document.getElementById('register-name').value;

            const apellido = document.getElementById('register-lastname').value;

            const email = document.getElementById('register-email').value;

            const telefono = document.getElementById('register-phone').value;

            const fecha_nacimiento = document.getElementById('register-birthdate').value;

            const password = document.getElementById('register-password').value;

            try {

                const respuesta = await fetch(
                    `${urlBase}/api/usuarios/registrar`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            nombre,
                            apellido,
                            email,
                            telefono,
                            fecha_nacimiento,
                            password
                        })
                    }
                );

                const resultado = await respuesta.json();

                if (respuesta.ok) {

                    alert('Cuenta creada correctamente');

                    // VOLVER LOGIN

                    openAuthModal(loginModal);

                } else {

                    alert(resultado.error || 'Error registro');
                }

            } catch (error) {

                console.error(error);

                alert('Error de conexión con el servidor');
            }
        });
    }

    // =====================================
    // ABRIR LOGIN
    // =====================================

    if (openLoginBtn) {

        openLoginBtn.addEventListener('click', () => {

            openAuthModal(loginModal);
        });
    }

    // =====================================
    // CAMBIAR A REGISTER
    // =====================================

    if (switchToRegister) {

        switchToRegister.addEventListener('click', () => {

            openAuthModal(registerModal);
        });
    }

    // =====================================
    // CAMBIAR A LOGIN
    // =====================================

    if (switchToLogin) {

        switchToLogin.addEventListener('click', () => {

            openAuthModal(loginModal);
        });
    }

    // =====================================
    // CLICK BACKDROP
    // =====================================

    if (authBackdrop) {

        authBackdrop.addEventListener('click', () => {

            closeAuthModal();
        });
    }

    // =====================================
    // RESTAURAR SESIÓN
    // =====================================

    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {

        actualizarUIUsuario(usuarioGuardado);
    }

});