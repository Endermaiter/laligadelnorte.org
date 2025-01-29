
import * as Utils from './utils.js'

const API_KEY = 'RGAPI-481cec0f-c653-401b-a9de-50bc47ad3bd2';
const continent = 'europe';
const region = 'euw1'

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
            if (i % 20 === 19) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
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

async function getLevels() {
    const puuidList = await getPUUID();
    let levelList = [];
    for (let i = 0; i < puuidList.length; i++) {
        const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuidList[i]}?api_key=${API_KEY}`
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            levelList.push(data.summonerLevel)
        } else {
            throw new Error('No se pudo obtener la información del invocador.');
        }
        if (i % 20 === 19) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    return levelList;
}

async function getIconIDs() {
    const puuidList = await getPUUID();
    let iconIDList = [];
    for (let i = 0; i < puuidList.length; i++) {
        const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuidList[i]}?api_key=${API_KEY}`
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            iconIDList.push(data.profileIconId)
        } else {
            throw new Error('No se pudo obtener la información del invocador.');
        }
        if (i % 20 === 19) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    return iconIDList;
}

async function getSummonerIDs() {
    const puuidList = await getPUUID();
    let summonerIDList = [];
    for (let i = 0; i < puuidList.length; i++) {
        const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuidList[i]}?api_key=${API_KEY}`
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            summonerIDList.push(data.id)
        } else {
            throw new Error('No se pudo obtener la información del invocador.');
        }
        if (i % 20 === 19) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    return summonerIDList;
}

async function getRankedInfo() {
    const summonerIDList = await getSummonerIDs();
    let randkedInfoList = [];
    for (let i = 0; i < summonerIDList.length; i++) {
        const url = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerIDList[i]}?api_key=${API_KEY}`
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            randkedInfoList.push(data)
        } else {
            throw new Error('No se pudo obtener la información del invocador.');
        }
        if (i % 20 === 19) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    return randkedInfoList;
}

async function getMasterChamps() {
    const puuidList = await getPUUID();
    let masterChampsList = [];
    for (let i = 0; i < puuidList.length; i++) {
        const url = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuidList[i]}/top?count=5&api_key=${API_KEY}`
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            masterChampsList.push(data)
        } else {
            throw new Error('No se pudo obtener la información del invocador.');
        }
        if (i % 20 === 19) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    return masterChampsList;
}

export { getLevels, getIconIDs, getDDragonLastVersion, getSummonerIDs, getRankedInfo, getMasterChamps };
