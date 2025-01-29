
const playersJsonFilePath = '../data/players.json'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getPlayerListFromJSON() {
    try {
        const response = await fetch(playersJsonFilePath);
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }

        const players = await response.json();

        const playerList = [];

        Object.entries(players).forEach(([key, value]) => {
            playerList.push(value);
        });
        return playerList;

    } catch (error) {
        console.error('Error:', error.message);
    }
}

export { sleep, getPlayerListFromJSON };