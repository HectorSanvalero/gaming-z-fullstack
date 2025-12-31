// Configuración de la API
const API_URL = 'http://localhost:3000/api';
let token = localStorage.getItem('token');
let usuario = JSON.parse(localStorage.getItem('usuario'));

// ========================================
// FUNCIONES DE AUTENTICACIÓN
// ========================================

// Verificar si el usuario está logueado
function isLoggedIn() {
    return token !== null && usuario !== null;
}

// Verificar si el usuario es admin
function isAdmin() {
    return isLoggedIn() && usuario.rol === 'admin';
}

// Actualizar menú según estado de login
function actualizarMenu() {
    const navUl = document.querySelector('nav ul');
    
    if (isLoggedIn()) {
        if (!document.getElementById('logout-btn')) {
            const logoutLi = document.createElement('li');
            logoutLi.innerHTML = `<a href="#" id="logout-btn">Cerrar Sesión (${usuario.nombre})</a>`;
            navUl.appendChild(logoutLi);
            document.getElementById('logout-btn').addEventListener('click', logout);
        }
        
        if (isAdmin() && !document.getElementById('admin-link')) {
            const adminLi = document.createElement('li');
            adminLi.innerHTML = `<a href="#admin" id="admin-link">Admin Panel</a>`;
            navUl.insertBefore(adminLi, navUl.children[1]);
        }
    }
}

// Logout
function logout(e) {
    if (e) e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    token = null;
    usuario = null;
    alert('Sesión cerrada correctamente');
    location.reload();
}

// ========================================
// FUNCIONES PARA PRODUCTOS
// ========================================

// Cargar productos desde la API
async function cargarProductos() {
    try {
        const response = await fetch(`${API_URL}/productos`);
        const productos = await response.json();
        mostrarProductosEnPagina(productos);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

// Mostrar productos en la página
function mostrarProductosEnPagina(productos) {
    const productosGrid = document.querySelector('.productos-grid');
    
    if (productos.length === 0) {
        productosGrid.innerHTML = '<p>No hay productos disponibles</p>';
        return;
    }
    
    productosGrid.innerHTML = '';
    
    productos.forEach(producto => {
        const productoCard = document.createElement('article');
        productoCard.className = 'producto-card';
        
        const imagenUrl = producto.imagen 
            ? `${API_URL.replace('/api', '')}${producto.imagen}`
            : 'images/default.jpg';
        
        productoCard.innerHTML = `
            <div class="producto-image">
                <img src="${imagenUrl}" alt="${producto.nombre}" onerror="this.src='images/default.jpg'">
            </div>
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion || 'Sin descripción'}</p>
                <p class="precio">${producto.precio.toFixed(2)}€</p>
                <button class="btn-comprar" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, ${producto.id})">
                    Añadir al carrito
                </button>
            </div>
        `;
        
        productosGrid.appendChild(productoCard);
    });
}

// ========================================
// FUNCIONES DEL CARRITO
// ========================================

let carrito = [];

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio, productoId) {
    const productoExistente = carrito.find(item => item.productoId === productoId);
    
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const producto = {
            nombre: nombre,
            precio: precio,
            productoId: productoId,
            cantidad: 1,
            id: Date.now()
        };
        carrito.push(producto);
    }
    
    guardarCarrito();
    mostrarCarrito();
    alert('¡' + nombre + ' añadido al carrito!');
}

function mostrarCarrito() {
    const carritoLista = document.getElementById('carrito-lista');
    
    if (carrito.length === 0) {
        carritoLista.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
        document.getElementById('total-precio').textContent = '0.00€';
        actualizarContadorCarrito();
        return;
    }
    
    let html = '';
    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        html += `
            <div class="carrito-item">
                <div class="carrito-item-info">
                    <h4>${producto.nombre}</h4>
                    <p>${producto.precio.toFixed(2)}€ x ${producto.cantidad} = ${subtotal.toFixed(2)}€</p>
                </div>
                <div class="carrito-item-controles">
                    <button class="btn-cantidad" onclick="cambiarCantidad(${producto.id}, -1)">-</button>
                    <span class="cantidad-display">${producto.cantidad}</span>
                    <button class="btn-cantidad" onclick="cambiarCantidad(${producto.id}, 1)">+</button>
                    <button class="btn-eliminar" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
                </div>
            </div>
        `;
    });
    
    carritoLista.innerHTML = html;
    calcularTotal();
    actualizarContadorCarrito();
}

function cambiarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === id);
    
    if (producto) {
        producto.cantidad += cambio;
        
        if (producto.cantidad <= 0) {
            eliminarDelCarrito(id);
            return;
        }
        
        guardarCarrito();
        mostrarCarrito();
    }
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    guardarCarrito();
    mostrarCarrito();
}

function calcularTotal() {
    const total = carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    document.getElementById('total-precio').textContent = total.toFixed(2) + '€';
}

function vaciarCarrito() {
    if (carrito.length === 0) {
        alert('El carrito ya está vacío');
        return;
    }
    
    if (confirm('¿Seguro que quieres vaciar el carrito?')) {
        carrito = [];
        guardarCarrito();
        mostrarCarrito();
    }
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    const total = carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    const totalProductos = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
    
    alert('¡Compra realizada!\n\nProductos: ' + totalProductos + '\nTotal: ' + total.toFixed(2) + '€\n\nGracias por tu compra en Gaming Z');
    
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
}

function actualizarContadorCarrito() {
    const totalProductos = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
    const contadorElemento = document.getElementById('carrito-contador');
    
    if (contadorElemento) {
        if (totalProductos > 0) {
            contadorElemento.textContent = totalProductos;
            contadorElemento.style.display = 'inline-block';
        } else {
            contadorElemento.style.display = 'none';
        }
    }
}

// ========================================
// CARRUSEL
// ========================================

let slideActual = 0;
let slides = [];
let indicadores = [];

function inicializarCarrusel() {
    slides = document.querySelectorAll('.carrusel-slide');
    indicadores = document.querySelectorAll('.indicador');
    
    if (slides.length > 0) {
        mostrarSlide(0);
    }
}

function mostrarSlide(n) {
    if (slides.length === 0) return;
    
    if (n >= slides.length) {
        slideActual = 0;
    } else if (n < 0) {
        slideActual = slides.length - 1;
    } else {
        slideActual = n;
    }
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicadores.forEach(indicador => indicador.classList.remove('active'));
    
    slides[slideActual].classList.add('active');
    if (indicadores[slideActual]) {
        indicadores[slideActual].classList.add('active');
    }
}

function cambiarSlide(direccion) {
    mostrarSlide(slideActual + direccion);
}

function irASlide(n) {
    mostrarSlide(n);
}

// ========================================
// ANIMACIONES AL HACER SCROLL
// ========================================

function inicializarAnimaciones() {
    const faders = document.querySelectorAll('.fade-in-section');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, appearOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

// ========================================
// BOTÓN VOLVER ARRIBA
// ========================================

function inicializarBotonVolverArriba() {
    const btnVolverArriba = document.getElementById('btn-volver-arriba');
    
    if (btnVolverArriba) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                btnVolverArriba.classList.add('visible');
            } else {
                btnVolverArriba.classList.remove('visible');
            }
        });
        
        btnVolverArriba.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos desde la API
    cargarProductos();
    
    // Cargar carrito guardado
    cargarCarrito();
    
    // Actualizar menú según login
    actualizarMenu();
    
    // Inicializar carrusel
    inicializarCarrusel();
    
    // Inicializar animaciones
    inicializarAnimaciones();
    
    // Inicializar botón volver arriba
    inicializarBotonVolverArriba();
    
    // Botón vaciar carrito
    const btnVaciar = document.querySelector('.btn-vaciar');
    if (btnVaciar) {
        btnVaciar.addEventListener('click', vaciarCarrito);
    }
    
    // Botón finalizar compra
    const btnFinalizar = document.querySelector('.btn-finalizar');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', finalizarCompra);
    }
});
// Validación del formulario de contacto
function validarFormulario(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // Validar campos vacíos
    if (nombre === '' || email === '' || mensaje === '') {
        alert('⚠️ Por favor, completa todos los campos');
        return false;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('⚠️ Por favor, introduce un email válido');
        return false;
    }
    
    // Validar longitud mínima del mensaje
    if (mensaje.length < 10) {
        alert('⚠️ El mensaje debe tener al menos 10 caracteres');
        return false;
    }
    
    // Si todo está correcto
    alert('✅ Mensaje enviado correctamente. Gracias por contactarnos!');
    document.querySelector('.contact-form').reset();
    return false;
}