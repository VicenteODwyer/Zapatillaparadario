document.addEventListener('DOMContentLoaded', function() {
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
                producto: 'Nike Dunk High Blue 98',
                talla: selectedSize.textContent,
                cantidad: quantity
            });
            alert('Producto agregado al carrito');
        } else {
            alert('Por favor, selecciona una talla');
        }
    });
});