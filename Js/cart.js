// Función para obtener el carrito del localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Función para mostrar/ocultar el carrito
function toggleCart() {
    const cartPopup = document.getElementById('cart-popup');
    if (cartPopup.style.display === 'block') {
        cartPopup.style.display = 'none';
    } else {
        cartPopup.style.display = 'block';
        updateCartPopup();
    }
}

// Función para actualizar el contenido del carrito
function updateCartPopup() {
    const cartItems = document.getElementById('cart-items');
    const cart = getCart();
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">No hay productos en el carrito</p>';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.nombre}</div>
                <div class="cart-item-price">$${item.precio}</div>
                <div class="cart-item-size">Talle: ${item.talle}</div>
                <div class="cart-item-quantity">Cantidad: ${item.cantidad}</div>
            </div>
        </div>
    `).join('');
}

// Manejar la visibilidad del popup
document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cart-button');
    const cartPopup = document.getElementById('cart-popup');
    
    if (!cartButton || !cartPopup) {
        console.error('No se encontraron los elementos del carrito');
        return;
    }

    // Toggle del popup al hacer clic en el botón del carrito
    cartButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Botón del carrito clickeado'); // Para debugging
        toggleCart();
    });

    // Cerrar el popup al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const cartPopup = document.getElementById('cart-popup');
        const cartButton = document.getElementById('cart-button');
        
        if (!cartButton.contains(event.target) && !cartPopup.contains(event.target)) {
            cartPopup.style.display = 'none';
        }
    });

    // Evitar que los clics dentro del popup lo cierren
    cartPopup.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Manejar el botón "Ir al Carrito"
    const irCarritoBtn = document.getElementById('ir-carrito');
    if (irCarritoBtn) {
        irCarritoBtn.addEventListener('click', function() {
            window.location.href = 'carrito.html';
        });
    }

    // Actualizar el carrito inicialmente
    updateCartPopup();
});

// Actualizar el carrito cuando se agregue un nuevo producto
function actualizarCarrito(producto) {
    const cart = getCart();
    cart.push(producto);
    localStorage.setItem('carrito', JSON.stringify(cart));
    updateCartPopup();
}

document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.querySelector('.cart-icon');
    const modal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close');
    const seguirComprandoBtn = document.getElementById('seguir-comprando');
    const irCarritoBtn = document.getElementById('ir-carrito');

    // Función para mostrar el modal
    function showModal() {
        modal.style.display = 'block';
        updateCartDisplay();
    }

    // Función para cerrar el modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Función para actualizar el contenido del carrito
    function updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const cart = JSON.parse(localStorage.getItem('carrito')) || [];

        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="cart-empty">No hay productos en el carrito</div>';
            return;
        }

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.nombre}</div>
                    <div class="cart-item-price">$${item.precio}</div>
                    <div class="cart-item-size">Talle: ${item.talle}</div>
                    <div class="cart-item-quantity">Cantidad: ${item.cantidad}</div>
                </div>
            </div>
        `).join('');
    }

    // Event Listeners
    cartButton.addEventListener('click', showModal);
    closeBtn.addEventListener('click', closeModal);
    seguirComprandoBtn.addEventListener('click', closeModal);
    irCarritoBtn.addEventListener('click', () => {
        window.location.href = 'carrito.html';
    });

    // Cerrar el modal si se hace clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});
