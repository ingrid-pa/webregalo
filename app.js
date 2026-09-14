const audio = document.getElementById("musica");
const vistas = document.querySelectorAll(".vista");

function mostrarVista(id) {
    vistas.forEach(vista => {
        vista.classList.toggle("activa", vista.id === id);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Modificamos el evento de los botones para que activen la música al pulsar
document.querySelectorAll("[data-vista]").forEach(elemento => {
    elemento.addEventListener("click", () => {
        mostrarVista(elemento.dataset.vista);
        // Intentar reproducir la música inmediatamente cuando se pulse un botón
        iniciarMusicaAlInteractuar();
    });
});

// Función infalible al hacer clic en los menús
function iniciarMusicaAlInteractuar() {
    if (audio) {
        audio.muted = false; // Forzamos a quitar cualquier silencio residual
        if (audio.paused) {
            audio.play()
                .then(() => {
                    console.log("Música iniciada con éxito gracias a la interacción.");
                })
                .catch(error => {
                    console.error("Fallo al reproducir el audio: ", error);
                });
        }
    }
}

// Intentar reproducción automática por si el navegador lo permite de primeras
window.addEventListener("load", () => {
    if (audio) {
        audio.play().catch(() => {
            console.info("Reproducción automática bloqueada. Esperando a que el usuario pulse un botón.");
        });
    }
});

// Esperamos de forma segura a que todo el HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const pantalla = document.getElementById('pantalla-bienvenida');
    const musica = document.getElementById('musica');

    // Comprobamos que ambos elementos existan en la página
    if (pantalla && musica) {
        
        // Creamos la función que activa todo al pulsar
        function abrirRegalo() {
            // 1. Arrancar el audio de inmediato (Indispensable para móviles)
            musica.play()
                .then(() => console.log("Música iniciada correctamente"))
                .catch(err => console.log("El navegador bloqueó el audio: ", err));

            // 2. Ocultar la pantalla con tu hermoso diseño degradado
            pantalla.classList.add('ocultar');

            // 3. Quitamos los oyentes para que no se repita la acción si se pulsa dos veces
            pantalla.removeEventListener('click', abrirRegalo);
            pantalla.removeEventListener('touchstart', abrirRegalo);
        }

        // Evento para ordenadores (Click de ratón)
        pantalla.addEventListener('click', abrirRegalo);
        
        // Evento para móviles (Toque táctil con el dedo)
        pantalla.addEventListener('touchstart', abrirRegalo, { passive: true });
    }
});
