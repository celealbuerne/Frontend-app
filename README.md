
## Contenidos

- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Scripts Disponibles](#scripts-disponibles)

## Funcionalidades

La aplicación tiene cuatro tipos de usuario:

| Rol | Qué puede hacer |
| --- | --- |
| Visitante | Ver publicaciones y aeropuertos, registrarse e iniciar sesión |
| Cliente | Solicitar reservas y consultar Mis Reservas |
| Proveedor | Gestionar Mi Flota y crear publicaciones de aeronaves |
| Administrador | Crear, editar y eliminar aeropuertos y localidades |

## Tecnologías

| Tecnología | Versión |
| --- | --- |
| PNPM | 11.27.0 |
| Node.js | 24 |
| TypeScript | 6.0.3 |
| React | 19.2.8 |
| Vite | 8.2.1 |
| React Router | 7.18.4 |
| React Day Picker | 10.0.2 |
| CSS Modules | Integrado en Vite |
| ESLint | 10.8.1 |
| Prettier | 3.9.9 |

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/celealbuerne/Frontend-app.git
cd Frontend-app
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Creá un archivo `.env` en la raíz del proyecto (ver [Configuración](#configuración)).

### 4. Ejecutar el proyecto

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`.


## Ejecución

### Modo desarrollo

```bash
pnpm dev
```

Inicia el servidor de desarrollo con hot-reload en `http://localhost:5173`.

### Modo producción

```bash
pnpm build
pnpm preview
```

## Scripts Disponibles

| Script | Comando | Descripción |
| --- | --- | --- |
| dev | `pnpm dev` | Inicia el servidor de desarrollo con hot-reload |
| build | `pnpm build` | Compila TypeScript y genera el build de producción |
| preview | `pnpm preview` | Previsualiza el build de producción localmente |
| lint | `pnpm lint` | Ejecuta ESLint para verificar la calidad del código |
| format | `pnpm format` | Formatea el código con Prettier |# AeroLux - Frontend
