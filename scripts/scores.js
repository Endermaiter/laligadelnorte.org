let scores = [];

fetch("../data/scores.json")
  .then(response => response.json())
  .then(data => {
    scores = data;
    renderScores(scores);
  })
  .catch(err => console.error("Error cargando el JSON:", err));

function renderScores(list) {

  list.sort((a, b) => b.score - a.score);

  const tbody = document.getElementById("scores-body");

  list.forEach((team, index) => {
    const row = document.createElement("tr");
    const teamSrc = `../src/teams_logo/${team.name}.png`

    row.innerHTML = `
      <td class="rank">${index + 1}</td>
      <td class="team"><img src="${teamSrc}" alt="${team.name}"> ${team.name}</td>
      <td>${team.score}</td>
    `;

    tbody.appendChild(row);
  });

}
