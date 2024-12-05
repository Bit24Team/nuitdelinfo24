       // Initialisation du score
       let score = 0;

       // Variables pour les améliorations
       let autoClickerCost = 10;
       let autoClickerActive = false;

       // Sélection des éléments du DOM
       const scoreDisplay = document.getElementById('score');
       const cookieButton = document.getElementById('cookie');
       const autoClickerButton = document.getElementById('auto-clicker');

       // Fonction pour gérer le clic sur le cookie
       cookieButton.addEventListener('click', () => {
           score++;
           scoreDisplay.textContent = `Score: ${score}`;
       });

       // Fonction pour acheter un Auto-Clicker
       autoClickerButton.addEventListener('click', () => {
           if (score >= autoClickerCost && !autoClickerActive) {
               score -= autoClickerCost;
               scoreDisplay.textContent = `Score: ${score}`;
               autoClickerActive = true;
               autoClickerButton.disabled = true;
               activateAutoClicker();
           }
       });

       // Fonction pour activer l'Auto-Clicker
       function activateAutoClicker() {
           setInterval(() => {
               score++;
               scoreDisplay.textContent = `Score: ${score}`;
           }, 1000); // Ajoute un point toutes les secondes
       }