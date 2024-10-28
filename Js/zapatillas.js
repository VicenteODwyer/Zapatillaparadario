 // Array de zapatillas
const zapatillas = [
    {
        id: 1,
        nombre: "Nike Dunk High Blue 98",
        precio: 189999,
        imagen: "Src/yajirobe.webp",
        marca: "nike",
        imagenes: [
            "Src/yajirobe.webp",
            "Src/yajirobe.webp",
            "Src/yajirobe.webp",
            "Src/niki 4.png"
        ]
    },
    {
        id: 2,
        nombre: "Adidas Superstar Classic",
        precio: 159999,
        imagen: "Src/arirasDAUMDAUMDAUMDANDAIMA.webp",
        marca: "adidas",
        imagenes: [
            "ruta/imagen2.jpg",
            "ruta/imagen2-2.jpg",
            "ruta/imagen2-3.jpg",
            "ruta/imagen2-4.jpg"
        ]
    },
    // Agregar más zapatillas según necesites
];

// Función para generar las tarjetas de zapatillas
function generarZapatillas(filtro = '') {
    const shoeGrid = document.getElementById('shoe-grid');
    shoeGrid.innerHTML = '';
    
    const zapatillasFiltradas = zapatillas.filter(zapatilla => 
        zapatilla.nombre.toLowerCase().includes(filtro.toLowerCase())
    );
    
    zapatillasFiltradas.forEach(zapatilla => {
        const zapatillaCard = document.createElement('div');
        zapatillaCard.className = 'shoe-card';
        zapatillaCard.innerHTML = `
            <img src="${zapatilla.imagen}" alt="${zapatilla.nombre}" style="width: 128px; height: 128px; object-fit: contain;">
            <h3>${zapatilla.nombre}</h3>
            <p>$${zapatilla.precio}</p>
            <button onclick="irACompra(${zapatilla.id})">Comprar</button>
        `;
        shoeGrid.appendChild(zapatillaCard);
    });
}

// Función para redirigir a la página de compra
function irACompra(id) {
    const zapatillaSeleccionada = zapatillas.find(z => z.id === id);
    if (zapatillaSeleccionada) {
        localStorage.setItem('zapatillaSeleccionada', JSON.stringify(zapatillaSeleccionada));
        window.location.href = 'compra.html';
    }
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    generarZapatillas();
    
    // Agregar funcionalidad de búsqueda
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            generarZapatillas(e.target.value);
        });
    }
});
