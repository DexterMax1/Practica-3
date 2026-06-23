// ===================================
// carritos.js
// Lógica del carrito de compras con persistencia
// ===================================

// Importar la base de datos de productos para poder buscarlos por ID
import { obtenerProductos } from "./productos.js";
import { formatearPrecio } from "./utilidades.js"; // <-- Utilidad de formateo

// =========================================================================
// ESTADO INTERNO DEL CARRITO (Cargado desde el almacenamiento del navegador)
// =========================================================================
let carrito = JSON.parse(localStorage.getItem("novaTech_carrito")) || [];

// Al cargar el archivo, si estamos en la vista de la tabla del carrito, se dibuja de inmediato
document.addEventListener("DOMContentLoaded", () => {
    actualizarCarritoUI();
});

/**
 * Guarda el estado actual del arreglo 'carrito' en el disco local
 */
function guardarEnLocalStorage() {
    localStorage.setItem("novaTech_carrito", JSON.stringify(carrito));
}

/**
 * Agregar producto (con cantidad)
 */
function agregarAlCarrito(id) {
    const producto = obtenerProductos().find(p => p.id === id);

    if (!producto) return;

    const existente = carrito.find(item => item.id === id);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    guardarEnLocalStorage(); // <-- Guarda el producto añadido
    actualizarCarritoUI();

    // 🔔 ANIMACIÓN
    mostrarToast();
}

/**
 * Eliminar producto completo
 */
function eliminar(index) {
    carrito.splice(index, 1);
    guardarEnLocalStorage(); // <-- Guarda los cambios después de borrar
    actualizarCarritoUI();
}

/**
 * Aumentar cantidad
 */
function aumentarCantidad(index) {
    carrito[index].cantidad++;
    guardarEnLocalStorage(); // <-- Guarda la nueva cantidad
    actualizarCarritoUI();
}

/**
 * Disminuir cantidad
 */
function disminuirCantidad(index) {
    carrito[index].cantidad--;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    guardarEnLocalStorage(); // <-- Guarda la nueva cantidad o eliminación
    actualizarCarritoUI();
}

/**
 * Vaciar carrito
 */
function vaciarCarrito() {
    carrito = [];
    guardarEnLocalStorage(); // <-- Limpia el almacenamiento local
    actualizarCarritoUI();
}

/**
 * Finalizar compra
 */
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío 🛒");
        return;
    }
    alert("¡Compra realizada con éxito! 🎉 Gracias por elegir NovaTech Market.");
    carrito = [];
    guardarEnLocalStorage(); // <-- Limpia el almacenamiento local
    actualizarCarritoUI();
}

/**
 * Calcular total
 */
function total() {
    return carrito.reduce((sum, item) => {
        return sum + (item.precio * item.cantidad);
    }, 0);
}

/**
 * Mostrar notificación (Toast)
 */
function mostrarToast() {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 1500);
}

/**
 * Renderizar la interfaz del carrito en la tabla HTML
 */
function actualizarCarritoUI() {
    const tbody = document.getElementById("carrito-body");
    const totalHTML = document.getElementById("total-carrito");

    // Si la tabla no existe en la página actual (por ejemplo en index.html), finaliza pacíficamente
    if (!tbody) return;

    tbody.innerHTML = "";

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.nombre}</td>
            <td>
                <button onclick="disminuirCantidad(${index})">➖</button>
                <strong>${item.cantidad}</strong>
                <button onclick="aumentarCantidad(${index})">➕</button>
            </td>
            <td>${formatearPrecio(item.precio)}</td>
            <td>
                ${formatearPrecio(subtotal)}
                <button onclick="eliminar(${index})" style="margin-left: 10px; padding: 4px 8px; background-color: #EF4444;">❌</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    if (totalHTML) {
        totalHTML.innerHTML = `<strong>${formatearPrecio(total())}</strong>`;
    }
}

// =========================================================================
// 2. VINCULACIÓN AL CONTEXTO GLOBAL (window)
// Al usar type="module", las funciones no son globales por defecto.
// Al asignarlas a 'window', los atributos 'onclick' del HTML seguirán funcionando.
// =========================================================================
window.agregarAlCarrito = agregarAlCarrito;
window.disminuirCantidad = disminuirCantidad;
window.aumentarCantidad = aumentarCantidad;
window.eliminar = eliminar;
window.vaciarCarrito = vaciarCarrito;
window.finalizarCompra = finalizarCompra;