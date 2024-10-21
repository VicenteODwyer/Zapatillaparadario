console.log('Menu.js se está cargando');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded se ha disparado');

    const menuBtn = document.getElementById('menu-btn');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const productosLink = document.getElementById('productos-link');
    const productosSubmenu = document.getElementById('productos-submenu');
    const marcaLinks = productosSubmenu.querySelectorAll('a');

    // Toggle menú hamburguesa
    menuBtn.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
    });

    // Toggle submenú de productos
    productosLink.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('active');
        productosSubmenu.classList.toggle('active');
    });

    // Manejar clics en las marcas
    marcaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const marca = this.getAttribute('data-marca');
            filtrarZapatosPorMarca(marca);
            hamburgerMenu.classList.remove('active'); // Cerrar el menú hamburguesa
        });
    });

    function filtrarZapatosPorMarca(marca) {
        console.log(`Filtrando zapatos por marca: ${marca}`);
        // Aquí iría la lógica para filtrar los zapatos
    }
});
