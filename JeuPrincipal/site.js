const container = document.getElementById('image-container');
        
// Fonction pour créer une zone cliquable
function createClickableZone(x, y, text, zoneClass) {
    const zone = document.createElement('div');
    zone.className = `clickable-zone ${zoneClass}`; // Correction de la syntaxe de la classe
    zone.style.position = 'absolute'; // Nécessaire pour les positions 'left' et 'top'
    zone.style.left = `${x}px`;
    zone.style.top = `${y}px`;
    zone.style.width = 'auto'; // Définir la taille des zones cliquables
    zone.style.height = '55px';
    zone.style.cursor = 'pointer';

    // Ajouter un rectangle avec texte au clic
    zone.addEventListener('click', () => {
        const existingPopup = document.querySelector('.popup');
        if (existingPopup) existingPopup.remove(); // Supprime les anciennes popups

        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.style.position = 'absolute';
        popup.style.left = `${x + 40}px`;
        popup.style.top = `${y}px`;
        popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        popup.style.color = 'white';
        popup.style.padding = '10px';
        popup.style.borderRadius = '5px';

        const textNode = document.createElement('div');
        textNode.textContent = text;


        popup.addEventListener('click', () => {
            popup.remove();
        });

        popup.appendChild(textNode);
        container.appendChild(popup);
        popup.style.display = 'block';
    });

    container.appendChild(zone);
}

// Coordonnées pour les zones cliquables (sur l'image donnée)
const zones = [
    { x: 171, y: 50, text: 'Tête: Callote glaciaire', className: 'zone-1' },
    { x: 185, y: 350, text: 'Fesse: Déchets indésirables', className: 'zone-2' },
    { x: 450, y: 220, text: 'Fibre musculaire: Énergie graisse', className: 'zone-3' },
    { x: 265, y: 270, text: 'Peau: Réaction pollution', className: 'zone-4' },
    { x: 538, y: 30, text: 'ADN: Flux d\'inforation', className: 'zone-5' },
    { x: 185, y: 180, text: 'Oxygene: Phyto-plancton', className: 'zone-6' },
    { x: 185, y: 270, text: 'Intestin: Microbiote', className: 'zone-7' },
    { x: 545, y: 180, text: 'Poumon: Production d\'oxygene part les micro-organismes', className: 'zone-8' },
    { x: 600, y: 155, text: 'Vaisseaux sanguins: Régulation de la temperature', className: 'zone-9' },
    { x: 545, y: 350, text: 'Testicule: Disparition d\'espèce.', className: 'zone-10' }
];

zones.forEach(zone => createClickableZone(zone.x, zone.y, zone.text, zone.className));