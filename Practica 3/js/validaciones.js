// ===================================
// validaciones.js
// Validaciones de formularios
// ===================================

/**
 * Inicia las validaciones básicas de los formularios del sitio
 */
export function iniciarValidaciones() {
    console.log("✔️ Validaciones activadas");

    const form = document.getElementById("formulario");

    // Si el formulario no existe en la página actual (por ejemplo, en index.html o carrito.html),
    // la función se detiene pacíficamente sin lanzar errores.
    if (!form) return;

    form.addEventListener("submit", (e) => {
        // Evita que el formulario recargue la página automáticamente
        e.preventDefault();

        const email = form.email.value.trim();

        // Validación básica del correo electrónico
        if (!email || !email.includes("@")) {
            alert("Por favor, introduce un correo electrónico válido.");
            return;
        }

        alert("¡Formulario validado y enviado correctamente! 🎉");
        form.reset(); // Limpia los campos tras un envío exitoso
    });
}