console.log('Menu.js se está cargando');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded se ha disparado');

    const menuBtn = document.querySelector('.menu-btn');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const productosLink = document.querySelector('#productos-link');
    const productosSubmenu = document.querySelector('#productos-submenu');
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
        if(!menuOpen) {
            menuBtn.classList.add('open');
            hamburgerMenu.classList.add('active');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            hamburgerMenu.classList.remove('active');
            menuOpen = false;
        }
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!hamburgerMenu.contains(e.target) && !menuBtn.contains(e.target) && menuOpen) {
            menuBtn.classList.remove('open');
            hamburgerMenu.classList.remove('active');
            menuOpen = false;
        }
    });

    // Toggle submenu
    productosLink.addEventListener('click', (e) => {
        e.preventDefault();
        productosSubmenu.classList.toggle('active');
    });
});
