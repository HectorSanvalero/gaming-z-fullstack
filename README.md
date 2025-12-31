# Gaming Z - Tienda Online de Periféricos Gaming

Aplicación web fullstack con backend API REST y frontend dinámico para la venta de periféricos gaming.

## 🚀 Tecnologías Utilizadas

### Backend
- **Node.js** + Express
- **SQLite** (Base de datos)
- **JWT** (Autenticación)
- **Multer** (Subida de imágenes)
- **Express Validator** (Validación de datos)
- **Bcrypt** (Encriptación de contraseñas)

### Frontend
- **HTML5** + **CSS3** + **JavaScript**
- Diseño responsive con estética cyberpunk gaming
- Consumo de API REST con Fetch
- Sistema de carrito con localStorage

## 📋 Características

### Funcionalidades Principales
- ✅ CRUD completo de Productos
- ✅ CRUD completo de Categorías
- ✅ Sistema de autenticación (Login/Registro)
- ✅ Subida y gestión de imágenes
- ✅ Validación de datos en backend y frontend
- ✅ Relaciones entre entidades (Productos ↔ Categorías)
- ✅ Carrito de compras funcional

### API REST
- Arquitectura RESTful
- Autenticación mediante JWT
- Rutas protegidas con middleware
- Validación con express-validator

## 🛠️ Instalación y Uso

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn
- Git

### 1. Clonar el repositorio
```bash
git clone https://github.com/HectorSanvalero/gaming-z-fullstack.git
cd gaming-z-fullstack
```

### 2. Instalar dependencias del backend
```bash
cd backend
npm install
```

### 3. Iniciar el servidor backend
```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:3000`

### 4. Iniciar el frontend
Opción 1: Usar Live Server (extensión de VS Code)
- Abrir `frontend/index.html` con Live Server

Opción 2: Usar http-server
```bash
cd frontend
npx http-server -p 8080
```

El frontend estará disponible en: `http://localhost:8080`

## 📁 Estructura del Proyecto
```
gaming-z-fullstack/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Lógica de negocio
│   │   ├── models/           # Modelos de datos
│   │   ├── routes/           # Rutas de la API
│   │   ├── middleware/       # Middlewares (auth, upload)
│   │   ├── database/         # Configuración de BD
│   │   └── server.js         # Punto de entrada
│   ├── uploads/              # Imágenes de productos
│   ├── database.sqlite       # Base de datos SQLite
│   ├── package.json
│   └── .env
├── frontend/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   ├── images/
│   └── index.html
└── README.md
```

## 🔑 Credenciales de Administrador

Para acceder como administrador y gestionar productos:

- **Email:** admin@gamingz.com
- **Password:** admin123

## 📡 Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil (requiere auth)

### Productos
- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/:id` - Obtener producto por ID
- `POST /api/productos` - Crear producto (requiere admin)
- `PUT /api/productos/:id` - Actualizar producto (requiere admin)
- `DELETE /api/productos/:id` - Eliminar producto (requiere admin)

### Categorías
- `GET /api/categorias` - Obtener todas las categorías
- `GET /api/categorias/:id` - Obtener categoría por ID
- `GET /api/categorias/:id/productos` - Productos de una categoría
- `POST /api/categorias` - Crear categoría (requiere admin)
- `PUT /api/categorias/:id` - Actualizar categoría (requiere admin)
- `DELETE /api/categorias/:id` - Eliminar categoría (requiere admin)

## 👨‍💻 Autor

**Héctor González Sánchez**
- GitHub: [@HectorSanvalero](https://github.com/HectorSanvalero)

## 📝 Licencia

Este proyecto fue desarrollado como actividad de aprendizaje para el curso de Digitalización Aplicada a los Sectores Productivos - Centro San Valero.