/* =========================================================
   STELLERIUM — STAR MAP
   JAVASCRIPT
========================================================= */


/* =========================================================
   THEME TOGGLE
========================================================= */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("stellerium-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");

    if (themeIcon) {
        themeIcon.textContent = "☀";
    }
}

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        if (isDark) {

            localStorage.setItem(
                "stellerium-theme",
                "dark"
            );

            themeIcon.textContent = "☀";

        } else {

            localStorage.setItem(
                "stellerium-theme",
                "light"
            );

            themeIcon.textContent = "☾";
        }

    });

}


/* =========================================================
   TOAST MESSAGE
========================================================= */

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

let toastTimer;

function showToast(message) {

    if (!toast || !toastMessage) {
        return;
    }

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);

}


/* =========================================================
   STAR MAP CONTROLS
========================================================= */

const heroMap = document.querySelector(".hero-map");

const zoomInButton =
    document.getElementById("zoomIn");

const zoomOutButton =
    document.getElementById("zoomOut");

const resetMapButton =
    document.getElementById("resetMap");

let mapScale = 1;

let mapRotation = 0;


function updateMap() {

    if (!heroMap) {
        return;
    }

    heroMap.style.transform =
        `scale(${mapScale}) rotate(${mapRotation}deg)`;

}


if (zoomInButton) {

    zoomInButton.addEventListener("click", () => {

        if (mapScale < 1.25) {

            mapScale += 0.05;

            updateMap();

            showToast("Sky map zoomed in");

        }

    });

}


if (zoomOutButton) {

    zoomOutButton.addEventListener("click", () => {

        if (mapScale > 0.85) {

            mapScale -= 0.05;

            updateMap();

            showToast("Sky map zoomed out");

        }

    });

}


if (resetMapButton) {

    resetMapButton.addEventListener("click", () => {

        mapScale = 1;

        mapRotation = 0;

        updateMap();

        showToast("Sky map reset");

    });

}


/* =========================================================
   SEARCH
========================================================= */

const searchInput =
    document.getElementById("starSearch");

const searchButton =
    document.getElementById("searchButton");

const searchResult =
    document.getElementById("searchResult");


const astronomyObjects = {

    orion: {
        title: "Orion",
        description:
            "Orion is one of the most recognizable constellations in the night sky."
    },

    mars: {
        title: "Mars",
        description:
            "Mars is the fourth planet from the Sun and is often called the Red Planet."
    },

    sirius: {
        title: "Sirius",
        description:
            "Sirius is the brightest star in the night sky as seen from Earth."
    },

    andromeda: {
        title: "Andromeda",
        description:
            "Andromeda is a constellation associated with the famous Andromeda Galaxy."
    },

    earth: {
        title: "Earth",
        description:
            "Earth is the third planet from the Sun and our home world."
    },

    jupiter: {
        title: "Jupiter",
        description:
            "Jupiter is the largest planet in our solar system."
    },

    saturn: {
        title: "Saturn",
        description:
            "Saturn is a gas giant famous for its spectacular rings."
    },

    venus: {
        title: "Venus",
        description:
            "Venus is the second planet from the Sun and has an extremely thick atmosphere."
    },

    neptune: {
        title: "Neptune",
        description:
            "Neptune is the eighth planet from the Sun and a distant ice giant."
    }

};


function searchSky() {

    if (!searchInput || !searchResult) {
        return;
    }

    const query =
        searchInput.value
            .trim()
            .toLowerCase();

    if (!query) {

        searchResult.textContent =
            "Please enter a star, planet or constellation.";

        return;
    }


    const result =
        Object.keys(astronomyObjects)
            .find((item) =>
                item.includes(query)
            );


    if (result) {

        searchResult.innerHTML =
            `<strong>${astronomyObjects[result].title}</strong>
             — ${astronomyObjects[result].description}`;

        showToast(
            `Found ${astronomyObjects[result].title}`
        );

    } else {

        searchResult.textContent =
            `No object found for "${searchInput.value}". Try Orion, Mars, Sirius or Andromeda.`;

        showToast("No matching sky object found");

    }

}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchSky
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                searchSky();

            }

        }
    );

}


/* =========================================================
   SKY LOCATION BUTTON
========================================================= */

const locationButton =
    document.getElementById("locationButton");

if (locationButton) {

    locationButton.addEventListener(
        "click",
        () => {

            showToast(
                "Your sky view is ready to explore"
            );

        }
    );

}


/* =========================================================
   EVENT REMINDERS
========================================================= */

const eventButtons =
    document.querySelectorAll(".event-button");


eventButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const eventCard =
            button.closest(".event-card");

        if (!eventCard) {
            return;
        }

        const eventName =
            eventCard.querySelector("h3");

        if (!eventName) {
            return;
        }

        const eventTitle =
            eventName.textContent.trim();


        if (button.classList.contains("saved")) {

            button.classList.remove("saved");

            button.textContent =
                "Add reminder";

            showToast(
                `Reminder removed for ${eventTitle}`
            );

        } else {

            button.classList.add("saved");

            button.textContent =
                "✓ Reminder added";

            showToast(
                `Reminder added for ${eventTitle}`
            );

        }

    });

});


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

const navigationLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


navigationLinks.forEach((link) => {

    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

});


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 600) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (!navbar) {
        return;
    }

    if (window.scrollY > 40) {

        navbar.style.borderBottom =
            "1px solid var(--border)";

    } else {

        navbar.style.borderBottom =
            "1px solid transparent";

    }

});


/* =========================================================
   PLANET CARD INTERACTION
========================================================= */

const planetCards =
    document.querySelectorAll(".planet-card");


planetCards.forEach((card) => {

    card.addEventListener("click", () => {

        const planetName =
            card.querySelector("h3");

        if (!planetName) {
            return;
        }

        showToast(
            `Exploring ${planetName.textContent.trim()}`
        );

    });

});


/* =========================================================
   CONSTELLATION CARD INTERACTION
========================================================= */

const constellationCards =
    document.querySelectorAll(
        ".constellation-card"
    );


constellationCards.forEach((card) => {

    card.addEventListener("click", () => {

        const constellationName =
            card.querySelector("h3");

        if (!constellationName) {
            return;
        }

        showToast(
            `Viewing ${constellationName.textContent.trim()}`
        );

    });

});


/* =========================================================
   EXPLORE CARD INTERACTION
========================================================= */

const exploreCards =
    document.querySelectorAll(
        ".explore-card"
    );


exploreCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.cursor = "pointer";

    });

});


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        /* Press / to focus search */

        if (
            event.key === "/" &&
            document.activeElement !== searchInput
        ) {

            event.preventDefault();

            if (searchInput) {
                searchInput.focus();
            }

        }


        /* Press Escape to clear search */

        if (
            event.key === "Escape" &&
            document.activeElement === searchInput
        ) {

            searchInput.value = "";

            searchResult.textContent =
                "Try searching for Orion, Mars, Sirius or Andromeda.";

            searchInput.blur();

        }

    }
);


/* =========================================================
   STAR ANIMATION
========================================================= */

const stars =
    document.querySelectorAll(".star");


stars.forEach((star, index) => {

    const delay =
        (index * 0.23) % 2.5;

    star.style.animationDelay =
        `${delay}s`;

});


/* =========================================================
   INITIAL PAGE STATE
========================================================= */

if (searchResult) {

    searchResult.textContent =
        "Try searching for Orion, Mars, Sirius or Andromeda.";

}


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "✦ Stellerium Star Map loaded successfully."
);