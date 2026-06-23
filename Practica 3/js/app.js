// ===================================
// app.js
// Punto de entrada del ecommerce
// ===================================

// Importar módulos (utilizando ES Modules)
import "./carritos.js"; // Carga el archivo completo de carrito y ejecuta su lógica global
import { cargarProductos } from "./productos.js";
import { iniciarValidaciones } from "./validaciones.js";
import { iniciarAPI } from "./api.js";
import { initUtils } from "./utilidades.js";

/**
 * Función encargada de filtrar los productos en tiempo real
 */
function configurarBuscador() {
    const inputBuscar = document.getElementById("buscar");
    const formBuscador = document.getElementById("form-buscador");

    // Si el buscador no está en la página actual (ej: en acerca.html), salimos pacíficamente
    if (!inputBuscar) return;

    function filtrarProductos() {
        const termino = inputBuscar.value.toLowerCase().trim();
        // Selecciona las tarjetas generadas dentro de la grilla
        const productos = document.querySelectorAll(".contenedor-productos article");

        productos.forEach(producto => {
            // Buscamos el título h3 dentro de cada tarjeta de producto
            const titulo = producto.querySelector("h3").textContent.toLowerCase();

            // Si el nombre contiene los caracteres escritos, se queda visible, si no, se oculta
            if (titulo.includes(termino)) {
                producto.style.display = "flex"; 
            } else {
                producto.style.display = "none";
            }
        });
    }

    // 🔍 Filtrado inmediato mientras el usuario va escribiendo
    inputBuscar.addEventListener("input", filtrarProductos);

    // 🎯 Filtrado al presionar el botón "Buscar" o dar Enter en el teclado
    if (formBuscador) {
        formBuscador.addEventListener("submit", (e) => {
            e.preventDefault(); // Detiene la recarga automática de la página
            filtrarProductos();
        });
    }
}

/**
 * Función principal que inicia toda la aplicación
 */
function initApp() {
    console.log("🚀 Iniciando Ecommerce...");

    // Inicializar utilidades generales
    initUtils();

    // Cargar productos en pantalla
    cargarProductos();

    // 🔥 NUEVO: Activa el buscador una vez que los productos ya existen en el DOM
    configurarBuscador();

    // Iniciar validaciones de formularios
    iniciarValidaciones();

    // Iniciar conexión o simulación de API
    iniciarAPI();

    console.log("✅ Ecommerce cargado correctamente");
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", initApp);