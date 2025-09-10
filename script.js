// Función para cargar la página del contenido
function loadPage() {
    const indexItems = document.querySelectorAll('#index li');
    const topicContent = document.getElementById('topic-content');

    indexItems.forEach(item => {
        item.addEventListener('click', () => {
            const topicFile = item.getAttribute('data-topic'); // Obtiene el nombre del archivo HTML

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
                    // Llama a la función para manejar el PDF después de cargar el contenido
                    handlePdfButton(); 
                })
                .catch(error => {
                    topicContent.innerHTML = `<p>Error: ${error.message}</p>`; // Manejo de errores
                });
        });
    });
}

// Función para manejar la apertura y cierre del PDF
function handlePdfButton() {
    const button = document.getElementById('togglePdf');
    const pdfContainer = document.getElementById('pdfContainer');
      
    if (button && pdfContainer) {
        // Inicializar la lógica del botón de PDF
        button.addEventListener('click', function () {
            console.log('Botón clicado, estado anterior: ', pdfContainer.style.display);
            if (pdfContainer.style.display === 'none' || pdfContainer.style.display === '') {
                pdfContainer.style.display = 'block'; // Mostrar el PDF
                button.textContent = 'Cerrar PDF'; // Cambiar el texto del botón
            } else {
                pdfContainer.style.display = 'none'; // Esconder el PDF
                button.textContent = 'Abrir PDF'; // Cambiar el texto del botón
            }
            console.log('Nuevo estado del contenedor de PDF: ', pdfContainer.style.display);
        });
    }
}

// Llama a la función loadPage cuando el documento está cargado
document.addEventListener('DOMContentLoaded', function () {
    loadPage(); // Inicia la carga de temas
});