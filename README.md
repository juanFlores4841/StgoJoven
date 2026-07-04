# Plataforma Web Stgo Joven

## Descripción

Stgo Joven es una plataforma web desarrollada como proyecto universitario, orientada a la gestión de programas juveniles de la Ilustre Municipalidad de Santiago.

La plataforma permite a los jóvenes acceder a cursos, talleres y actividades comunitarias, responder encuestas, enviar consultas mediante un formulario de contacto y administrar su perfil.

Además, incorpora un panel administrativo desde el cual es posible gestionar cursos, actividades, talleres, mensajes de contacto y visualizar estadísticas de participación.

---

# Stack Tecnológico

## Frontend

- HTML5
- CSS3
- TailwindCSS
- JavaScript (ES6)

## Backend

- Node.js
- Express.js

## Base de Datos

- PostgreSQL

## Autenticación

- JWT (JSON Web Token)

## Librerías

- bcrypt
- jsonwebtoken
- dotenv
- multer
- Chart.js

---

# Requisitos

- Node.js 18 o superior
- PostgreSQL
- npm

---

# Instalación

Clonar el repositorio

```bash
git clone https://github.com/juanFlores4841/StgoJoven.git
```

Entrar al proyecto

```bash
cd StgoJoven
```

Instalar dependencias

```bash
npm install
```

---

# Configuración

Crear un archivo

```
.env
```

con las siguientes variables

```env
PORT=3000

DB_HOST=localhost

DB_PORT=5432

DB_USER=postgres  (nombre de tu usuario postgres)

DB_PASSWORD=tu_password  (tu pass de usuario de la bbdd)

DB_NAME=stgojoven

JWT_SECRET=tu_clave_secreta
```

---

# Ejecución

Modo desarrollo

```bash
npm run dev
```

Modo producción

```bash
npm start
```

El proyecto quedará disponible en

```
http://localhost:3000
```

---

# Funcionalidades

## Usuarios

- Registro
- Inicio de sesión
- Perfil
- Inscripción a cursos
- Visualización de cursos inscritos

## Cursos

- Listado
- Inscripción
- Control de cupos

## Conexión Comunitaria

- Actividades
- Talleres
- Imágenes

## Encuestas

- Registro de respuestas
- Estadísticas
- Gráficos

## Contacto

- Envío de mensajes
- Bandeja de mensajes para administrador

## Administrador

- Gestión de cursos
- Gestión de actividades
- Gestión de talleres
- Estadísticas
- Gestión de mensajes

---

# Autores

Juan Flores - Braulio Jara - Pedro Llanca - Gustavo Machuca

Ingeniería en Informática
