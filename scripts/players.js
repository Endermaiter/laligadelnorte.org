
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
        levelText.id = "exclude-format"
        numberLevel.id = "exclude-format"
        levelText.appendChild(numberLevel)
        profileColumn.appendChild(levelText)
    }
}

async function showRankedInfo() {
    const rankedInfoList = await Api.getRankedInfo();
    for (let i = 0; i < rankedInfoList.length; i++) {
        for (let j = 0; j < rankedInfoList[i].length; j++) {
            let rankedinfoJSON = rankedInfoList[i][j]
            let cola = rankedinfoJSON.queueType
            let elo = rankedinfoJSON.tier
            let rango = rankedinfoJSON.rank
            let LPs = rankedinfoJSON.leaguePoints
            let wins = rankedinfoJSON.wins
            let loses = rankedinfoJSON.losses

            console.log(rankedinfoJSON)

            //Elo

            const rankedColumn = document.getElementById(`player${i + 1}_column3`);
            const data = document.createElement('div');
            const colaData = document.createElement('h4');
            if (cola.includes('SOLO')) {
                colaData.textContent = 'CLASIFICATORIA SOLO/DUO'
            } else if (cola.includes('FLEX')) {
                colaData.textContent = 'CLASIFICATORIA FLEX'
            }
            data.appendChild(colaData)
            const image = document.createElement('img');
            const image_path = `../src/rank/${elo}.png`
            image.src = image_path
            image.alt = "RankIcon"
            image.width = 250;
            image.height = 250;
            image.style.margin = '0';
            data.appendChild(image)
            const rankedData = document.createElement('h4');
            colaData.style.marginBottom = '0';
            rankedData.textContent = `${elo} ${rango} - ${LPs} LPs`
            data.appendChild(rankedData)
            if (j>0) {
                const divider_line = document.createElement('p')
                divider_line.textContent = "─────────────"
                rankedColumn.appendChild(divider_line)
            }
            rankedColumn.appendChild(data)

            //Stats

            const statsColumn = document.getElementById(`player${i + 1}_column2`)
            const statsData = document.createElement('div')
            const statsHeader = document.createElement('h5')
            if (cola.includes('SOLO')) {
                statsHeader.textContent = 'WINS / LOSES SOLO/DUO'
            } else if (cola.includes('FLEX')) {
                statsHeader.textContent = 'WINS / LOSES FLEX'
            }
            statsData.appendChild(statsHeader)
            const wins_loses = document.createElement('p')
            const winsSpan = document.createElement('span')
            const middleSpan = document.createElement('span')
            const losesSpan = document.createElement('span')
            winsSpan.textContent = wins
            middleSpan.textContent = ' - '
            losesSpan.textContent = loses
            winsSpan.style.color = 'lightgreen'
            middleSpan.style.color = 'white'
            losesSpan.style.color = '#FE0000'
            wins_loses.appendChild(winsSpan)
            wins_loses.appendChild(middleSpan)
            wins_loses.appendChild(losesSpan)
            statsData.appendChild(wins_loses)
            statsColumn.appendChild(statsData)
        }
    }
}

document.addEventListener('DOMContentLoaded', showSummonerNames);
document.addEventListener('DOMContentLoaded', showSummonerIcons);
document.addEventListener('DOMContentLoaded', showSummonerLevels);
document.addEventListener('DOMContentLoaded', showRankedInfo);
document.addEventListener('DOMContentLoaded', setOPGGLinks);