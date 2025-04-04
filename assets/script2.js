document.addEventListener("DOMContentLoaded", () => {
    const slides = [
        { image: "slide1.jpg", tagLine: "Impressions tous formats <span>en boutique et en ligne</span>" },
        { image: "slide2.jpg", tagLine: "Tirages haute définition grand format <span>pour vos bureaux et events</span>" },
        { image: "slide3.jpg", tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>" },
        { image: "slide4.png", tagLine: "Autocollants <span>avec découpe laser sur mesure</span>" }
    ];
    
    const imagePath = "./assets/images/slideshow/";
    let currentIndex = 0;
    
    const banner = document.getElementById("banner");
    const bannerImg = document.querySelector(".banner-img");
    const dotsContainer = document.querySelector(".dots");
    
    // Créer le paragraphe pour le tagline
    const tagline = document.createElement("p");
    banner.appendChild(tagline);
    
    // Créer les points de navigation
    slides.forEach(() => {
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.setAttribute("aria-hidden", "true");
        dotsContainer.appendChild(dot);
    });
    
    // Fonction pour changer de slide
    function updateSlide() {
        bannerImg.src = `${imagePath}${slides[currentIndex].image}`;
        tagline.innerHTML = slides[currentIndex].tagLine;
        
        // Mettre à jour les points
        Array.from(dotsContainer.children).forEach((dot, i) => 
            dot.classList.toggle("selected", i === currentIndex));
    }
    
    // Fonction de navigation
    function navigate(direction) {
        currentIndex = (currentIndex + direction + slides.length) % slides.length;
        updateSlide();
    }
    
    // Gestionnaires d'événements
    document.querySelector(".arrow_left").addEventListener("click", () => {
        navigate(-1);
        console.log("la flèche gauche a été cliquée");
    });
    
    document.querySelector(".arrow_right").addEventListener("click", () => {
        navigate(1);
        console.log("la flèche droite a été cliquée");
    });
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") navigate(-1);
        if (e.key === "ArrowRight") navigate(1);
    });
    
    // Initialiser le carrousel
    updateSlide();
});