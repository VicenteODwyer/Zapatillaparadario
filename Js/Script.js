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
});