// ===================================
// productos.js
// Base de datos simulada de productos
// ===================================

const productos = [
    { id: 1, nombre: "Laptop Gamer ASUS ROG", precio: 1200 },
    { id: 2, nombre: "iPhone 15 Pro", precio: 999 },
    { id: 3, nombre: "Samsung Galaxy S25", precio: 899 },
    { id: 4, nombre: "Monitor LG UltraWide", precio: 350 },
    { id: 5, nombre: "Teclado Mecánico RGB", precio: 89 },
    { id: 6, nombre: "Mouse Gamer Logitech", precio: 59 },
    { id: 7, nombre: "Auriculares HyperX", precio: 120 },
    { id: 8, nombre: "Steam Deck OLED", precio: 650 }
];

/**
 * Retorna el listado completo de productos disponibles
 * @returns {Array} Arreglo de objetos de productos
 */
export function obtenerProductos() {
    return productos;
}

/**
 * Función opcional: Carga y renderiza los productos en el HTML (si index.html los requiere)
 */
export function cargarProductos() {
    console.log("📦 Productos del catálogo listos para mostrar.");
    // Aquí puedes agregar lógica en el futuro para pintar las tarjetas de productos dinámicamente si lo deseas
}