const teams = [
  {
    name: "TARNISHED",
    logo: "../src/teams_logo/TARNISHED_logo.png",
    wins: 6,
    losses: 1,
  },
  {
    name: "NOOBS4WIN",
    logo: "../src/teams_logo/NOOBS4WIN_logo.png",
    wins: 5,
    losses: 2,
  },
  {
    name: "FF15",
    logo: "../src/teams_logo/FF15_logo.png",
    wins: 4,
    losses: 3,
  },
  {
    name: "MONOS CORUÑA",
    logo: "../src/teams_logo/MONOS CORUÑA_logo.png",
    wins: 3,
    losses: 4,
  },
  {
    name: "EGO TEAM",
    logo: "../src/teams_logo/EGO TEAM_logo.png",
    wins: 2,
    losses: 5,
  },
  {
    name: "DOMINGUEROS",
    logo: "../src/teams_logo/DOMINGUEROS_logo.png",
    wins: 1,
    losses: 6,
  },
];

// Ordenar por más victorias
teams.sort((a, b) => b.wins - a.wins);

const tbody = document.getElementById("scores-body");

teams.forEach((team, index) => {
  const diff = team.wins - team.losses;
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${index + 1}</td>
    <td><img src="${team.logo}" alt="${team.name}"> ${team.name}</td>
    <td>${team.wins}</td>
    <td>${team.losses}</td>
    <td>${diff > 0 ? "+" : ""}${diff}</td>
  `;

  tbody.appendChild(row);
});
