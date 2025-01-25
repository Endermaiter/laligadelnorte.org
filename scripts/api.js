
const API_KEY = 'RGAPI-481cec0f-c653-401b-a9de-50bc47ad3bd2';
const continent = 'europe';
const playersJsonFilePath = '../data/players_pruebas.json'

async function loadPUUID() {

    try {

        const playerList = await getPlayerListFromJSON();
        console.log(playerList);
        let puuIDList = [];
        for (let i = 0; i < playerList.length; i++) {
            const summonerName = playerList[i].summonerName;
            const summonerTag = playerList[i].tag;
            let summonerNameParsed = `${summonerName.replace(/ /g, '%20')}`;
            const url = `https://${continent}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerNameParsed}/${summonerTag}?api_key=${API_KEY}`;
            console.log(url);
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                puuIDList.push(data.puuid)
            } else {
                throw new Error('No se pudo obtener la información del invocador.');
            }
            await sleep(500)
        }
        console.log(puuIDList);
        return puuIDList;
    } catch (error) {
        document.getElementById('player1').textContent = `Error: ${error.message}`;
    }
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
            console.log(`Processing ${key}:`, value);
            playerList.push(value);
        });
        return playerList;

    } catch (error) {
        console.error('Error:', error.message);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', loadPUUID);