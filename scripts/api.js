
const continent = 'europe';
const region = 'euw1'

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

export { getDDragonLastVersion };
