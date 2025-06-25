const teams = [
  {
    name: "TARNISHED",
    logo: "../src/teams_logo/TARNISHED_logo.png",
    score:0
  },
  {
    name: "CHICKS DIG VISION",
    logo: "../src/teams_logo/CHICKS_DIG_VISION_logo.png",
    score:0
  },
  {
    name: "FF15",
    logo: "../src/teams_logo/FF15_logo.png",
    score:0
  },
  {
    name: "MONOS CORUÑA",
    logo: "../src/teams_logo/MONOS CORUÑA_logo.png",
    score:0
  },
  {
    name: "EGO TEAM",
    logo: "../src/teams_logo/EGO TEAM_logo.png",
    score:0
  },
  {
    name: "DOMINGUEROS",
    logo: "../src/teams_logo/DOMINGUEROS_logo.png",
    score:0
  },
];

// Ordenar por más victorias
teams.sort((a, b) => b.wins - a.wins);

const tbody = document.getElementById("scores-body");

teams.forEach((team, index) => {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td class="rank">${index + 1}</td>
    <td class="team"><img src="${team.logo}" alt="${team.name}"> ${team.name}</td>
    <td>${team.score}</td>
  `;

  tbody.appendChild(row);
});
