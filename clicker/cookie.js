// Initialisation du score et du compteur de clics
let score = 0;
let clickCount = 0;
let clickcountrick = 0;
let clickUpgradeCost = 100; // Coût pour améliorer le clic
let clickValue = 1; // Valeur initiale d'un clic

// Sélection des éléments du DOM
const scoreDisplay = document.getElementById('score');
const cookieButton = document.getElementById('cookie');
const backgroundMusic = document.getElementById('background-music');
const playMusicButton = document.getElementById('play-music');
const realMusicButton = document.getElementById('real-music'); // Nouveau bouton "Vraie Musique"
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');
const option1Button = document.getElementById('option1');
const option2Button = document.getElementById('option2');
const option3Button = document.getElementById('option3');
const option4Button = document.getElementById('option4');

// Génère un nombre de clics aléatoire entre 200 et 400 pour le Rick Roll
let randomRickRollClicks = Math.floor(Math.random() * (400 - 200 + 1)) + 200;

// Créer un objet audio pour la musique
let currentMusic = new Audio('musiquefond.mp3'); // Remplace par le chemin réel de la musique
let realMusic = new Audio('HEYYEYAAEYAAAEYAEYAA.mp3'); // La vraie musique, à remplacer par le bon chemin

// Fonction pour générer une position aléatoire sur l'écran
function getRandomPosition() {
    const maxWidth = window.innerWidth - cookieButton.offsetWidth;
    const maxHeight = window.innerHeight - cookieButton.offsetHeight;
    
    if (maxWidth <= 0 || maxHeight <= 0) {
        return { x: 0, y: 0 };
    }
    
    const randomX = Math.random() * maxWidth;
    const randomY = Math.random() * maxHeight;
    return { x: randomX, y: randomY };
}

// Fonction pour gérer le clic sur le cookie
cookieButton.addEventListener('click', () => {
    score += clickValue;
    scoreDisplay.textContent = `Score: ${score}`;
    clickCount++;
    clickcountrick++;

    const randomClicks = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
    if (clickCount >= randomClicks) {
        clickCount = 0;
        const newPos = getRandomPosition();
        cookieButton.style.left = `${newPos.x}px`;
        cookieButton.style.top = `${newPos.y}px`;
    }

    if (clickcountrick >= randomRickRollClicks) {
        clickcountrick = 0;
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        alert("🎶 You've been Rick Rolled! 🎶");
    }
});

// Fonction pour gérer la musique de fond
playMusicButton.addEventListener('click', () => {
    // Si de la musique est déjà en cours, on la stoppe
    if (!currentMusic.paused) {
        currentMusic.pause();
        currentMusic.currentTime = 0; // Remet la musique au début
    }
    
    // Joue la musique de fond
    currentMusic.play().catch((error) => {
        console.log("Erreur lors de la lecture de la musique :", error);
    });
    playMusicButton.style.display = 'none';
    realMusicButton.style.display = 'block';
});

// Fonction pour gérer l'ouverture et la fermeture du menu
menuButton.addEventListener('click', () => {
    // Génère une valeur aléatoire entre 0% et 80% pour `right`
    const randomRight = Math.random() * 80; // Limite pour éviter que le menu sorte de l'écran
    menu.style.right = `${randomRight}%`;
    menu.classList.toggle('active');
});

// Fonction pour gérer le bouton "Help"
option4Button.addEventListener('click', () => {
    alert("T'a vraiment besoin d'aide pour cliquer sur un bouton ? 🤷‍♂️🤦‍♀️");
});

// Fonction pour améliorer le clic
option1Button.addEventListener('click', () => {
    if (score >= clickUpgradeCost) {
        score -= clickUpgradeCost;
        clickValue++;
        clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5);
        scoreDisplay.textContent = `Score: ${score}`;
        alert(`Clic amélioré! Coût suivant: ${clickUpgradeCost} clics.`);
    } else {
        alert(`Vous n'avez pas assez de clics pour améliorer! Il vous faut ${clickUpgradeCost} clics.`);
    }
});

// Fonction pour le bouton Options
option2Button.addEventListener('click', () => {
    alert(
        "🎭 Menu Options 🎭\n\n" +
        "- Activer le mode inutile : ✅\n" +
        "- Désactiver la gravité : 🚀\n" +
        "- Couleur inverse (non disponible) : ❌\n" +
        "- Améliorer votre vie (bientôt disponible) : 🤡"
    );
});

// Fonction pour le bouton Statistiques
option3Button.addEventListener('click', () => {
    alert(
        "📊 Statistiques 📊\n\n" +
        `- Score actuel : ${score}\n` +
        `- Nombre de clics sur le cookie : ${clickCount + clickcountrick}\n` +
        `- Clics avant Rick Roll : ${
            randomRickRollClicks - clickcountrick
        }\n` +
        `- Statistiques inutiles : 42 🤓`
    );
});

// Fonction pour lancer la "vraie" musique
realMusicButton.addEventListener('click', () => {
    // Si de la musique est déjà en cours, on la stoppe
    if (!currentMusic.paused) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
    }

    // Lance la vraie musique
    realMusic.play().catch((error) => {
        console.log("Erreur lors de la lecture de la musique :", error);
    });

    realMusicButton.style.display = 'none';
    // playMusicButton.style.display = 'block'; // Pour revenir à la musique de fond si nécessaire
});

// Lancer la musique de fond dès que la page est prête
window.addEventListener('load', () => {
    currentMusic.play().catch((error) => {
        console.log("Erreur lors du démarrage de la musique de fond :", error);
    });
});
