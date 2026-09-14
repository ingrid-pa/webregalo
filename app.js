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

// Intento de reproducción automática al abrir la web.
// Algunos navegadores bloquean el audio con sonido hasta que haya
// una interacción del usuario. La navegación entre apartados no
// recarga la página, así que la canción no se reinicia.
window.addEventListener("load", () => {
    audio.play().catch(() => {
        console.info("El navegador ha bloqueado la reproducción automática con sonido.");
    });
});
