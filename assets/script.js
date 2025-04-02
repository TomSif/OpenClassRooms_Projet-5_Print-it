document.addEventListener("DOMContentLoaded", () => {
    // Configuration du carrousel
    const slides = [
        { image: "slide1.jpg", tagLine: "Impressions tous formats <span>en boutique et en ligne</span>" },
        { image: "slide2.jpg", tagLine: "Tirages haute définition grand format <span>pour vos bureaux et events</span>" },
        { image: "slide3.jpg", tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>" },
        { image: "slide4.png", tagLine: "Autocollants <span>avec découpe laser sur mesure</span>" }
    ];
    
    const imagePath = "./assets/images/slideshow/";
    let currentIndex = 0;
    let bannerImg, tagline, dotsContainer;
    
    // Initialisation du carrousel
    function init() {
        try {
            // Sélection des éléments du DOM
            const banner = document.getElementById("banner");
            bannerImg = document.querySelector(".banner-img");
            dotsContainer = document.querySelector(".dots");
            const arrowLeft = document.querySelector(".arrow_left");
            const arrowRight = document.querySelector(".arrow_right");
            
            // Vérification des éléments critiques
            if (!banner) throw new Error("Élément #banner manquant");
            if (!bannerImg) throw new Error("Élément .banner-img manquant");
            if (!dotsContainer) throw new Error("Élément .dots manquant");
            if (!arrowLeft) throw new Error("Élément .arrow_left manquant");
            if (!arrowRight) throw new Error("Élément .arrow_right manquant");
            
            // Configuration de l'interface
            setupDOM(banner);
            setupNavigation(arrowLeft, arrowRight);
            updateCarousel();
            
            return true;
        } catch (error) {
            console.error(`Erreur d'initialisation du carrousel: ${error.message}`);
            // On pourrait ajouter ici un élément d'UI pour informer l'utilisateur
            return false;
        }
    }
    
    // Configuration des éléments du DOM
    function setupDOM(banner) {
        // Création de la tagline
        tagline = document.createElement("p");
        banner.appendChild(tagline);
        
        // Création des indicateurs (dots)
        dotsContainer.innerHTML = ''; // Nettoyage préventif
        slides.forEach(() => {
            const dot = document.createElement("span");
            dot.className = "dot";
            dot.setAttribute("aria-hidden", "true");
            dotsContainer.appendChild(dot);
        });
    }
    
    // Configuration de la navigation
    function setupNavigation(arrowLeft, arrowRight) {
        // Fonction de navigation avec boucle infinie grâce au modulo
        function navigate(direction) {
            currentIndex = (currentIndex + direction + slides.length) % slides.length;
            updateCarousel();
        }
        
        // Gestionnaires d'événements pour les flèches
        arrowLeft.addEventListener("click", () => {
            console.log("Flèche de gauche cliquée");
            navigate(-1);
        });
        arrowRight.addEventListener("click", () => {
            console.log("Flèche de droite cliquée");
            navigate(1);
        });
        
        // Navigation au clavier
        document.addEventListener("keydown", (event) => {
            if(event.key === "ArrowLeft"){
                console.log("Flèche de gauche cliquée");
                navigate(-1)
            }else if (event.key === "ArrowRight"){
                console.log("Flèche de droite cliquée");
                navigate(1);
            }
        });
    }
    
    // Mise à jour de l'affichage du carrousel
    function updateCarousel() {
        const slide = slides[currentIndex];
        
        // Mise à jour de l'image et du texte
        bannerImg.src = `${imagePath}${slide.image}`;
        tagline.innerHTML = slide.tagLine;
        
        // Mise à jour des indicateurs
        Array.from(dotsContainer.children).forEach((dot, i) => {
            dot.classList.toggle("selected", i === currentIndex);
        });
    }
    
    // Démarrage 
    init();
});