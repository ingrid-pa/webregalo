const audio = document.getElementById("musica");
const vistas = document.querySelectorAll(".vista");

function mostrarVista(id) {
    vistas.forEach(vista => {
        vista.classList.toggle("activa", vista.id === id);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-vista]").forEach(elemento => {
    elemento.addEventListener("click", () => {
        mostrarVista(elemento.dataset.vista);
    });
});

// FUNCIÓN PARA ACTIVAR LA MÚSICA CONTINUA
function iniciarMusica() {
    if (audio && audio.paused) {
        audio.play()
            .then(() => {
                // Si arranca con éxito, quitamos los escuchadores para no repetir esta función
                document.removeEventListener("click", iniciarMusica);
                document.removeEventListener("touchstart", iniciarMusica);
            })
            .catch(() => {
                console.info("Esperando a que el usuario interactúe para reproducir el audio.");
            });
    }
}

// 1. Intenta reproducir automáticamente nada más cargar la web
window.addEventListener("load", () => {
    iniciarMusica();
    
    // 2. Si el navegador lo bloqueó, se activará al primer clic o toque en la pantalla
    document.addEventListener("click", iniciarMusica);
    document.addEventListener("touchstart", iniciarMusica); // Especial para móviles
});
