
import * as Utils from './utils.js'

const API_KEY = 'RGAPI-481cec0f-c653-401b-a9de-50bc47ad3bd2';
const continent = 'europe';

async function getPUUID() {

    try {

        const playerList = await Utils.getPlayerListFromJSON();
        let puuIDList = [];
        for (let i = 0; i < playerList.length; i++) {
            const summonerName = playerList[i].lol.summonerName;
            const summonerTag = playerList[i].lol.tag;
            let summonerNameParsed = `${summonerName.replace(/ /g, '%20')}`;
            const url = `https://${continent}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerNameParsed}/${summonerTag}?api_key=${API_KEY}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                puuIDList.push(data.puuid)
            } else {
                throw new Error('No se pudo obtener la información del invocador.');
            }
            await sleep(500)
        }
        return puuIDList;
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

async function getDDragonLastVersion() {
    try {
        const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        if (response.ok) {
            const versions = await response.json();
            return versions[0];
        } else {
            throw new Error('Error al cargar el archivo JSON de versiones');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function getLevel() {
    const puuidList = await getPUUID();
    let levelList = [];
    for (let i = 0; i < puuidList.length; i++) {
        const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuidList[i]}?api_key=${API_KEY}`
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            levelList.push(data.summonerLevel)
        } else {
            throw new Error('No se pudo obtener la información del invocador.');
        }
        await sleep(500)
    }
    return levelList;
}

async function getIconID() {
    const puuidList = await getPUUID();
    let iconIDList = [];
    for (let i = 0; i < puuidList.length; i++) {
        const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuidList[i]}?api_key=${API_KEY}`
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            iconIDList.push(data.profileIconId)
        } else {
            throw new Error('No se pudo obtener la información del invocador.');
        }
        await sleep(500)
    }
    return iconIDList;
}

export { getLevel, getIconID, getDDragonLastVersion };