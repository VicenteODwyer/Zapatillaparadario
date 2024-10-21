document.addEventListener('DOMContentLoaded', function() {
    const finalizarCompraBtn = document.querySelector('button[type="submit"]');
    const popup = document.getElementById('compraExitosa');
    const seguirComprandoBtn = document.getElementById('seguirComprando');

    finalizarCompraBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Previene el envío del formulario
        
        // Aquí puedes agregar la lógica para procesar la compra
        // Por ejemplo, enviar datos al servidor, validar la información, etc.
        
        // Muestra el popup
        popup.style.display = 'block';
    });

    seguirComprandoBtn.addEventListener('click', function() {
        // Oculta el popup
        popup.style.display = 'none';
        
        // Aquí puedes agregar lógica adicional, como redirigir a la página principal
        // window.location.href = 'index.html';
    });

    // Cierra el popup si se hace clic fuera de su contenido
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});
