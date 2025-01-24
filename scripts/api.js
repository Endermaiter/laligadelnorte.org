
    const summonerName = getFirstSummonerName()
    const API_KEY = 'RGAPI-481cec0f-c653-401b-a9de-50bc47ad3bd2';
    const continent = 'europe';
    const url = `https://${continent}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/FF15%20Endermaiter/FF15?api_key=${API_KEY}`;

    async function fetchSummonerData() {

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('No se pudo obtener la información del invocador.');
            }

            const data = await response.json();
            document.getElementById('player1').textContent = JSON.stringify(data, null, 2);
        } catch (error) {
            document.getElementById('player1').textContent = `Error: ${error.message}`;
        }
    }

    async function getFirstSummonerName() {
        try {
            const response = await fetch(jsonFilePath);
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
    
            const players = await response.json();
    
            let firstSummonerName = players.player1.summonerName;
            let firstSummonerTag = players.player1.tag;
    
            firstSummonerName = firstSummonerName.replace(/ /g, '%20');

            return `${firstSummonerName}/${firstSummonerTag}`;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

document.addEventListener('DOMContentLoaded', fetchSummonerData);