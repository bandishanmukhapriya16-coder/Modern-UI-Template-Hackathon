/* =========================
   NAVIGATION
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuBtn.textContent =
        navLinks.classList.contains("active") ? "✕" : "☰";
});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";

    });

});


/* =========================
   DARK MODE
========================= */

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("nearbyyTheme") === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀";
}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const darkMode =
        document.body.classList.contains("dark");

    themeBtn.textContent =
        darkMode ? "☀" : "☾";

    localStorage.setItem(
        "nearbyyTheme",
        darkMode ? "dark" : "light"
    );

    showToast(
        darkMode
            ? "Dark mode enabled."
            : "Light mode enabled."
    );

});


/* =========================
   TOAST
========================= */

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

let toastTimer;

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2600);

}


/* =========================
   SEARCH
========================= */

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const placeCards =
    document.querySelectorAll(".place-card");


function performSearch() {

    const query =
        searchInput.value.trim().toLowerCase();

    if (!query) {

        placeCards.forEach(card => {
            card.classList.remove("hidden");
        });

        showToast("Showing all nearby places.");

        return;
    }

    let found = 0;

    placeCards.forEach(card => {

        const text =
            card.textContent.toLowerCase();

        if (text.includes(query)) {

            card.classList.remove("hidden");

            found++;

        } else {

            card.classList.add("hidden");

        }

    });


    document.getElementById("places")
        .scrollIntoView({
            behavior: "smooth"
        });


    if (found > 0) {

        showToast(`${found} place(s) found.`);

    } else {

        placeCards.forEach(card => {
            card.classList.remove("hidden");
        });

        showToast(
            "No exact match found. Showing nearby places."
        );

    }

}


searchBtn.addEventListener(
    "click",
    performSearch
);


searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        performSearch();
    }

});


/* =========================
   QUICK SEARCH
========================= */

document.querySelectorAll(".quick-search")
    .forEach(button => {

        button.addEventListener("click", () => {

            searchInput.value =
                button.textContent;

            performSearch();

        });

    });


/* =========================
   CATEGORY BUTTONS
========================= */

document.querySelectorAll(".category-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            document.querySelectorAll(".category-card")
                .forEach(item =>
                    item.classList.remove("selected")
                );

            card.classList.add("selected");

            const category =
                card.dataset.category;

            showToast(
                `Exploring ${category} nearby.`
            );

            document.getElementById("places")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


/* =========================
   FILTERS
========================= */

const filters =
    document.querySelectorAll(".filter");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item =>
            item.classList.remove("active")
        );

        filter.classList.add("active");

        const selected =
            filter.dataset.filter;


        placeCards.forEach(card => {

            if (
                selected === "all" ||
                card.dataset.type === selected
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

        showToast(
            selected === "all"
                ? "Showing all places."
                : `Showing ${selected} places.`
        );

    });

});


/* =========================
   FAVORITES
========================= */

document.querySelectorAll(".heart-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("active");

            if (button.classList.contains("active")) {

                button.textContent = "♥";

                showToast("Added to favorites.");

            } else {

                button.textContent = "♡";

                showToast("Removed from favorites.");

            }

        });

    });


/* =========================
   LOCATION
========================= */

const locationBtn =
    document.getElementById("locationBtn");

const locateMapBtn =
    document.getElementById("locateMapBtn");


function requestLocation() {

    if (!navigator.geolocation) {

        showToast(
            "Location is not supported by this browser."
        );

        return;
    }


    navigator.geolocation.getCurrentPosition(

        () => {

            showToast(
                "Location access enabled for this demo."
            );

        },

        () => {

            showToast(
                "Location permission was not granted."
            );

        }

    );

}


locationBtn.addEventListener(
    "click",
    requestLocation
);


locateMapBtn.addEventListener(
    "click",
    requestLocation
);


/* =========================
   MAP BUTTONS
========================= */

document.getElementById("expandMapBtn")
    .addEventListener("click", () => {

        showToast(
            "Interactive map view selected."
        );

    });


/* =========================
   EXPLORE BUTTON
========================= */

document.getElementById("exploreBtn")
    .addEventListener("click", () => {

        document.getElementById("places")
            .scrollIntoView({
                behavior: "smooth"
            });

        showToast(
            "Exploring popular places nearby."
        );

    });


/* =========================
   KEYBOARD SHORTCUTS
========================= */

document.addEventListener("keydown", event => {

    if (
        event.key === "/" &&
        document.activeElement !== searchInput
    ) {

        event.preventDefault();

        searchInput.focus();

    }

    if (
        event.key.toLowerCase() === "d" &&
        document.activeElement !== searchInput
    ) {

        themeBtn.click();

    }

});


/* =========================
   NAVBAR SCROLL EFFECT
========================= */

window.addEventListener("scroll", () => {

    const navbar =
        document.querySelector(".navbar");

    if (window.scrollY > 30) {

        navbar.style.boxShadow =
            "0 8px 30px rgba(16,24,40,0.06)";

    } else {

        navbar.style.boxShadow = "none";

    }

});


/* =========================
   INITIAL MESSAGE
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        showToast(
            "Nearbyy is ready to explore."
        );

    }, 700);

});