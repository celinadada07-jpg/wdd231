// ==========================================
// PORT HARCOURT CHAMBER DIRECTORY
// ==========================================

// Select page elements
const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-nav");
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");


// ==========================================
// FOOTER INFORMATION
// ==========================================

currentYear.textContent = new Date().getFullYear();

lastModified.textContent = document.lastModified;


// ==========================================
// MOBILE NAVIGATION
// ==========================================

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});


// ==========================================
// GET MEMBERS FROM JSON
// ==========================================

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Error loading members:", error);

        membersContainer.innerHTML = `
            <p class="error-message">
                Sorry, the member directory could not be loaded.
                Please try again later.
            </p>
        `;
    }
}


// ==========================================
// DISPLAY MEMBERS
// ==========================================

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy"
            >

            <div class="member-information">

                <h2>${member.name}</h2>

                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${member.phone}
                </p>

                <p>
                    <strong>Membership:</strong>
                    ${getMembershipLevel(member.membership)}
                </p>

                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit Website
                </a>

            </div>
        `;

        membersContainer.appendChild(card);
    });
}


// ==========================================
// MEMBERSHIP LEVEL
// ==========================================

function getMembershipLevel(level) {

    if (level === 3) {
        return "Gold";
    }

    if (level === 2) {
        return "Silver";
    }

    return "Member";
}


// ==========================================
// GRID VIEW
// ==========================================

gridButton.addEventListener("click", () => {

    membersContainer.classList.remove("members-list");
    membersContainer.classList.add("members-grid");

    gridButton.classList.add("active-view");
    listButton.classList.remove("active-view");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
});


// ==========================================
// LIST VIEW
// ==========================================

listButton.addEventListener("click", () => {

    membersContainer.classList.remove("members-grid");
    membersContainer.classList.add("members-list");

    listButton.classList.add("active-view");
    gridButton.classList.remove("active-view");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");
});


// ==========================================
// LOAD MEMBERS
// ==========================================

getMembers();

