const canvas = document.getElementById("jeu");
const ctx = canvas.getContext("2d");

const gameArea = document.getElementById("gameArea");
gameArea.style.backgroundColor = "transparent";
gameArea.style.backgroundImage = "none";



let joueur = { x: 50, y: 180, width: 70, height: 50, speed: 5, dy: 0 };
let obstacles = [];
let vagues = [];
let balles = [];
let score = 0;
let gameOver = false;
let vitesseBase = 4;
let vies = 3;
let dernierTir = 0;
const delaiEntreTirs = 2500;
const vitesseMax = 12;
let dernierObstacle = 0;
const intervalObstacle = 2000*(vitesseBase/6);



const konamiCode = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a"
];
let konamiIndex = 0;

window.addEventListener("keydown", (event) => {
    if (event.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            vies += 500;
            alert("Konami Code activé ! +500 vies");
            const gameArea = document.getElementById("gameArea");
            gameArea.style.backgroundImage = "url('konamicode.jpg')";
            gameArea.style.backgroundSize = "cover"; 
            gameArea.style.backgroundPosition = "center"; 
            konamiIndex = 0; 
        }
    } else {
        konamiIndex = 0;
    }
});

let coeurs = []; 
let bombes = [];
let tonneaux = []; 

let ia = { 
    x: canvas.width - 80, 
    y: canvas.height / 2, 
    width: 80, 
    height: 60, 
    speed: 3 
};

let missiles = []; 
let iaDetruite = false;
let dernierTirIA = 0; 
const delaiTirIA = 2000;
let tempsReapparitionIA = 12000; 
let tempsDetruite = 0; 



const obstacleImage = new Image();
const balleImage = new Image();
const coeurImage = new Image();
const bombeImage = new Image();
const tonneauImage = new Image();
const joueurImage = new Image();
const vagueImage = new Image();
const IAImage = new Image();
const missileImage = new Image();
obstacleImage.src = 'tronc_d_arbre.png';
balleImage.src = 'canon_ball.png';
coeurImage.src = 'coeur.png';
bombeImage.src = 'bombe.png';
tonneauImage.src = 'tonneau.png';
joueurImage.src = 'joueur.png';
vagueImage.src = 'vague.png';
IAImage.src = 'ia.png';
missileImage.src = 'missile.png';

let imagesChargees = false;

let iaActive = false; 
const delaiApparitionIA = 3000;

obstacleImage.onload = balleImage.onload = function () {
    imagesChargees = true;
};

function creerObstacle() {
    const obstacle = {
        x: canvas.width,
        y: Math.random() * (canvas.height - 100),
        width: 50,
        height: 100,
        speed: vitesseBase/1.65,
        image: obstacleImage
    };
    obstacles.push(obstacle);
}

function updateObstacles() {
    const maintenant = Date.now();

    if (maintenant - dernierObstacle >= intervalObstacle) {
        creerObstacle();
        dernierObstacle = maintenant; 
    }

    for (let obs of obstacles) {
        obs.x -= obs.speed;

        if (
            joueur.x < obs.x + obs.width &&
            joueur.x + joueur.width > obs.x &&
            joueur.y < obs.y + obs.height &&
            joueur.y + joueur.height > obs.y
        ) {
            vies--;
            obstacles = obstacles.filter(o => o !== obs);
            if (vies <= 0) {
                gameOver = true;
                vies = 0;
            }
        }
    }

    obstacles = obstacles.filter(obs => obs.x > -obs.width);
}



function creerVague() {
    const vague = {
        x: canvas.width,
        y: Math.random() * (canvas.height - 30),
        width: 200,
        height: 100,
        speed: 7,
        image: vagueImage
    };
    vagues.push(vague);
}

function updateVagues() {
    for (let vague of vagues) {
        vague.x -= vague.speed;

        if (
            joueur.x < vague.x + vague.width &&
            joueur.x + joueur.width > vague.x &&
            joueur.y < vague.y + vague.height &&
            joueur.y + joueur.height > vague.y
        ) {
            vies -= 3;
            vagues = vagues.filter(o => o !== vague);
            if (vies <= 0) {
                gameOver = true;
            }
        }
    }

    vagues = vagues.filter(vague => vague.x > -vague.width);

    if (score % 1000 === 999) {
        creerVague();
    }
}

function updateBalles() {
    for (let balle of balles) {
        balle.x += balle.speed;

        if (balle.x > canvas.width) {
            balles = balles.filter(b => b !== balle);
        }
        balle.x += balle.speed;

        if (balle.x > canvas.width) {
            balles = balles.filter(b => b !== balle);
            continue;
        }

        if (
            !iaDetruite &&
            balle.x < ia.x + ia.width &&
            balle.x + balle.width > ia.x &&
            balle.y < ia.y + ia.height &&
            balle.y + balle.height > ia.y
        ) {
            iaDetruite = true; 
            balles = balles.filter(b => b !== balle); 
            tempsDetruite = Date.now(); 
            break;
        }

        for (let obs of obstacles) {
            if (
                balle.x < obs.x + obs.width &&
                balle.x + balle.width > obs.x &&
                balle.y < obs.y + obs.height &&
                balle.y + balle.height > obs.y
            ) {
                obstacles = obstacles.filter(o => o !== obs);
                balles = balles.filter(b => b !== balle); 
                break;
            }
        }
    }
    
}

function updateJoueur() {
    joueur.y += joueur.dy;

    if (joueur.y < 0) joueur.y = 0;
    if (joueur.y + joueur.height > canvas.height) joueur.y = canvas.height - joueur.height;
}

let balle = null; 
let missile = null;

function tirerBalle() {
    const maintenant = Date.now();
    if (maintenant - dernierTir >= delaiEntreTirs) {
        const nouvelleBalle = {
            x: joueur.x + joueur.width,  
            y: joueur.y + joueur.height / 2 - 20, 
            width: 40, 
            height: 40,  
            speed: 13
        };

        balles.push(nouvelleBalle);

        console.log("Balle tirée :", nouvelleBalle);

        dernierTir = maintenant; 
    } else {
        console.log("Tir impossible, délai non écoulé !");
    }
    for (let balle of balles) {
    balle.x += balle.speed;

    if (balle.x > canvas.width) {
        balles = balles.filter(b => b !== balle);
        continue;
    }

    if (
        !iaDetruite &&
        balle.x < ia.x + ia.width &&
        balle.x + balle.width > ia.x &&
        balle.y < ia.y + ia.height &&
        balle.y + balle.height > ia.y
    ) {
        iaDetruite = true; 
        balles = balles.filter(b => b !== balle);
        tempsDetruite = Date.now();
        break;
    }
}
}

function creerCoeur(x, y) {
    const coeur = {
        x,
        y,
        width: 35,
        height: 35,
        speed: vitesseBase / 1.8
    };
    coeurs.push(coeur);
}

function creerBombe(x, y) {
    const bombe = {
        x,
        y,
        width: 35,
        height: 35,
        speed: vitesseBase / 1.8
    };
    bombes.push(bombe);
}

function creerTonneau() {
    const tonneau = {
        x: canvas.width,
        y: Math.random() * (canvas.height - 40),
        width: 50,
        height: 50,
        speed: vitesseBase / 1.65
    };
    tonneaux.push(tonneau);
}

function updateCoeurs() {
    for (let coeur of coeurs) {
        coeur.x -= coeur.speed;

        if (
            joueur.x < coeur.x + coeur.width &&
            joueur.x + joueur.width > coeur.x &&
            joueur.y < coeur.y + coeur.height &&
            joueur.y + joueur.height > coeur.y
        ) {
            vies = Math.min(vies + 1, 500);
            coeurs = coeurs.filter(c => c !== coeur);
        }
    }

    coeurs = coeurs.filter(coeur => coeur.x > -coeur.width);
}

function updateBombes() {
    for (let bombe of bombes) {
        bombe.x -= bombe.speed;

        for (let obs of obstacles) {
            if (
                bombe.x < obs.x + obs.width &&
                bombe.x + bombe.width > obs.x &&
                bombe.y < obs.y + obs.height &&
                bombe.y + bombe.height > obs.y
            ) {
                obstacles = obstacles.filter(o => o !== obs); 
                bombes = bombes.filter(b => b !== bombe);
                break;
            }
        }
        if (
            joueur.x < bombe.x + bombe.width &&
            joueur.x + joueur.width > bombe.x &&
            joueur.y < bombe.y + bombe.height &&
            joueur.y + joueur.height > bombe.y
        ) {
            vies -= 2;
            bombes = bombes.filter(o => o !== bombe);
            if (vies <= 0) {
                gameOver = true;
                vies = 0;
            }
        }

                
    }
    bombes = bombes.filter(bombe => bombe.x > -bombe.width);
}

function updateTonneaux() {
    for (let tonneau of tonneaux) {
        tonneau.x -= tonneau.speed;
        for (let balle of balles) {
            if (
                balle.x < tonneau.x + tonneau.width &&
                balle.x + balle.width > tonneau.x &&
                balle.y < tonneau.y + tonneau.height &&
                balle.y + balle.height > tonneau.y
            ) {
                balles = balles.filter(b => b !== balle);
                tonneaux = tonneaux.filter(t => t !== tonneau);

                if (Math.random() < 0.5) {
                    creerCoeur(tonneau.x, tonneau.y);
                } else {
                    creerBombe(tonneau.x, tonneau.y);
                }
                break; 
            }
        }

        if (
            joueur.x < tonneau.x + tonneau.width &&
            joueur.x + joueur.width > tonneau.x &&
            joueur.y < tonneau.y + tonneau.height &&
            joueur.y + joueur.height > tonneau.y
        ) {
            vies-=0.5; 
            tonneaux = tonneaux.filter(t => t !== tonneau); 

            if (vies <= 0) {
                gameOver = true;
                vies = 0;
            }
        }
    }
    tonneaux = tonneaux.filter(tonneau => tonneau.x > -tonneau.width);
}


function iaTirerMissile() {
    const missile = {
        x: ia.x - 10,
        y: ia.y + ia.height / 2 - 20,
        width: 40,
        height: 40,
        speed: -5
    };
    missiles.push(missile);
}

function activerIA() {
    iaActive = true; A
}


function updateIA() {
    if (!iaActive || iaDetruite) {
        if (iaDetruite && Date.now() - tempsDetruite >= tempsReapparitionIA) {
            iaDetruite = false;
            ia.x = canvas.width - 80;
            ia.y = canvas.height / 2;
        }
        return;
    }

    if (ia.y < joueur.y) {
        ia.y += ia.speed;
    } else if (ia.y > joueur.y) {
        ia.y -= ia.speed;
    }

    ia.y = Math.max(0, Math.min(canvas.height - ia.height, ia.y));

    if (
        ia.x < joueur.x + joueur.width &&
        ia.x + ia.width > joueur.x &&
        ia.y < joueur.y + joueur.height &&
        ia.y + ia.height > joueur.y
    ) {
        vies--; 
        if (vies <= 0) {
            gameOver = true;
        }
    }

    if (Date.now() - dernierTirIA >= delaiTirIA) {
        iaTirerMissile();
        dernierTirIA = Date.now();
    }
}


function updateMissiles() {
    for (let missile of missiles) {
        missile.x += missile.speed;

        if (missile.x + missile.width < 0) {
            missiles = missiles.filter(m => m !== missile);
            continue;
        }

        if (
            missile.x < joueur.x + joueur.width &&
            missile.x + missile.width > joueur.x &&
            missile.y < joueur.y + joueur.height &&
            missile.y + missile.height > joueur.y
        ) {
            vies--;
            missiles = missiles.filter(m => m !== missile); 
            if (vies <= 0) {
                gameOver = true;
            }
        }
    }
}


function dessiner() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(joueurImage, joueur.x, joueur.y, joueur.width, joueur.height);

    for (let obs of obstacles) {
        ctx.drawImage(obstacleImage, obs.x, obs.y, obs.width, obs.height);
    }

    for (let vague of vagues) {
        ctx.drawImage(vagueImage, vague.x, vague.y, vague.width, vague.height);
    }

    for (let balle of balles) {
        ctx.drawImage(balleImage, balle.x, balle.y, balle.width, balle.height);
    }

    for (let tonneau of tonneaux) {
        ctx.drawImage(tonneauImage, tonneau.x, tonneau.y, tonneau.width, tonneau.height);
    }

    for (let coeur of coeurs) {
        ctx.drawImage(coeurImage, coeur.x, coeur.y, coeur.width, coeur.height);
    }

    for (let bombe of bombes) {
        ctx.drawImage(bombeImage, bombe.x, bombe.y, bombe.width, bombe.height);
    }

    ctx.drawImage(joueurImage, joueur.x, joueur.y, joueur.width, joueur.height);

ctx.fillStyle = "orange";
for (let missile of missiles) {
    ctx.drawImage(missileImage, missile.x, missile.y, missile.width, missile.height);
}

if (!iaDetruite) {
    ctx.fillStyle = "purple";
    ctx.drawImage(IAImage, ia.x, ia.y, ia.width, ia.height);
}

    ctx.fillStyle = "yellow";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
    ctx.fillText(`Vies: ${vies}`, 10, 40);

    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
    }
}

function gameLoop() {
    setTimeout(activerIA, delaiApparitionIA);

    if (gameOver) return;

    updateJoueur();
    updateObstacles();
    updateVagues();
    updateBalles();
    updateCoeurs();
    updateBombes();
    updateTonneaux();
    updateMissiles();
    updateIA();

    score++;

    dessiner();

    requestAnimationFrame(gameLoop);
}

setInterval(creerTonneau, 5000);

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
        joueur.dy = -joueur.speed;
    } else if (event.key === "ArrowDown") {
        joueur.dy = joueur.speed;
    } else if (event.key === " ") {
        tirerBalle();
    }
});

document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        joueur.dy = 0;
    }
});

gameLoop();
