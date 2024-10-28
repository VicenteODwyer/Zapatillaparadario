// Array de zapatillas
const zapatillas = [
    {
        id: 1,
        nombre: "Nike TN Red",
        precio: 189999,
        imagen: "Src/yajirobe.webp",
        marca: "Nike",
        imagenes: [
            "Src/yajirobe.webp",
            "Src/yajirobe.webp", 
            "Src/yajirobe.webp",
            "Src/niki 4.png"
        ]
    },
    {
        id: 2,
        nombre: "Adidas Superstar x Korn",
        precio: 159999,
        imagen: "Src/arirasDAUMDAUMDAUMDANDAIMA.webp",
        marca: "Adidas",
        imagenes: [
            "ruta/imagen2.jpg",
            "ruta/imagen2-2.jpg",
            "ruta/imagen2-3.jpg",
            "ruta/imagen2-4.jpg"
        ]
    },
    {
        id: 3,
        nombre: "Nike Dunk High JBalvin",
        precio: 159999,
        imagen: "Src/jbalvin.webp",
        marca: "Nike",
        imagenes: [
            "ruta/imagen2.jpg",
            "ruta/imagen2-2.jpg",
            "ruta/imagen2-3.jpg",
            "ruta/imagen2-4.jpg"
        ]
    },
    {
        id: 4,
        nombre: "Nike Air Max 720",
        precio: 159999,
        imagen: "Src/mx720.webp",
        marca: "Nike",
        imagenes: [
            "ruta/imagen2.jpg",
            "ruta/imagen2-2.jpg",
            "ruta/imagen2-3.jpg",
            "ruta/imagen2-4.jpg"
        ]
    },
    {
        id: 5,
        nombre: "Zapa 5",
        precio: 159999,
        imagen: "Src/zapa5.webp",
        marca: "Nike",
        imagenes: [
            "ruta/imagen2.jpg",
            "ruta/imagen2-2.jpg",
            "ruta/imagen2-3.jpg",
            "ruta/imagen2-4.jpg"
        ]
    },
    {
        id: 6,
        nombre: "Zapa 6",
        precio: 159999,
        imagen: "Src/zapa6.webp",
        marca: "Nike",
        imagenes: [
            "ruta/imagen2.jpg",
            "ruta/imagen2-2.jpg",
            "ruta/imagen2-3.jpg",
            "ruta/imagen2-4.jpg"
        ]
    },
    {
        id: 7,
        nombre: "Zapa 7",
        precio: 159999,
        imagen: "Src/zapa7.webp",
        marca: "Nike",
        imagenes: [
            "ruta/imagen2.jpg",
            "ruta/imagen2-2.jpg",
            "ruta/imagen2-3.jpg",
            "ruta/imagen2-4.jpg"
        ]
    },
    {
        id: 8,
        nombre: "Zapa 8",
        precio: 159999,
        imagen: "Src/zapa8.webp",
        marca: "Nike",
        imagenes: [
            "ruta/imagen2.jpg",
            "ruta/imagen2-2.jpg",
            "ruta/imagen2-3.jpg",
            "ruta/imagen2-4.jpg"
        ]
    },
    {
        id: 9,
        nombre: "Zapa 9",
        precio: 159999,
        imagen: "Src/zapa9.webp",
        marca: "Nike",
        imagenes: [
            "ruta/imagen2.jpg",
            "ruta/imagen2-2.jpg",
            "ruta/imagen2-3.jpg",
            "ruta/imagen2-4.jpg"
        ]
    },
    {
        id: 10,
        nombre: "Zapa 10",
        precio: 159999,
        imagen: "Src/zapa10.webp",
        marca: "Nike",
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
    
    // Aplicar estilos para una cuadrícula de 5x2 responsiva
    shoeGrid.style.display = 'grid';
    shoeGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(180px, 1fr))';
    shoeGrid.style.gap = '20px';
    shoeGrid.style.padding = '20px';
    shoeGrid.style.maxWidth = '1200px'; // Ancho máximo del contenedor
    shoeGrid.style.margin = '0 auto'; // Centrar el contenedor
    
    const zapatillasFiltradas = zapatillas.filter(zapatilla => 
        zapatilla.nombre.toLowerCase().includes(filtro.toLowerCase())
    );
    
    zapatillasFiltradas.forEach(zapatilla => {
        const zapatillaCard = document.createElement('div');
        zapatillaCard.className = 'shoe-card';
        zapatillaCard.style.display = 'flex';
        zapatillaCard.style.flexDirection = 'column';
        zapatillaCard.style.alignItems = 'center';
        zapatillaCard.style.padding = '15px';
        zapatillaCard.style.border = '1px solid #ddd';
        zapatillaCard.style.borderRadius = '8px';
        zapatillaCard.style.width = '100%';
        zapatillaCard.style.maxWidth = '220px';
        zapatillaCard.style.margin = '0 auto';
        
        zapatillaCard.innerHTML = `
            <img src="${zapatilla.imagen}" alt="${zapatilla.nombre}" style="width: 100%; height: 180px; object-fit: contain;">
            <h3 style="margin: 10px 0; text-align: center;">${zapatilla.nombre}</h3>
            <p style="margin: 5px 0;">$${zapatilla.precio}</p>
            <button onclick="irACompra(${zapatilla.id})" style="padding: 8px 16px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Comprar</button>
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
