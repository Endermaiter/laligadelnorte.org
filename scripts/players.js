import * as utils from "./utils.js";

const grid = document.getElementById("players-grid");
const search = document.getElementById("search");

let players = [];

utils.loadJSON("../data/players.json").then(data => {
  if (data) {
    players = data;
    renderPlayers(players);
  }
});

function renderPlayers(list) {
  grid.innerHTML = "";
  list.forEach(player => {
    const card = document.createElement("div");
    const imgSrc = `../src/rank/${player.rank}.png`;
    const teamSrc = `../src/teams_logo/${player.team}.png`;
    const opgg_url = `https://op.gg/es/lol/summoners/euw/${player.name.replace(" ", "%20").replace("#", "-")}`;

    card.className = "player-card";
    card.innerHTML = `
      <h3 class="player-name">${player.name}</h3>
      <div class="info-row">
        <div class="info-block-1">
          <img class="rank-icon" src="${imgSrc}" alt="${player.rank}" />
          <p class="label">${player.rank}</p>
        </div>
        <div class="info-block-2">
          <img class="team-logo" src="${teamSrc}" alt="${player.team}" />
          <p class="label">${player.team}</p>
        </div>
      </div>
    `;
    card.onclick = () => window.open(opgg_url, "_blank");
    grid.appendChild(card);
  });
}

search.addEventListener("input", () => {
  const query = search.value.toLowerCase();

  const filtered = players.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.team.toLowerCase().includes(query) ||
    p.rank.toLowerCase().includes(query)
  );

  renderPlayers(filtered);
});
