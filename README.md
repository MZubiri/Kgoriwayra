# Cabalgatas Kgoriwayra — Plataforma Web

Plataforma web moderna, bilingüe (ES/EN), autoadministrable y orientada a la captación de reservas para el emprendimiento turístico **Cabalgatas Kgoriwayra**, ubicado en Yanque, Cañón y Valle del Colca, Arequipa, Perú.

---

## 🛠 Stack Tecnológico

- **Frontend:** Angular 19+ (Standalone Components, SCSS Modular, SSR/Prerender)
- **Backend:** ASP.NET Core 9 (Clean Architecture, Minimal APIs/Controllers, MediatR/CQRS patterns)
- **ORM & BD:** Entity Framework Core 9 + Pomelo MySQL sobre MySQL 8.0
- **Seguridad:** JWT (Access + Refresh Token), BCrypt, Rate Limiting, CORS estricto
- **Contenedores & Despliegue:** Docker, Docker Compose y Coolify (VPS con proxy inverso y SSL automatizado)

---

## 📁 Estructura del Monorepo

```
Cabalgatas/
├── backend/                  # Solución ASP.NET Core 9 (Clean Architecture)
│   ├── src/
│   │   ├── Kgoriwayra.Domain/          # Entidades puras, Value Objects, Enums
│   │   ├── Kgoriwayra.Application/     # Casos de uso, DTOs, Interfaces, Mappings
│   │   ├── Kgoriwayra.Infrastructure/  # EF Core, Repositorios, Servicios externos (Email, Storage)
│   │   └── Kgoriwayra.WebApi/          # Endpoints, Middlewares, Filtros, Swagger
│   └── Kgoriwayra.sln
├── frontend/                 # Aplicación Angular Standalone
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/         # Guards, Interceptors, Servicios Singleton, Modelos
│   │   │   ├── shared/       # Componentes reusables, Directivas, Pipes
│   │   │   ├── layout/       # Header, Footer, Layouts público y administrativo
│   │   │   ├── features/     # Módulos lazy-loaded (Home, Tours, Booking, Admin, etc.)
│   │   └── styles/           # Sistema de diseño SCSS (Variables, Mixins, Componentes)
├── docker/                   # Definición de contenedores y proxies
│   ├── api.Dockerfile
│   ├── frontend.Dockerfile
│   └── nginx.conf            # Nginx con compresión, seguridad y redirecciones 301
├── docker-compose.yml        # Configuración para despliegue en Coolify / Producción
├── docker-compose.dev.yml    # Entorno de desarrollo local (MySQL local)
├── .env.example              # Plantilla de variables de entorno
└── README.md
```

---

## 🚀 Inicio Rápido (Desarrollo Local)

### 1. Requisitos Previos
- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+ o 22+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 2. Configuración de Base de Datos Local
Levanta la base de datos MySQL en Docker:
```bash
docker compose -f docker-compose.dev.yml up -d
```
Esto iniciará MySQL 8.0 en el puerto `localhost:3306`.

### 3. Configuración del Backend
```bash
cd backend
dotnet restore
dotnet run --project src/Kgoriwayra.WebApi
```
La API estará disponible en `http://localhost:8080` (Swagger en `http://localhost:8080/swagger`).

### 4. Configuración del Frontend
```bash
cd frontend
npm install
npm start
```
El sitio web estará disponible en `http://localhost:4200`.

---

## 🐳 Despliegue con Docker / Coolify

Para construir y levantar el stack completo en producción o staging:
```bash
cp .env.example .env
# Configurar contraseñas y secretos en .env
docker compose up -d --build
```
Coolify detectará el `docker-compose.yml` automáticamente y aprovisionará los certificados SSL vía Traefik/Let's Encrypt.
