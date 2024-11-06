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
        nombre: "Adidas Alphaedge",
        precio: 159999,
        imagen: "Src/zapa5.webp",
        marca: "Adidas",
        imagenes: [
            "ruta/imagen2.jpg",
            "ruta/imagen2-2.jpg",
            "ruta/imagen2-3.jpg",
            "ruta/imagen2-4.jpg"
        ]
    },
    {
        id: 6,
        nombre: "Adidas Runner Stockx",
        precio: 159999,
        imagen: "Src/zapa6.webp",
        marca: "Adidas",
        imagenes: [
            "ruta/imagen2.jpg",
            "ruta/imagen2-2.jpg",
            "ruta/imagen2-3.jpg",
            "ruta/imagen2-4.jpg"
        ]
    },
    {
        id: 7,
        nombre: "Nike Air Mag BTF",
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
        nombre: "Adidas Campus 00s Green",
        precio: 159999,
        imagen: "Src/zapa8.webp",
        marca: "Adidas",
        imagenes: [
            "ruta/imagen2.jpg",
            "ruta/imagen2-2.jpg",
            "ruta/imagen2-3.jpg",
            "ruta/imagen2-4.jpg"
        ]
    },
    {
        id: 9,
        nombre: "Adidas Campus 00s Gray",
        precio: 159999,
        imagen: "Src/zapa9.webp",
        marca: "Adidas",
        imagenes: [
            "ruta/imagen2.jpg",
            "ruta/imagen2-2.jpg",
            "ruta/imagen2-3.jpg",
            "ruta/imagen2-4.jpg"
        ]
    },
    {
        id: 10,
        nombre: "Adidas Predator Yellow",
        precio: 159999,
        imagen: "Src/zapa10.webp",
        marca: "Adidas",
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
function generarZapatillas(filtroTexto = '', filtroMarca = '') {
    const shoeGrid = document.getElementById('shoe-grid');
    shoeGrid.innerHTML = '';
    
    // Aplicar estilos para una cuadrícula de 5x2 responsiva
    shoeGrid.style.display = 'grid';
    shoeGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(180px, 1fr))';
    shoeGrid.style.gap = '20px';
    shoeGrid.style.padding = '20px';
    shoeGrid.style.maxWidth = '1200px'; // Ancho máximo del contenedor
    shoeGrid.style.margin = '0 auto'; // Centrar el contenedor
    
    let zapatillasFiltradas = zapatillas;
    
    // Aplicar filtro de texto si existe
    if (filtroTexto) {
        zapatillasFiltradas = zapatillasFiltradas.filter(zapatilla => 
            zapatilla.nombre.toLowerCase().includes(filtroTexto.toLowerCase())
        );
    }
    
    // Aplicar filtro de marca si existe
    if (filtroMarca) {
        zapatillasFiltradas = zapatillasFiltradas.filter(zapatilla => 
            zapatilla.marca.toLowerCase() === filtroMarca.toLowerCase()
        );
    }
    
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
    
    // Agregar listeners para los filtros de marca
    const marcaLinks = document.querySelectorAll('[data-marca]');
    marcaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const marca = e.target.getAttribute('data-marca');
            generarZapatillas('', marca);
            
            // Cerrar el menú hamburguesa después de seleccionar
            const hamburgerMenu = document.getElementById('hamburger-menu');
            if (hamburgerMenu) {
                hamburgerMenu.classList.remove('active');
            }
        });
    });
    
    // Agregar listener para "Inicio" para mostrar todas las zapatillas
    const inicioLink = document.querySelector('.hamburger-menu ul li:first-child a');
    if (inicioLink) {
        inicioLink.addEventListener('click', (e) => {
            e.preventDefault();
            generarZapatillas();
            
            // Cerrar el menú hamburguesa
            const hamburgerMenu = document.getElementById('hamburger-menu');
            if (hamburgerMenu) {
                hamburgerMenu.classList.remove('active');
            }
        });
    }
});
