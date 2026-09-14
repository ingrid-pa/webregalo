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

document.addEventListener('DOMContentLoaded', () => {
    const pantalla = document.getElementById('pantalla-bienvenida');
    const musica = document.getElementById('musica');

    if (pantalla && musica) {
        // Usamos una sola función directa sin bloquear eventos nativos
        pantalla.addEventListener('click', () => {
            
            // 1. Intentar reproducir la música inmediatamente
            musica.play()
                .then(() => console.log("¡Música iniciada con éxito!"))
                .catch(err => console.log("Error de reproducción: ", err));

            // 2. Ocultar la pantalla de bienvenida con la clase CSS
            pantalla.classList.add('ocultar');
        });
    }
});

