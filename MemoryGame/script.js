const cardsArray = [
    { id: 1, name: "1", img: "images/card1.png" },
    { id: 2, name: "1", img: "images/card2.png" },
    { id: 3, name: "2", img: "images/card3.png" },
    { id: 4, name: "2", img: "images/card4.png" },
    { id: 5, name: "3", img: "images/card5.png" },
    { id: 6, name: "3", img: "images/card6.png" },
    { id: 7, name: "4", img: "images/card7.png" },
    { id: 8, name: "4", img: "images/card8.png" },
    { id: 9, name: "5", img: "images/card9.png" },
    { id: 10, name: "5", img: "images/card10.png" },
    { id: 11, name: "6", img: "images/card11.png" },
    { id: 12, name: "6", img: "images/card12.png" },
    { id: 13, name: "7", img: "images/card13.png" },
    { id: 14, name: "7", img: "images/card14.png" },
    { id: 15, name: "8", img: "images/card15.png" },
    { id: 16, name: "8", img: "images/card16.png" },
    { id: 17, name: "9", img: "images/card17.png" },
    { id: 18, name: "9", img: "images/card18.png" },
    { id: 19, name: "10", img: "images/card19.png" },
    { id: 20, name: "10", img: "images/card20.png" }
];

// Tableau de couleurs pour chaque paire de cartes
const colors = [
    "#FF6347",
    "#4682B4",
    "#32CD32",
    "#FFD700",
    "#8A2BE2",
    "#FF4500",
    "#2E8B57",
    "#00CED1",
    "#FF0548",
    "#FF1493",
];

const memoryGame = document.getElementById("memory-game");
const startButton = document.getElementById("start-button");
const winMessage = document.getElementById("win-message");
const replayButton = document.getElementById("replay-button");
const timerDisplay = document.getElementById("timer");
const highscoreDisplay = document.getElementById("highscore");
const finalTimeDisplay = document.getElementById("final-time");
const flipSound = new Audio("sound/flipcard.mp3");
const cardSound = new Audio("sound/card.mp3");
const winSound = new Audio("sound/win.mp3");
const tiktakSound = new Audio("sound/tiktak.mp3");

let shuffledCards = shuffle([...cardsArray]);
let matchedPairs = 0;
let gameStarted = false;
let timer = 0;
let timerInterval = null;

// Supprimer le highscore du localStorage lors du rechargement de la page
localStorage.removeItem("highscore");

// Initialiser le highscore à partir du localStorage
let highscore = localStorage.getItem("highscore");
if (highscore) {
    highscoreDisplay.textContent = `🏆 Meilleur temps : ${highscore}s`;
} else {
    highscoreDisplay.textContent = `🏆 Meilleur temps : --`;
}


// Mélanger les cartes
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Générer les cartes
function createCards() {
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");
        cardElement.appendChild(cardInner);

        const frontFace = document.createElement("div");
        frontFace.classList.add("front");
        cardInner.appendChild(frontFace);

        const backFace = document.createElement("div");
        backFace.classList.add("back");
        backFace.style.backgroundImage = `url('${card.img}')`;

        // Affecter la couleur du contour à chaque paire de cartes
        const pairColor = colors[parseInt(card.name) - 1]; // Trouver la couleur correspondante à la paire
        backFace.style.border = `5px solid ${pairColor}`; // Ajouter un contour visible

        cardInner.appendChild(backFace);

        cardElement.dataset.name = card.name;
        memoryGame.appendChild(cardElement);
    });
}



// Montrer toutes les cartes brièvement
function showAllCards() {
    document.querySelectorAll(".card").forEach((card) => card.classList.add("flip"));
    cardSound.play();
    setTimeout(() => {
        document.querySelectorAll(".card").forEach((card) => card.classList.remove("flip"));
            setTimeout(() => {
                const flipSound = new Audio("sound/flipcard.mp3");
                flipSound.play(); // Jouer le son
            }, 100);
            setTimeout(() => {
                const flipSound = new Audio("sound/flipcard.mp3");
                flipSound.play(); // Jouer le son
            }, 150);
            setTimeout(() => {
                const flipSound = new Audio("sound/flipcard.mp3");
                flipSound.play(); // Jouer le son
            }, 200);
        addCardEventListeners();
        startTimer();
        gameStarted = true;
    }, 5000); // 2 secondes avant de les retourner
}

// Ajouter l’événement de clic aux cartes
function addCardEventListeners() {
    document.querySelectorAll(".card").forEach((card) =>
        card.addEventListener("click", flipCard)
    );
}

// Retourner une carte
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard() {
    if (!gameStarted || lockBoard || this === firstCard) return;

    const flipSound = new Audio("sound/flipcard.mp3");
    flipSound.play(); // Jouer le son

    this.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Vérifier si les cartes correspondent
function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

// Retourner les cartes si elles ne correspondent pas
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 600);
}

// Réinitialiser les variables
function resetBoard() {
    [hasFlippedCard, lockBoard, firstCard, secondCard] = [false, false, null, null];
}

// Initialiser le jeu
startButton.addEventListener("click", () => {
    startButton.style.display = "none"; // Cacher le bouton
    createCards();
    showAllCards();
    lockBoard = false; // Débloquer le plateau
});

// Redémarrer le jeu avec le bouton rejouer
replayButton.addEventListener("click", () => {
    resetGame();
});

// Démarrer le timer
function startTimer() {
    timer = 0;
    timerInterval = setInterval(() => {
        timer++;
        tiktakSound.play();
        timerDisplay.textContent = `⏱ Temps : ${timer}s`;
    }, 1000);
}

// Arrêter le timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Désactiver les cartes correspondantes
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    matchedPairs++;
    resetBoard();

    if (matchedPairs === cardsArray.length / 2) {
        setTimeout(() => {
            stopTimer();
            winMessage.classList.remove("hidden");
            finalTimeDisplay.textContent = timer;

            // Mettre à jour le highscore si nécessaire
            if (!highscore || timer < highscore) {
                localStorage.setItem("highscore", timer);
                winSound.play();
                highscoreDisplay.textContent = `🏆 Meilleur temps : ${timer}s`;
            }
        }, 500);
        lockBoard = true; // Bloquer le plateau après la victoire
    }
}

// Réinitialiser le jeu
function resetGame() {
    clearInterval(timerInterval);
    memoryGame.innerHTML = "";
    shuffledCards = shuffle([...cardsArray]);
    matchedPairs = 0;
    gameStarted = false;
    timer = 0;
    timerDisplay.textContent = `⏱ Temps : 0s`;
    winMessage.classList.add("hidden");
    startButton.style.display = "inline";
}