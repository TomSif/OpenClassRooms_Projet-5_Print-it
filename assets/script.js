document.addEventListener("DOMContentLoaded", function () {
    const config = {
        slides: [
            { image: "slide1.jpg", tagLine: "Impressions tous formats <span>en boutique et en ligne</span>" },
            { image: "slide2.jpg", tagLine: "Tirages haute définition grand format <span>pour vos bureaux et events</span>" },
            { image: "slide3.jpg", tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>" },
            { image: "slide4.png", tagLine: "Autocollants <span>avec découpe laser sur mesure</span>" }
        ],
        imagePath: "./assets/images/slideshow/",
        currentIndex: 0
    };

    const uiElements = {
        banner: document.getElementById("banner"),
        bannerImg: document.querySelector(".banner-img"),
        dots: document.querySelectorAll(".dot"),
        leftArrow: document.querySelector(".arrow_left"),
        rightArrow: document.querySelector(".arrow_right"),
        tagline: null,
        hasDots: false
    };

    function initUIElementsAndListeners() {
        // Créer et ajouter l'élément de légende
        const tagline = document.createElement("p");
        uiElements.banner.appendChild(tagline);
        uiElements.tagline = tagline;

        // Vérifier la présence des points et initialiser les écouteurs d'événements
        uiElements.hasDots = uiElements.dots.length > 0;

        try {
            if (uiElements.leftArrow) {
                uiElements.leftArrow.addEventListener("click", () => {
                    console.log("Clic sur la flèche gauche");
                    updateIndex(config.currentIndex - 1);
                });
            }
            if (uiElements.rightArrow) {
                uiElements.rightArrow.addEventListener("click", () => {
                    console.log("Clic sur la flèche droite");
                    updateIndex(config.currentIndex + 1);
                });
            }

            if (uiElements.hasDots) {
                uiElements.dots.forEach((dot, index) => {
                    dot.addEventListener("click", () => {
                        console.log(`Clic sur le point ${index + 1}`);
                        updateIndex(index);
                    });
                });
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout des écouteurs d'événements :", error);
        }
    }

    function updateIndex(newIndex) {
        config.currentIndex = (newIndex + config.slides.length) % config.slides.length;
        updateDOM();
    }

    function updateDOM() {
        const currentSlide = config.slides[config.currentIndex];

        uiElements.bannerImg.src = `${config.imagePath}${currentSlide.image}`;
        uiElements.bannerImg.alt = `Slide ${config.currentIndex + 1}`;
        uiElements.tagline.innerHTML = currentSlide.tagLine; // Utiliser innerHTML pour conserver les balises HTML

        if (uiElements.hasDots) {
            uiElements.dots.forEach((dot, index) => {
                dot.classList.toggle("selected", index === config.currentIndex);
                dot.setAttribute("aria-current", index === config.currentIndex ? "true" : "false");
            });
        }
    }

    initUIElementsAndListeners();
    updateDOM();
});
