// ===================================
// utilidades.js
// Funciones de utilidad reutilizables
// ===================================

/**
 * Inicializa los servicios de utilidades generales
 */
export function initUtils() {
    console.log("🧰 Utilidades listas");
}

/**
 * Formatea un número como un string de moneda ($X.XX)
 * @param {number} precio - El valor numérico a formatear
 * @returns {string} El precio formateado con el símbolo de peso y dos decimales
 */
export function formatearPrecio(precio) {
    return `$${precio.toFixed(2)}`;
}