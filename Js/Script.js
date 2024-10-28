console.log('Script.js se está cargando');

document.addEventListener('DOMContentLoaded', () => {
    const shoeGrid = document.getElementById('shoe-grid');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    const shoes = [
        { name: 'Sapatiya 1', price: '$189.999', image: 'src/zapa niki.JPG' },
        { name: 'Sapatiya 2', price: '$189.999', image: 'src/zapa niki 2.JPG' },
        { name: 'Sapatiya 3', price: '$189.999', image: 'src/zapa niki 3.JPG' },
        { name: 'Sapatiya 4', price: '$189.999', image: 'src/niki 4.PNG' },
        { name: 'Sapatiya 5', price: '$189.999', image: 'src/zapa niki 5.JPG' },
        { name: 'Sapatiya 6', price: '$149.999', image: 'src/zapa ardidas.JPG' },
        { name: 'Sapatiya 7', price: '$149.999', image: 'src/zapa ardidas 2.webp' },
        { name: 'Sapatiya 8', price: '$149.999', image: 'src/zapa ardidas 3.JPG' },
        { name: 'Sapatiya 9', price: '$149.999', image: 'src/zapa ardidas 4.JPG' },
        { name: 'Sapatiya 10', price: '$149.999', image: 'src/zapa ardidas 5.JPG' },
    ];

    function renderShoes(shoesToRender) {
        shoeGrid.innerHTML = '';
        shoesToRender.forEach(shoe => {
            const shoeElement = document.createElement('div');
            shoeElement.className = 'shoe-item';
            shoeElement.innerHTML = `
                <img src="${shoe.image}" alt="${shoe.name}">
                <h3>${shoe.name}</h3>
                <p>${shoe.price}</p>
            `;
            
            // Eliminar este evento de clic que sobreescribe el comportamiento
            /* shoeElement.addEventListener('click', () => {
                window.location.href = 'Compra.html';
            }); */

            shoeGrid.appendChild(shoeElement);
        });
    }

    function filterShoes(query) {
        return shoes.filter(shoe => 
            shoe.name.toLowerCase().includes(query.toLowerCase())
        );
    }
    

    renderShoes(shoes);

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value;
        const filteredShoes = filterShoes(query);
        renderShoes(filteredShoes);
    });

    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const query = searchInput.value;
            const filteredShoes = filterShoes(query);
            renderShoes(filteredShoes);
        }
    });

    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('close-popup');
    const abrirPopupBtn = document.getElementById('abrir-popup');

    // Función para abrir el pop-up
    function abrirPopup() {
        const popup = document.getElementById('popup');
        popup.style.display = 'block';
    }

    // Función para cerrar el pop-up
    function cerrarPopup() {
        const popup = document.getElementById('popup');
        popup.style.display = 'none';
    }

    // Evento para abrir el pop-up al hacer clic en el botón
    abrirPopupBtn.addEventListener('click', abrirPopup);

    // Evento para cerrar el pop-up al hacer clic en el botón de cerrar
    closePopup.addEventListener('click', cerrarPopup);

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const shoeItems = shoeGrid.getElementsByClassName('shoe-item');

        Array.from(shoeItems).forEach(function(item) {
            const modelo = item.getAttribute('data-modelo').toLowerCase();
            if (modelo.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

function displayProducts(productsToDisplay) {
    const productContainer = document.querySelector('.product-container');
    productContainer.innerHTML = ''; // Limpiar el contenedor

    productsToDisplay.forEach(product => {
        const productElement = createProductElement(product);
        productContainer.appendChild(productElement);
    });
}

function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
    `;
    return productDiv;
}

// Asegúrate de que shoes sea una variable global
window.shoes = shoes;

// Hacer displayProducts accesible globalmente
window.displayProducts = displayProducts;
