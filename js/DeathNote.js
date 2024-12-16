document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("phrase-form");
    const personInput = document.getElementById("person-input");
    const phrasesTableBody = document.querySelector("#phrases-table tbody");

    function loadFromLocalStorage() {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        savedNotes.forEach((note, index) => {
            addRowToTable(index + 1, note);
        });
    }

    function saveToLocalStorage(note) {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        savedNotes.push(note);
        localStorage.setItem("notes", JSON.stringify(savedNotes));
    }

    function addRowToTable(index, note) {
        const row = document.createElement("tr");

        const indexCell = document.createElement("td");
        indexCell.textContent = index;
        row.appendChild(indexCell);

        const cell = document.createElement("td");
        // cell.style.display = "flex";
        cell.style.justifyContent = "space-between";
        cell.style.alignItems = "center";

        const textSpan = document.createElement("span");
        textSpan.textContent = `${note}`;
        textSpan.style.marginRight = "auto";
        textSpan.style.float = "left";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "✖";
        deleteButton.classList.add("delete-button");
        deleteButton.style.display = "none";
        deleteButton.style.float = "right";
        deleteButton.addEventListener("click", () => {
            row.remove();
            deleteFromLocalStorage(note);
            updateRowIndices();
        });

        row.appendChild(indexCell)
        cell.appendChild(textSpan);
        cell.appendChild(deleteButton);
        row.appendChild(cell);

        row.addEventListener("mouseenter", () => {
            deleteButton.style.display = "inline";
        });

        row.addEventListener("mouseleave", () => {
            deleteButton.style.display = "none";
        });

        phrasesTableBody.appendChild(row);
    }

    function deleteFromLocalStorage(note) {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        const updatedNotes = savedNotes.filter(savedNote => savedNote !== note);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }

    function updateRowIndices() {
        Array.from(phrasesTableBody.children).forEach((row, index) => {
            const textSpan = row.querySelector("td span");
            const noteText = textSpan.textContent;
            textSpan.textContent = `${noteText}`;
        });
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const person = personInput.value.trim();
        if (person) {
            const currentRowCount = phrasesTableBody.rows.length;
            addRowToTable(currentRowCount + 1, person);
            saveToLocalStorage(person);
            personInput.value = ""; // Очищаем поле ввода
        }
    });

    loadFromLocalStorage();
});
