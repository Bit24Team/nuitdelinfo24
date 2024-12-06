const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; // Clé trouvé sur github, merci lalithabacies !
const oceanCoordinates = { lat: 35, lon: 20 }; //Coordonnées de la mer méditerrannée

document.addEventListener("DOMContentLoaded", () => {
    // Charger les données météo
    fetchWeatherData();
});

function fetchWeatherData() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${oceanCoordinates.lat}&lon=${oceanCoordinates.lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
            updateEcosystemInfo(data);
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données météo :", error);
            document.getElementById("weather-info").textContent = "Impossible de charger les données météo.";
        });
}

function displayWeatherData(data) {
    const temp = data.main.temp;
    const weatherInfo = `
        <p>Température actuelle de l'eau : <strong>${temp}°C</strong></p>
        <p>Conditions météorologiques : <strong>${data.weather[0].description}</strong></p>
    `;
    document.getElementById("weather-info").innerHTML = weatherInfo;
}

function updateEcosystemInfo(data) {
    const temp = data.main.temp;
    let ecosystemMessage;

    if (temp > 25) {
        ecosystemMessage = "Les eaux plus chaudes peuvent entraîner un blanchiment des coraux et perturber les écosystèmes marins.";
    } else if (temp < 15) {
        ecosystemMessage = "Les températures froides ralentissent la reproduction des espèces marines sensibles.";
    } else {
        ecosystemMessage = "Les températures actuelles sont favorables à une biodiversité marine équilibrée.";
    }

    document.getElementById("ecosystem-info").textContent = ecosystemMessage;
}

function checkAnswer(answer) {
    const result = document.getElementById("game-result");

    if (answer === "negative") {
        result.textContent = "Correct ! Une hausse des températures entraîne le blanchiment des coraux.";
        result.style.color = "green";
    } else {
        result.textContent = "Incorrect. Les récifs coralliens souffrent des températures élevées.";
        result.style.color = "red";
    }
}
