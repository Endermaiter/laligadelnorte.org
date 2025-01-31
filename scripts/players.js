
import * as Utils from './utils.js'

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

window.searchPlayer = function() {
    let input = document.getElementById('searchInput').value.trim().toLowerCase();
    console.log(input)
    let players = document.getElementsByClassName('card-player');
    let errorSearch = document.getElementById('error-search');

    let found = false;

    for (let i = 0; i < players.length; i++) {
        let summonerName = document.getElementById(`player${i+1}_summonerName`).textContent.toLowerCase();
        let team = document.getElementById(`player${i+1}_column1`).textContent.toLowerCase();
        let elo = document.getElementById(`player${i+1}_column2`).textContent.toLowerCase();
        console.log(summonerName + team + elo)
        if (summonerName.includes(input) || team.includes(input) || elo.includes(input)) {
            players[i].style.display = "grid";
            found = true;
        } else {
            players[i].style.display = "none";
        }
    }

    errorSearch.style.display = found ? "none" : "block";
};

async function showPlayerInfo() {
    const JSON = await Utils.getPlayerListFromJSON();
    for (let i = 0; i < JSON.length; i++) {
            let dataJSON = JSON[i]
            let team = dataJSON.team
            let elo = dataJSON.lol.elo

            //Team

            const teamColumn = document.getElementById(`player${i + 1}_column1`);
            const teamData = document.createElement('div');
            const teamImage = document.createElement('img');
            const teamImage_path = `../src/teams_logo/${team}_logo.png`
            teamImage.src = teamImage_path
            teamImage.alt = "TeamPlayer"
            teamImage.width = 250;
            teamImage.height = 250;
            teamImage.style.margin = '0';
            teamData.appendChild(teamImage)
            const teamHeader = document.createElement('h4');
            teamHeader.textContent = team
            teamData.appendChild(teamHeader)
            teamColumn.appendChild(teamData)

            //Elo

            const eloColumn = document.getElementById(`player${i + 1}_column2`);
            const eloData = document.createElement('div');
            const eloImage = document.createElement('img');
            const eloImage_path = `../src/rank/${elo}.png`
            eloImage.src = eloImage_path
            eloImage.alt = "EloPlayer"
            eloImage.width = 250;
            eloImage.height = 250;
            eloImage.style.margin = '0';
            eloData.appendChild(eloImage)
            const eloHeader = document.createElement('h4');
            eloHeader.textContent = elo
            eloData.appendChild(eloHeader)
            eloColumn.appendChild(eloData)
        }
    }

document.addEventListener('DOMContentLoaded', setOPGGLinks);
document.addEventListener('DOMContentLoaded', showSummonerNames);
document.addEventListener('DOMContentLoaded', showPlayerInfo);