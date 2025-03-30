document.addEventListener("DOMContentLoaded", function() {
    // Données des slides
    const slides = [
        {
            "image":"slide1.jpg",
            "tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
        },
        {
            "image":"slide2.jpg",
            "tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
        },
        {
            "image":"slide3.jpg",
            "tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
        },
        {
            "image":"slide4.png",
            "tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
        }
    ];

    // Éléments du DOM
    const banner = document.getElementById('banner');
    const bannerImg = document.querySelector('.banner-img');
    const dots = document.querySelectorAll('.dot');
    
    // Ajout du paragraphe pour la tagline s'il n'existe pas
    let tagline = banner.querySelector('p') || banner.appendChild(document.createElement('p'));
    
    // Index du slide actuel
    let currentIndex = 0;
    
    // Fonction pour afficher le slide actuel
    function showSlide(index) {
        // Gestion de l'index (carrousel infini)
        currentIndex = (index + slides.length) % slides.length;
        
        // Mise à jour de l'image et de la tagline
        bannerImg.src = `./assets/images/slideshow/${slides[currentIndex].image}`;
        bannerImg.alt = `Slide ${currentIndex + 1}`;
        tagline.innerHTML = slides[currentIndex].tagLine;
        
        // Mise à jour des dots
        dots.forEach((dot, i) => dot.classList.toggle('selected', i === currentIndex));
    }
    
    // Événements pour les flèches
    document.querySelector('.arrow_left').addEventListener('click', () => showSlide(currentIndex - 1));
    document.querySelector('.arrow_right').addEventListener('click', () => showSlide(currentIndex + 1));
    
    // Événements pour les dots
    dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
    
    // Initialisation
    showSlide(0);
});