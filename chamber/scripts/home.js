// ==========================================
// PORT HARCOURT CHAMBER OF COMMERCE
// HOME PAGE JAVASCRIPT
// ==========================================


// ==========================================
// SELECT ELEMENTS
// ==========================================

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-nav");

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

const currentWeather = document.querySelector("#current-weather");
const forecastContainer = document.querySelector("#forecast");

const spotlightsContainer = document.querySelector("#spotlights");


// ==========================================
// FOOTER YEAR AND LAST MODIFIED
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
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

});


// ==========================================
// WEATHER API SETTINGS
// ==========================================

// Replace YOUR_API_KEY with your OpenWeatherMap API key.

const API_KEY = "6d890c4deae5837066450b13ae39b28b";

const LATITUDE = 4.8156;
const LONGITUDE = 7.0498;


// ==========================================
// GET CURRENT WEATHER
// ==========================================

async function getCurrentWeather() {

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to get current weather.");
        }

        const data = await response.json();

        displayCurrentWeather(data);

    } catch (error) {

        console.error("Weather error:", error);

        currentWeather.innerHTML = `
            <p>Weather information is currently unavailable.</p>
        `;

    }
}


// ==========================================
// DISPLAY CURRENT WEATHER
// ==========================================

function displayCurrentWeather(data) {

    const temperature = Math.round(data.main.temp);

    const description = data.weather[0].description;

    const humidity = data.main.humidity;

    const icon = data.weather[0].icon;

    currentWeather.innerHTML = `
        <img
            src="https://openweathermap.org/img/wn/${icon}@2x.png"
            alt="${description}"
        >

        <p>
            <strong>${temperature}°C</strong>
        </p>

        <p>
            ${description}
        </p>

        <p>
            Humidity: ${humidity}%
        </p>
    `;
}


// ==========================================
// GET 3-DAY FORECAST
// ==========================================

async function getForecast() {

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to get weather forecast.");
        }

        const data = await response.json();

        displayForecast(data);

    } catch (error) {

        console.error("Forecast error:", error);

        forecastContainer.innerHTML = `
            <p>Forecast information is currently unavailable.</p>
        `;

    }
}


// ==========================================
// DISPLAY 3-DAY FORECAST
// ==========================================

function displayForecast(data) {

    forecastContainer.innerHTML = "";

    const dailyForecasts = [];

    data.list.forEach((item) => {

        const date = new Date(item.dt * 1000);

        const dateString = date.toLocaleDateString(
            "en-US",
            {
                weekday: "short",
                month: "short",
                day: "numeric"
            }
        );

        if (!dailyForecasts.some(
            (forecast) => forecast.date === dateString
        )) {

            dailyForecasts.push({
                date: dateString,
                temperature: Math.round(item.main.temp),
                description: item.weather[0].description,
                icon: item.weather[0].icon
            });

        }

    });

    dailyForecasts
        .slice(1, 4)
        .forEach((forecast) => {

            const forecastCard = document.createElement("div");

            forecastCard.classList.add("forecast-card");

            forecastCard.innerHTML = `
                <h4>${forecast.date}</h4>

                <img
                    src="https://openweathermap.org/img/wn/${forecast.icon}@2x.png"
                    alt="${forecast.description}"
                >

                <p>
                    <strong>${forecast.temperature}°C</strong>
                </p>

                <p>
                    ${forecast.description}
                </p>
            `;

            forecastContainer.appendChild(forecastCard);

        });

}


// ==========================================
// GET MEMBERS
// ==========================================

async function getMembers() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();

        displaySpotlights(members);

    } catch (error) {

        console.error("Member error:", error);

        spotlightsContainer.innerHTML = `
            <p>
                Member information is currently unavailable.
            </p>
        `;

    }

}


// ==========================================
// DISPLAY MEMBER SPOTLIGHTS
// ==========================================

function displaySpotlights(members) {

    const qualifiedMembers = members.filter(
        (member) =>
            member.membership === 2 ||
            member.membership === 3
    );


    // Shuffle members randomly

    const shuffledMembers = [...qualifiedMembers].sort(
        () => Math.random() - 0.5
    );


    // Select 2 or 3 members

    const selectedMembers = shuffledMembers.slice(0, 3);


    spotlightsContainer.innerHTML = "";


    selectedMembers.forEach((member) => {

        const card = document.createElement("article");

        card.classList.add("spotlight-card");


        const membershipName =
            member.membership === 3
                ? "Gold Member"
                : "Silver Member";


        const membershipClass =
            member.membership === 3
                ? "membership-gold"
                : "membership-silver";


        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy"
            >

            <h3>${member.name}</h3>

            <p class="${membershipClass}">
                ${membershipName}
            </p>

            <p>
                ${member.address}
            </p>

            <p>
                ${member.phone}
            </p>

            <p>
                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit Website
                </a>
            </p>
        `;


        spotlightsContainer.appendChild(card);

    });

}


// ==========================================
// START FUNCTIONS
// ==========================================

getCurrentWeather();

getForecast();

getMembers();