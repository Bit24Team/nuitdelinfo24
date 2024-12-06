// script.js
const operand1 = document.getElementById('operand1');
const operand2 = document.getElementById('operand2');
const decrement1 = document.getElementById('decrement1');
const decrement2 = document.getElementById('decrement2');
const count1 = document.getElementById('count1');
const count2 = document.getElementById('count2');
const operators = document.querySelectorAll('.operator');
const result = document.getElementById('result');

let countOperand1 = 0;
let countOperand2 = 0;

// Fonction pour convertir un nombre en toutes lettres
function numberToWords(num) {
    const belowTwenty = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
    const tens = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];

    if (num < 20) return belowTwenty[num];
    if (num < 100) {
        let unit = num % 10;
        let ten = Math.floor(num / 10);
        return tens[ten] + (unit ? "-" + belowTwenty[unit] : "");
    }
    if (num < 1000) {
        let hundred = Math.floor(num / 100);
        let rest = num % 100;
        return (hundred > 1 ? belowTwenty[hundred] + " cent" : "cent") + (rest ? " " + numberToWords(rest) : "");
    }
    return "nombre trop grand"; // Limitation à 999 pour cette fonction
}

// Gestion des clics pour incrémenter les opérandes
operand1.addEventListener('click', () => {
    countOperand1++;
    count1.textContent = countOperand1;
});

operand2.addEventListener('click', () => {
    countOperand2++;
    count2.textContent = countOperand2;
});

// Gestion des clics pour décrémenter les opérandes
decrement1.addEventListener('click', () => {
    if (countOperand1 > 0) countOperand1--;
    count1.textContent = countOperand1;
});

decrement2.addEventListener('click', () => {
    if (countOperand2 > 0) countOperand2--;
    count2.textContent = countOperand2;
});

// Gestion des clics sur les opérateurs
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        const op = operator.getAttribute('data-operator');
        let computation;

        switch (op) {
            case '+':
                computation = countOperand2 - countOperand1;
                break;
            case '-':
                computation = countOperand2 * countOperand1;
                break;
            case '*':
                computation = countOperand1 !== 0 ? countOperand2 / countOperand1 : "Erreur: Division par zéro";
                break;
            case '/':
                computation = countOperand2 + countOperand1; "Erreur: Division par zéro";
                break;
        }

        if (typeof computation === 'number' && computation >= 0) {
            result.textContent = `${numberToWords(countOperand1)} ${op} ${numberToWords(countOperand2)} = ${numberToWords(Math.floor(computation))}`;
        } else {
            result.textContent = "Résultat invalide ou hors limites.";
        }

        // Réinitialisation des opérandes après affichage du résultat
        countOperand1 = 0;
        countOperand2 = 0;
        count1.textContent = countOperand1;
        count2.textContent = countOperand2;
    });
});

// Fonction pour mélanger les opérateurs
function shuffleOperators() {
    const operatorsContainer = document.querySelector('.operators');
    const operatorsArray = Array.from(operatorsContainer.children);

    // Mélange aléatoire des opérateurs
    operatorsArray.sort(() => Math.random() - 0.5);

    // Réafficher les opérateurs dans le conteneur
    operatorsArray.forEach(operator => operatorsContainer.appendChild(operator));
}

// Appeler la fonction shuffleOperators toutes les secondes
setInterval(shuffleOperators, Math.random()*300);

