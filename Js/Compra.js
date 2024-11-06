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
        } else {
            alert('Por favor, selecciona una talla');
        }
    });
});

// Agregar al final del archivo
const cartPopup = document.getElementById('cartPopup');
const addToCartBtn = document.getElementById('addToCart');
const goToCartBtn = document.getElementById('goToCart');
const continueShoppingBtn = document.getElementById('continueShopping');
const sizeButtons = document.querySelectorAll('.size-button');
const quantityElement = document.getElementById('quantity');

// Variable para almacenar el talle seleccionado
let selectedSize = null;

// Manejador para los botones de talle
sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover la clase active de todos los botones
        sizeButtons.forEach(btn => btn.classList.remove('active'));
        // Agregar la clase active al botón seleccionado
        button.classList.add('active');
        selectedSize = button.textContent;
    });
});

// Función para validar que todo esté seleccionado
function isValidPurchase() {
    const quantity = parseInt(quantityElement.textContent);
    return selectedSize && quantity > 0;
}

// Manejador para el botón de agregar al carrito
addToCartBtn.addEventListener('click', () => {
    if (isValidPurchase()) {
        cartPopup.style.display = 'block';
    } else {
        alert('Por favor selecciona la cantidad');
    }
});

goToCartBtn.addEventListener('click', () => {
    window.location.href = '/carlitos.html'; // Ajusta la ruta según tu estructura
});

continueShoppingBtn.addEventListener('click', () => {
    cartPopup.style.display = 'none';
    window.location.href = '/index.html'; // Ajusta la ruta según tu estructura
});

// Cerrar el popup al hacer clic fuera
window.addEventListener('click', (event) => {
    if (event.target === cartPopup) {
        cartPopup.style.display = 'none';
    }
});

// En tu función de agregar al carrito
function agregarAlCarrito() {
    if (isValidPurchase()) {
        const zapatillaSeleccionada = JSON.parse(localStorage.getItem('zapatillaSeleccionada'));
        const productoParaCarrito = {
            id: zapatillaSeleccionada.id,
            nombre: zapatillaSeleccionada.nombre,
            precio: zapatillaSeleccionada.precio,
            imagen: zapatillaSeleccionada.imagen,
            talle: selectedSize,
            cantidad: parseInt(quantityElement.textContent)
        };

        // Obtener el carrito actual
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(productoParaCarrito);
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Mostrar el popup de confirmación
        cartPopup.style.display = 'block';
    } else {
        alert('Por favor selecciona un talle y la cantidad');
    }
}
