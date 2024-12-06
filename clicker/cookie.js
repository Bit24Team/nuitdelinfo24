// Initialisation des variables globales 
let score = 0;
let clickCount = 0;
let clickcountrick = 0;
let clickUpgradeCost = 100; // Coût pour améliorer le clic
let clickValue = 1; // Valeur initiale d'un clic

// Sélection des éléments du DOM
const scoreDisplay = document.getElementById('score');
const cookieButton = document.getElementById('cookie');
const playMusicButton = document.getElementById('play-music');
const realMusicButton = document.getElementById('real-music');
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');
const option1Button = document.getElementById('option1');
const option2Button = document.getElementById('option2');
const option3Button = document.getElementById('option3');
const option4Button = document.getElementById('option4');

// Génère un nombre de clics aléatoire pour déclencher un Rick Roll
let randomRickRollClicks = Math.floor(Math.random() * (400 - 200 + 1)) + 200;

// Gestion de la musique
let currentMusic = new Audio('musiquefond.mp3');
let realMusic = new Audio('HEYYEYAAEYAAAEYAEYAA.mp3');
let goutteMusic = new Audio('Goutte.mp3');
// Fonction pour générer une position aléatoire
function getRandomPosition() {
    const maxWidth = window.innerWidth - cookieButton.offsetWidth;
    const maxHeight = window.innerHeight - cookieButton.offsetHeight;

    return {
        x: Math.random() * maxWidth,
        y: Math.random() * maxHeight,
    };
}

// Gestion des clics sur le cookie
cookieButton.addEventListener('click', () => {
    score += clickValue;
    scoreDisplay.textContent = `Score: ${score}`;
    clickCount++;
    clickcountrick++;
    goutteMusic.play();
    // Déplace le cookie après un certain nombre de clics
    const randomClicks = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
    if (clickCount >= randomClicks) {
        clickCount = 0;
        const newPos = getRandomPosition();
        cookieButton.style.left = `${newPos.x}px`;
        cookieButton.style.top = `${newPos.y}px`;
    }

    // Rick Roll aléatoire
    if (clickcountrick >= randomRickRollClicks) {
        clickcountrick = 0;
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        alert("🎶 You've been Rick Rolled! 🎶");
    }
});

// Gestion de la musique
playMusicButton.addEventListener('click', () => {
    currentMusic.play();
    playMusicButton.style.display = 'none';
    realMusicButton.style.display = 'block';
});

realMusicButton.addEventListener('click', () => {
    currentMusic.pause();
    currentMusic.currentTime = 0;
    realMusic.play();
    realMusicButton.style.display = 'none';
});

// Gestion du menu
menuButton.addEventListener('click', () => {
    // On affiche ou cache le menu lorsque l'on clique sur le bouton "Menu"
    menu.classList.toggle('active');
});

// Fonction pour générer une couleur hexadécimale aléatoire
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Fonction pour changer la couleur de fond à chaque clic sur une option
option3Button.addEventListener('click', () => {
    document.body.style.backgroundColor = getRandomColor();
});

// Amélioration du clic
option1Button.addEventListener('click', () => {
    if (score >= clickUpgradeCost) {
        score -= clickUpgradeCost;
        clickValue++;
        clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5);
        scoreDisplay.textContent = `Score: ${score}`;
        alert(`Clic amélioré! Coût suivant: ${clickUpgradeCost} clics.`);
    } else {
        alert(`Pas assez de clics ! Il vous faut ${clickUpgradeCost} clics.`);
    }
});

// Statistiques
option2Button.addEventListener('click', () => {
    alert(
        `📊 Statistiques 📊\n\n- Score actuel : ${score}\n- Valeur de clic : ${clickcountrick}\n`
    );
});

// Aide
option4Button.addEventListener('click', () => {
    alert("Cliquez sur les boutons pour jouer. 🤷‍♂️");
});

// Création d'une fenêtre qui fuit la souris
function createEvadingWindow() {
    const evadingWindow = document.createElement('div');
    evadingWindow.textContent = "Catch me!";
    evadingWindow.style.position = 'absolute';
    evadingWindow.style.width = '150px';
    evadingWindow.style.height = '100px';
    evadingWindow.style.backgroundColor = 'lightblue';
    evadingWindow.style.border = '2px solid blue';
    evadingWindow.style.borderRadius = '10px';
    evadingWindow.style.textAlign = 'center';
    evadingWindow.style.lineHeight = '100px';
    evadingWindow.style.cursor = 'pointer';
    evadingWindow.style.zIndex = '1000';
    document.body.appendChild(evadingWindow);

    // Déplace la fenêtre à une position aléatoire
    function moveWindow() {
        const position = getRandomPosition();
        evadingWindow.style.left = `${position.x}px`;
        evadingWindow.style.top = `${position.y}px`;
    }

    // Déplace la fenêtre si la souris s'approche
    document.addEventListener('mousemove', (event) => {
        const rect = evadingWindow.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(event.clientX - (rect.left + rect.width / 2), 2) +
            Math.pow(event.clientY - (rect.top + rect.height / 2), 2)
        );

        if (distance < 150) {
            moveWindow();
        }
    });

    // Supprime la fenêtre après 10 secondes
    setTimeout(() => {
        document.body.removeChild(evadingWindow);
    }, 10000);
}

// Fait apparaître une fenêtre fuyante à intervalles aléatoires
function spawnEvadingWindow() {
    const randomDelay = Math.random() * 3 * 60 ; // Entre 0 et 3 minutes
    setTimeout(() => {
        createEvadingWindow();
        spawnEvadingWindow(); // Relance le spawn
    }, randomDelay);
}

// Lancer les fenêtres fuyantes
spawnEvadingWindow();
