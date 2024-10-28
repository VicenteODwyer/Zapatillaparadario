document.addEventListener('DOMContentLoaded', function() {
    // Obtener la zapatilla seleccionada del localStorage
    const zapatillaSeleccionada = JSON.parse(localStorage.getItem('zapatillaSeleccionada'));
    
    // Si existe una zapatilla seleccionada, actualizar la interfaz
    if (zapatillaSeleccionada) {
        // Actualizar título y precio
        document.getElementById('numeroelasapayita').textContent = zapatillaSeleccionada.nombre;
        document.getElementById('precio').innerHTML = `<strong>$${zapatillaSeleccionada.precio}</strong>`;
        
        // Actualizar imagen principal
        const mainImage = document.getElementById('mainImage');
        mainImage.src = zapatillaSeleccionada.imagen;
        mainImage.alt = zapatillaSeleccionada.nombre;
        
        // Actualizar miniaturas con las imágenes del producto
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            if (zapatillaSeleccionada.imagenes && zapatillaSeleccionada.imagenes[index]) {
                thumbnail.src = zapatillaSeleccionada.imagenes[index];
                thumbnail.setAttribute('data-src', zapatillaSeleccionada.imagenes[index]);
            }
        });
    }

    // Funcionalidad de búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        console.log('Buscando:', this.value);
        // Aquí iría la lógica de búsqueda
    });

    // Cambio de imagen principal
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            mainImage.src = this.getAttribute('data-src');
        });
    });

    // Selección de talla
    const sizeButtons = document.querySelectorAll('.size-button');
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Control de cantidad
    const quantityDisplay = document.getElementById('quantity');
    const decreaseButton = document.getElementById('decreaseQuantity');
    const increaseButton = document.getElementById('increaseQuantity');
    let quantity = 1;

    decreaseButton.addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }
    });

    increaseButton.addEventListener('click', function() {
        quantity++;
        quantityDisplay.textContent = quantity;
    });

    // Agregar al carrito
    const addToCartButton = document.getElementById('addToCart');
    addToCartButton.addEventListener('click', function() {
        const selectedSize = document.querySelector('.size-button.selected');
        if (selectedSize) {
            console.log('Agregado al carrito:', {
                producto: zapatillaSeleccionada.nombre,
                talla: selectedSize.textContent,
                cantidad: quantity
            });
            alert('Producto agregado al carrito');
        } else {
            alert('Por favor, selecciona una talla');
        }
    });
});
