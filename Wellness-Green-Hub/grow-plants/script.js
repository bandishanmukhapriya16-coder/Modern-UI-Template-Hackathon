const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const addPlantBtn = document.getElementById("addPlantBtn");
const startBtn = document.getElementById("startBtn");
const locationBtn = document.getElementById("locationBtn");

// Load saved theme
const savedTheme = localStorage.getItem("greenly-theme");

if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "🌙";
}

// Toast notification
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// Theme toggle
themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");

    themeToggle.textContent = isDark ? "🌙" : "☀️";

    localStorage.setItem(
        "greenly-theme",
        isDark ? "dark" : "light"
    );

    showToast(
        isDark
            ? "Dark mode enabled"
            : "Light mode enabled"
    );
});

// Mobile menu
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    menuBtn.textContent =
        navLinks.classList.contains("open")
            ? "✕"
            : "☰";
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.textContent = "☰";
    });
});

// Add plant button
addPlantBtn.addEventListener("click", () => {
    showToast("Plant added to your garden 🌱");
});

// Start growing button
startBtn.addEventListener("click", () => {
    document.getElementById("garden").scrollIntoView({
        behavior: "smooth"
    });

    showToast("Welcome to your garden!");
});

// Favourite buttons
document.querySelectorAll(".favorite").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");

        if (button.classList.contains("active")) {
            button.textContent = "♥";
            showToast("Plant added to favourites");
        } else {
            button.textContent = "♡";
            showToast("Plant removed from favourites");
        }
    });
});

// Complete task buttons
document.querySelectorAll(".complete-btn").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("completed");

        if (button.classList.contains("completed")) {
            button.textContent = "✓";
            showToast("Task completed 🌿");
        } else {
            button.textContent = "✓";
            showToast("Task marked as incomplete");
        }
    });
});

// Location button
locationBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
        showToast("Location is not supported by your browser");
        return;
    }

    locationBtn.textContent = "📍 Finding location...";

    navigator.geolocation.getCurrentPosition(
        position => {
            locationBtn.textContent = "📍 Location detected";

            showToast(
                `Location detected: ${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`
            );
        },
        () => {
            locationBtn.textContent = "📍 Use my location";
            showToast("Location permission was not granted");
        }
    );
});

// View all button
document.getElementById("viewAllBtn").addEventListener("click", () => {
    showToast("Showing all plants in your garden");
});

// Keyboard shortcuts
document.addEventListener("keydown", event => {

    // Press G to go to garden
    if (
        event.key.toLowerCase() === "g" &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
    ) {
        document.getElementById("garden").scrollIntoView({
            behavior: "smooth"
        });
    }

    // Press W to go to weather
    if (
        event.key.toLowerCase() === "w" &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
    ) {
        document.getElementById("weather").scrollIntoView({
            behavior: "smooth"
        });
    }

    // Press T to toggle theme
    if (
        event.key.toLowerCase() === "t" &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
    ) {
        themeToggle.click();
    }
});