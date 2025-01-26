
import * as Utils from './utils.js'
import * as api from './api.js'

const server = 'euw'

async function setOPGGLinks() {
    const playerList = await Utils.getPlayerListFromJSON();
    for (let i = 0; i < playerList.length; i++) {
        const summonerName = playerList[i].lol.summonerName;
        const summonerTag = playerList[i].lol.tag;
        const playerDiv = document.getElementById(`player${i + 1}`);
        let summonerNameParsed = `${summonerName.replace(/ /g, '%20')}`;
        const link = document.createElement('a');
        link.href = `https://www.op.gg/summoners/${server}/${summonerNameParsed}-${summonerTag}`;
        link.target = '_blank';
        playerDiv.addEventListener('click', function () {
            window.open(link.href, '_blank');
        });
    }
}

async function showSummonerNames() {
    // Asegúrate de que esta función retorne un array de objetos
    const playerList = await Utils.getPlayerListFromJSON();

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

document.addEventListener('DOMContentLoaded', showSummonerNames);
document.addEventListener('DOMContentLoaded', setOPGGLinks);