document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const shoeGrid = document.getElementById('shoe-grid');

    function filterShoes() {
        const searchTerm = searchInput.value.toLowerCase();
        const shoeItems = shoeGrid.getElementsByClassName('shoe-item');

        Array.from(shoeItems).forEach(function(item) {
            const shoeName = item.querySelector('h3').textContent.toLowerCase();
            if (shoeName.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterShoes);
    searchButton.addEventListener('click', filterShoes);

    // Permitir búsqueda al presionar Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterShoes();
        }
    });
});
