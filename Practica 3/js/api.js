// ===================================
// api.js
// Simulación de API y operaciones asíncronas
// ===================================

/**
 * Simula la conexión inicial a un backend o servicio externo
 */
export function iniciarAPI() {
    console.log("🌐 API simulada iniciada");

    // Simulación de una petición de red (fetch) usando un temporizador
    setTimeout(() => {
        console.log("📡 Datos cargados desde API simulada correctamente");
    }, 1500);
}