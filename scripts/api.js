
const API_KEY = 'RGAPI-481cec0f-c653-401b-a9de-50bc47ad3bd2';
const continent = 'europe';
const server = 'euw'
const playersJsonFilePath = '../data/players_pruebas.json'

async function loadPUUID() {

    try {

        const playerList = await getPlayerListFromJSON();
        console.log(playerList);
        let puuIDList = [];
        for (let i = 0; i < playerList.length; i++) {
            const summonerName = playerList[i].lol.summonerName;
            const summonerTag = playerList[i].lol.tag;
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

async function showSummonerNames() {
    // Asegúrate de que esta función retorne un array de objetos
    const playerList = await getPlayerListFromJSON();

    // Itera sobre la lista de jugadores
    for (let i = 0; i < playerList.length; i++) {
        const summonerName = playerList[i].lol.summonerName;
        const summonerTag = playerList[i].lol.tag;

        const div = document.querySelector(`#player${i + 1}_summonerName`);

        if (div) {
            div.textContent = `${summonerName} #${summonerTag}`;
        } else {
            console.error(`No se encontró un elemento con el ID player${i + 1}`);
        }
    }
}

async function setOPGGLinks() {
    const playerList = await getPlayerListFromJSON();
    for (let i = 0; i < playerList.length; i++) {
        const summonerName = playerList[i].lol.summonerName;
        const summonerTag = playerList[i].lol.tag;
        const playerDiv = document.getElementById(`player${i+1}`);
        let summonerNameParsed = `${summonerName.replace(/ /g, '%20')}`;
        const link = document.createElement('a');
        link.href = `https://www.op.gg/summoners/${server}/${summonerNameParsed}-${summonerTag}`;
        link.target = '_blank';
        link.textContent = 'Haz clic aquí para ver más detalles';
        playerDiv.addEventListener('click', function() {
        window.open(link.href, '_blank');
        });
    }
}

document.addEventListener('DOMContentLoaded', loadPUUID);
document.addEventListener('DOMContentLoaded', showSummonerNames);
document.addEventListener('DOMContentLoaded', setOPGGLinks);