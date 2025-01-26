
import * as Utils from './utils.js'
import * as Api from './api.js'

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
    const playerList = await Utils.getPlayerListFromJSON();
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

async function showSummonerIcons() {
    const iconIDList = await Api.getIconIDs();
    const dDragonVersion = await Api.getDDragonLastVersion();
    for (let i = 0; i < iconIDList.length; i++) {
        const image_link = `https://ddragon.leagueoflegends.com/cdn/${dDragonVersion}/img/profileicon/${iconIDList[i]}.png`
        const playerDiv = document.getElementById(`player${i + 1}_column1`);
        const image = document.createElement('img');
        image.src = image_link
        image.alt = "SummonerIcon"
        image.width = 200;
        image.height = 200;
        playerDiv.appendChild(image)
    }
}

async function showSummonerLevels() {
    const levelList = await Api.getLevels();
    for (let i = 0; i < levelList.length; i++) {
        const profileColumn = document.getElementById(`player${i + 1}_column1`);
        const levelText = document.createElement('p');
        const numberLevel = document.createElement('b');
        numberLevel.textContent = levelList[i]
        levelText.textContent = 'NIVEL: '
        levelText.appendChild(numberLevel)
        profileColumn.appendChild(levelText)
    }
}

async function showRankedInfo() {
    const rankedInfoList = await Api.getRankedInfo();
    for (let i = 0; i < rankedInfoList.length; i++) {
        for (let j = 0; j < rankedInfoList[i].length; j++) {
            let rankedinfoJSON = rankedInfoList[i][j]
            console.log(rankedinfoJSON)
            let cola = rankedinfoJSON.queueType
            let elo = rankedinfoJSON.tier
            let rango = rankedinfoJSON.rank
            let LPs = rankedinfoJSON.leaguePoints
            let wins = rankedinfoJSON.wins
            let loses = rankedinfoJSON.loses
            const rankedColumn = document.getElementById(`player${i + 1}_column3`);
            const image = document.createElement('img');
            const data = document.createElement('div');
            const colaData = document.createElement('p');
            const image_path = `../src/rank/${elo}.png`
            image.src = image_path
            image.alt = "RankIcon"
            image.width = 250;
            image.height = 250;
            image.style.margin = '0 auto';
            if (cola.includes('SOLO')){
                colaData.textContent = 'Clasificatoria SOLO/DUO'
            }else if (cola.includes('FLEX')){
                colaData.textContent = 'Clasificatoria FLEX'
            }
            colaData.style.margin = '0 auto';
            rankedColumn.appendChild(image)
            data.appendChild(colaData)
            rankedColumn.appendChild(data)
        }
    }
}

document.addEventListener('DOMContentLoaded', showSummonerNames);
document.addEventListener('DOMContentLoaded', showSummonerIcons);
document.addEventListener('DOMContentLoaded', showSummonerLevels);
document.addEventListener('DOMContentLoaded', showRankedInfo);
document.addEventListener('DOMContentLoaded', setOPGGLinks);