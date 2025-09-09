// Datos de ejemplo para el contenido de cada tema
// Función para manejar el clic en los temas del índice
const indexItems = document.querySelectorAll('#index li');
const topicContent = document.getElementById('topic-content');

indexItems.forEach(item => {
    item.addEventListener('click', () => {
        const topicFile = item.getAttribute('data-topic'); // Obtén el nombre del archivo HTML

        // Carga el contenido del archivo HTML seleccionado
        fetch(topicFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar el archivo: ' + response.status);
                }
                return response.text();
            })
            .then(html => {
                topicContent.innerHTML = html; // Inserta el contenido del archivo en el div
            })
            .catch(error => {
                topicContent.innerHTML = `<p>Error: ${error.message}</p>`; // Manejo de errores
            });
    });
});