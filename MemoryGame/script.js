const cardsArray = [
    { name: "A", img: "1.png" },
    { name: "B", img: "1.png" },
    { name: "C", img: "1.png" },
    { name: "D", img: "1.png" },
    { name: "A", img: "2.png" },
    { name: "B", img: "2.png" },
    { name: "C", img: "2.png" },
    { name: "D", img: "2.png" },
  ];
  
  const memoryGame = document.getElementById("memory-game");
  const startButton = document.getElementById("start-button");
  const winMessage = document.getElementById("win-message");
  let shuffledCards = shuffle([...cardsArray]);
  let matchedPairs = 0;
  let gameStarted = false;
  
  // Mélanger les cartes
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  // Générer les cartes
  function createCards() {
    shuffledCards.forEach((card) => {
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
      cardInner.appendChild(backFace);
  
      cardElement.dataset.name = card.name;
      memoryGame.appendChild(cardElement);
    });
  }
  
  // Montrer toutes les cartes brièvement
  function showAllCards() {
    document.querySelectorAll(".card").forEach((card) => card.classList.add("flip"));
    setTimeout(() => {
      document.querySelectorAll(".card").forEach((card) => card.classList.remove("flip"));
      addCardEventListeners();
      gameStarted = true;
    }, 2000); // 2 secondes avant de les retourner
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
  
  // Désactiver les cartes correspondantes
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    matchedPairs++;
    resetBoard();
  
    if (matchedPairs === cardsArray.length / 2) {
      setTimeout(() => {
        winMessage.classList.remove("hidden");
      }, 500);
    }
  }
  
  // Retourner les cartes si elles ne correspondent pas
  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1000);
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
  });
  