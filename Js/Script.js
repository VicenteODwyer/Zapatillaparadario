document.addEventListener('DOMContentLoaded', () => {
    const shoeGrid = document.getElementById('shoe-grid');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    const shoes = [
        { name: 'Nike Dunk Low Blue 98', price: '$189.999', image: '/placeholder.svg' },
        { name: 'Nike Dunk High Black 98', price: '$189.999', image: '/placeholder.svg' },
        { name: 'Nike Dunk High Blue 98', price: '$189.999', image: '/placeholder.svg' },
        { name: 'Adidas Runner Dept', price: '$149.999', image: '/placeholder.svg' },
        { name: 'Adidas Runner Dept', price: '$149.999', image: '/placeholder.svg' },
        { name: 'Adidas Runner Dept', price: '$149.999', image: '/placeholder.svg' },
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

});
