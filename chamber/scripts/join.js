// =========================================
// PORT HARCOURT CHAMBER - JOIN PAGE
// =========================================


// =========================================
// MOBILE NAVIGATION
// =========================================

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");

        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}


// =========================================
// CURRENT DATE AND TIME
// =========================================

const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}


// =========================================
// MEMBERSHIP MODALS
// =========================================

const modalButtons = document.querySelectorAll(".modal-button");
const closeButtons = document.querySelectorAll(".close-modal");


// Open the correct modal
modalButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const modalId = button.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);

        if (modal) {
            modal.showModal();
        }

    });

});


// Close modal buttons
closeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }

    });

});


// =========================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// =========================================

document.querySelectorAll("dialog").forEach((modal) => {

    modal.addEventListener("click", (event) => {

        if (event.target === modal) {
            modal.close();
        }

    });

});

