document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const hamburgerMenu = document.getElementById('hamburger-menu');

    menuBtn.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('menu-open');
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener('click', function(event) {
        if (!hamburgerMenu.contains(event.target) && !menuBtn.contains(event.target)) {
            hamburgerMenu.classList.remove('menu-open');
        }
    });

    // ... resto del código JavaScript existente ...
});