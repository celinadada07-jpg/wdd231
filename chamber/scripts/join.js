// ==========================================
// PORT HARCOURT CHAMBER OF COMMERCE
// JOIN PAGE JAVASCRIPT
// ==========================================

// SELECT ELEMENTS
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-nav");

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

const timestamp = document.querySelector("#timestamp");
const applicationDetails = document.querySelector("#application-details");


// ==========================================
// FOOTER YEAR AND LAST MODIFIED
// ==========================================

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}


// ==========================================
// MOBILE NAVIGATION
// ==========================================

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");

        menuButton.setAttribute("aria-expanded", isOpen);

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });

}


// ==========================================
// FORM TIMESTAMP
// ==========================================

if (timestamp) {
    timestamp.value = new Date().toISOString();
}


// ==========================================
// DISPLAY FORM INFORMATION
// ==========================================

if (applicationDetails) {

    const params = new URLSearchParams(window.location.search);

    const firstName = params.get("firstName");
    const lastName = params.get("lastName");
    const email = params.get("email");
    const phone = params.get("phone");
    const organization = params.get("organization");
    const organizationTitle = params.get("organizationTitle");
    const membership = params.get("membership");
    const description = params.get("description");
    const submittedTime = params.get("timestamp");

    let membershipName = membership;

    if (membership === "np") {
        membershipName = "NP Membership";
    } else if (membership === "bronze") {
        membershipName = "Bronze Membership";
    } else if (membership === "silver") {
        membershipName = "Silver Membership";
    } else if (membership === "gold") {
        membershipName = "Gold Membership";
    }

    applicationDetails.innerHTML = `
        <h2>Application Details</h2>

        <p>
            <strong>Name:</strong>
            ${firstName || ""} ${lastName || ""}
        </p>

        <p>
            <strong>Email:</strong>
            ${email || ""}
        </p>

        <p>
            <strong>Phone:</strong>
            ${phone || ""}
        </p>

        <p>
            <strong>Organization:</strong>
            ${organization || ""}
        </p>

        <p>
            <strong>Organizational Title:</strong>
            ${organizationTitle || ""}
        </p>

        <p>
            <strong>Membership Level:</strong>
            ${membershipName || ""}
        </p>

        <p>
            <strong>Business Description:</strong>
            ${description || ""}
        </p>

        <p>
            <strong>Application Submitted:</strong>
            ${submittedTime
                ? new Date(submittedTime).toLocaleString()
                : "Not available"}
        </p>
    `;
}