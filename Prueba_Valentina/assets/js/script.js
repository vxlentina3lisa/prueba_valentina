document.addEventListener("DOMContentLoaded", function() {
    const casaSelector = document.getElementById("casaSelector");
    const volverBtn = document.getElementById("volverBtn");
    const personajesContainer = document.getElementById("personajesContainer");

    // Función para obtener los personajes de la API
    async function obtenerPersonajes() {
        try {
            const apiUrl = 'https://hp-api.onrender.com/api/characters';
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener los personajes:", error);
        }
    }

    function mostrarPersonajes(personajes) {
        personajesContainer.innerHTML = "";
        personajes.forEach(personaje => {
            const personajeCard = document.createElement("div");
            personajeCard.classList.add("personaje-card");
            personajeCard.innerHTML = `
                <h2>${personaje.name}</h2>
                <p>Casa: ${personaje.house}</p>
            `;
            personajesContainer.appendChild(personajeCard);
        });
    }

    async function filtrarPersonajes(casa) {
        const personajes = await obtenerPersonajes();
        if (casa === "todos") {
            mostrarPersonajes(personajes);
        } else {
            const personajesFiltrados = personajes.filter(personaje => personaje.house.toLowerCase() === casa);
            mostrarPersonajes(personajesFiltrados);
        }
    }

    // Manejador de evento para el cambio en el selector de casas
    casaSelector.addEventListener("change", function() {
        const casaSeleccionada = this.value;
        filtrarPersonajes(casaSeleccionada);
    });

    volverBtn.addEventListener("click", function() {
        filtrarPersonajes("todos");
    });

    filtrarPersonajes("todos");
});
