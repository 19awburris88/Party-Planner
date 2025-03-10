const apiUrl = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2502-ftb-et-web-ft/events";

// Function to fetch parties from API and display them
async function fetchParties() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        renderParties(data.data);
    } catch (error) {
        console.error("Error fetching parties:", error);
    }
}

// Function to render parties in the list
function renderParties(parties) {
    const partyList = document.getElementById("party-list");
    partyList.innerHTML = ""; // Clear existing list

    parties.forEach(party => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div>
                <strong>${party.name}</strong><br>
                ${party.date} at ${party.time} - ${party.location}<br>
                <em>${party.description}</em>
            </div>
            <button onclick="deleteParty('${party.id}')">Delete</button>
        `;
        partyList.appendChild(listItem);
    });
}

// Function to delete a party
async function deleteParty(partyId) {
    try {
        await fetch(`${apiUrl}/${partyId}`, { method: "DELETE" });
        fetchParties(); // Refresh list after deletion
    } catch (error) {
        console.error("Error deleting party:", error);
    }
}

// Function to handle form submission and add a new party
document.getElementById("party-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const date = new Date (document.getElementById("date").value);
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;

    const newParty = { name, date, location, description };
console.log(newParty);

    try {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newParty)
        });

        // Clear form fields
        document.getElementById("party-form").reset();

        // Refresh list to include the new party
        fetchParties();
    } catch (error) {
        console.error("Error adding party:", error);
    }
});

// Initial fetch when page loads
fetchParties();
