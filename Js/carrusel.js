const images = [
    'Src/yajirobe.webp',
    'Src/yajirobe.webp',
    'Src/yajirobe.webp',
    'Src/niki 4.png'
];

let currentImageIndex = 0;
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

function updateImage() {
    mainImage.src = images[currentImageIndex];
    // Actualizar miniaturas activas
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

function changeImage(index) {
    currentImageIndex = index;
    updateImage();
}

prevButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateImage();
});

nextButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateImage();
});