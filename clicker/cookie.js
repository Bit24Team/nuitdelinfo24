// Initialisation du score
let score = 0;
let clickCount = 0;

// Sélection des éléments du DOM
const scoreDisplay = document.getElementById('score');
const cookieButton = document.getElementById('cookie');

// Fonction pour générer une position aléatoire sur l'écran
function getRandomPosition() {
    const maxWidth = window.innerWidth - cookieButton.offsetWidth; // Largeur maximale disponible
    const maxHeight = window.innerHeight - cookieButton.offsetHeight; // Hauteur maximale disponible
    const randomX = Math.random() * maxWidth; // Position X aléatoire
    const randomY = Math.random() * maxHeight; // Position Y aléatoire
    return { x: randomX, y: randomY };
}

// Fonction pour gérer le clic sur le cookie
cookieButton.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    clickCount++;

    // Change la position du bouton après un nombre aléatoire de clics entre 5 et 20
    const randomClicks = Math.floor(Math.random() * (20 - 5 + 1)) + 5; // Nombre de clics entre 5 et 20
    if (clickCount >= randomClicks) {
        clickCount = 0; // Réinitialise le compteur de clics
        const newPos = getRandomPosition(); // Obtenir une nouvelle position aléatoire
        cookieButton.style.left = `${newPos.x}px`; // Applique la nouvelle position X
        cookieButton.style.top = `${newPos.y}px`;  // Applique la nouvelle position Y
    }
});
