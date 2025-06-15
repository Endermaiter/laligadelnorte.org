const players = [
  {
    name: "RoiceTee",
    image: "../src/players/roicetee.jpg",
    opgg: "https://www.op.gg/summoners/euw/roicetee",
    team: {
      name: "TARNISHED",
      logo: "../src/teams_logo/TARNISHED_logo.png"
    },
    rank: {
      name: "Diamante",
      icon: "../src/rank/diamond.png"
    }
  },
  {
    name: "Endermaiter",
    image: "../src/players/endermaiter.jpg",
    opgg: "https://www.op.gg/summoners/euw/endermaiter",
    team: {
      name: "NOOBS4WIN",
      logo: "../src/teams_logo/NOOBS4WIN_logo.png"
    },
    rank: {
      name: "Platino",
      icon: "../src/rank/platinum.png"
    }
  }
  // Añade el resto...
];

const grid = document.getElementById("players-grid");
const search = document.getElementById("search");

function renderPlayers(list) {
  grid.innerHTML = "";
  list.forEach(player => {
    const card = document.createElement("div");
    card.className = "player-card";
    card.innerHTML = `
      <h3 class="player-name">${player.name}</h3>
      <img class="player-img" src="${player.image}" alt="${player.name}" />

      <div class="info-row">
        <div class="info-block">
          <img class="rank-icon" src="${player.rank.icon}" alt="${player.rank.name}" />
          <p class="label">${player.rank.name}</p>
        </div>
        <div class="info-block">
          <img class="team-logo" src="${player.team.logo}" alt="${player.team.name}" />
          <p class="label">${player.team.name}</p>
        </div>
      </div>
    `;
    card.onclick = () => window.open(player.opgg, "_blank");
    grid.appendChild(card);
  });
}

renderPlayers(players);

search.addEventListener("input", () => {
  const query = search.value.toLowerCase();
  const filtered = players.filter(p => p.name.toLowerCase().includes(query));
  renderPlayers(filtered);
});
