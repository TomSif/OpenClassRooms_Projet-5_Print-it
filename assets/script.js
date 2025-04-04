document.addEventListener("DOMContentLoaded", () => {
    // Configuration du carrousel
    const slides = [
        { 
            image: "slide1.jpg", 
            tagLine: "Impressions tous formats <span>en boutique et en ligne</span>",
            description: "Notre service d'impression s'adapte à tous vos besoins, que ce soit pour des affiches, des flyers ou des cartes de visite. Disponible en ligne ou directement en magasin."
        },
        { 
            image: "slide2.jpg", 
            tagLine: "Tirages haute définition grand format <span>pour vos bureaux et events</span>",
            description: "Nos impressions grand format offrent une qualité exceptionnelle pour vos événements professionnels, salons ou décoration de bureaux. Résolution garantie même pour les très grands formats."
        },
        { 
            image: "slide3.jpg",
            tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>",
            description: "Notre technologie d'impression permet une reproduction fidèle des couleurs, du CMJN standard aux teintes Pantone spécifiques pour votre identité visuelle."
        },
        { 
            image: "slide4.png", 
            tagLine: "Autocollants <span>avec découpe laser sur mesure</span>",
            description: "Créez des autocollants personnalisés avec notre service de découpe laser de précision. Formes complexes et finitions impeccables garanties."
        }
    ];
    
    const imagePath = "./assets/images/slideshow/";
    let currentIndex = 0;
    let bannerImg, tagline, dotsContainer;
    let carouselModal, modalTitle, modalBody;
    let modalOpen = false;
    
    // Initialisation du carrousel
    function init() {
        try {
            // Initialisation de la modale
            carouselModal = document.getElementById("carousel-modal");
            modalTitle = document.getElementById("modal-title");
            modalBody = document.getElementById("modal-body");
            
            if (!carouselModal) throw new Error("Élément #carousel-modal manquant");
            
            // Configuration de la fermeture de la modale
            document.getElementById("modal-close").addEventListener("click", () => {
                carouselModal.close();
                modalOpen = false;
            });
            
            // Événement pour détecter quand la modale est fermée (via Escape ou clic sur backdrop)
            carouselModal.addEventListener("close", () => {
                modalOpen = false;
            });
            
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
            
            // Vérification de l'existence des images
            checkImagesExistence().then(missingImages => {
                if (missingImages.length > 0) {
                    throw new Error(`Images manquantes: ${missingImages.join(', ')}`);
                }
                
                // Configuration de l'interface
                setupDOM(banner);
                setupNavigation(arrowLeft, arrowRight);
                updateCarousel();
            }).catch(error => {
                console.error(`Erreur lors de la vérification des images: ${error.message}`);
                showErrorModal(`Erreur lors de la vérification des images: ${error.message}`);
            });
            
            return true;
        } catch (error) {
            console.error(`Erreur d'initialisation du carrousel: ${error.message}`);
            // Affichage de l'erreur dans la modale
            showErrorModal(`Erreur d'initialisation du carrousel: ${error.message}`);
            return false;
        }
    }
    
    // Vérification de l'existence des images
    async function checkImagesExistence() {
        const missingImages = [];
        
        for (const slide of slides) {
            const imgPath = `${imagePath}${slide.image}`;
            try {
                const response = await fetch(imgPath, { method: 'HEAD' });
                if (!response.ok) {
                    missingImages.push(slide.image);
                }
            } catch (error) {
                missingImages.push(slide.image);
            }
        }
        
        return missingImages;
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
        
        // Ajout du bouton d'information
        const infoButton = document.createElement("button");
        infoButton.className = "info-button";
        infoButton.innerHTML = "i";
        infoButton.setAttribute("aria-label", "Plus d'informations");
        infoButton.addEventListener("click", () => {
            if (modalOpen) {
                carouselModal.close();
                modalOpen = false;
            } else {
                showInfoModal();
                modalOpen = true;
            }
        });
        banner.appendChild(infoButton);
    }
    
    // Configuration de la navigation
    function setupNavigation(arrowLeft, arrowRight) {
        // Fonction de navigation avec boucle infinie grâce au modulo
        function navigate(direction) {
            currentIndex = (currentIndex + direction + slides.length) % slides.length;
            updateCarousel();
            
            // Si la modale est ouverte, mettre à jour son contenu
            if (modalOpen) {
                updateModalContent();
            }
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
                navigate(-1);
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
    
    // Mise à jour du contenu de la modale avec l'image actuelle
    function updateModalContent() {
        const currentSlide = slides[currentIndex];
        modalTitle.textContent = currentSlide.tagLine.replace(/<[^>]*>/g, '');
        modalBody.innerHTML = `
            <div class="modal-image">
                <img src="${imagePath}${currentSlide.image}" alt="${currentSlide.tagLine.replace(/<[^>]*>/g, '')}" style="max-width: 100%;">
            </div>
            <p>${currentSlide.description}</p>
        `;
    }
    
    // Affichage de la modale d'erreur
    function showErrorModal(errorMessage) {
        modalTitle.textContent = "Erreur";
        modalBody.innerHTML = `<p class="error-message">${errorMessage}</p>
                             <p>Veuillez rafraîchir la page ou contacter l'administrateur si le problème persiste.</p>`;
        carouselModal.showModal();
        modalOpen = true;
    }
    
    // Affichage de la modale d'information
    function showInfoModal() {
        updateModalContent();
        carouselModal.showModal();
        modalOpen = true;
    }
    
    // Démarrage 
    init();
});