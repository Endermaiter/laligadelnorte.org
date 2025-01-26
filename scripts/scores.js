

function sortTableByColumn(table, columnIndex) {
    const rows = Array.from(table.querySelectorAll("tbody > tr"));

    rows.sort((a, b) => {
        const aText = a.children[columnIndex].textContent.trim();
        const bText = b.children[columnIndex].textContent.trim();

        return isNaN(aText) || isNaN(bText)
            ? bText.localeCompare(aText)
            : Number(bText) - Number(aText);

    });

    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
}

document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("scoreTable");
    const columnToSort = 1;
    sortTableByColumn(table, columnToSort);
});