const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const scanBtn = document.getElementById("scanBtn");
const insightBtn = document.getElementById("insightBtn");
const historyBtn = document.getElementById("historyBtn");


// -----------------------------------------
// Toast
// -----------------------------------------

function showToast(message) {
    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


// -----------------------------------------
// Theme
// -----------------------------------------

const savedTheme = localStorage.getItem("soilsense-theme");

if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark");

    const darkMode = body.classList.contains("dark");

    themeToggle.textContent = darkMode ? "🌙" : "☀️";

    localStorage.setItem(
        "soilsense-theme",
        darkMode ? "dark" : "light"
    );

    showToast(
        darkMode
            ? "Dark mode enabled"
            : "Light mode enabled"
    );
});


// -----------------------------------------
// Mobile Menu
// -----------------------------------------

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    menuBtn.textContent =
        navLinks.classList.contains("open")
            ? "✕"
            : "☰";
});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuBtn.textContent = "☰";
    });

});


// -----------------------------------------
// Soil Scan Simulation
// -----------------------------------------

scanBtn.addEventListener("click", () => {

    scanBtn.disabled = true;

    scanBtn.textContent = "Scanning...";

    showToast("Scanning soil sensors...");

    const moisture = document.getElementById("moistureValue");
    const temperature = document.getElementById("temperatureValue");
    const ph = document.getElementById("phValue");
    const nutrients = document.getElementById("nutrientValue");

    setTimeout(() => {

        moisture.textContent =
            Math.floor(64 + Math.random() * 8);

        temperature.textContent =
            Math.floor(22 + Math.random() * 5);

        ph.textContent =
            (6.3 + Math.random() * 0.7).toFixed(1);

        nutrients.textContent =
            Math.floor(68 + Math.random() * 10);

    }, 900);


    setTimeout(() => {

        scanBtn.disabled = false;

        scanBtn.textContent = "Scan soil";

        showToast("Soil scan completed successfully 🌱");

    }, 1800);

});


// -----------------------------------------
// Refresh Insights
// -----------------------------------------

insightBtn.addEventListener("click", () => {

    insightBtn.textContent = "Refreshing...";

    setTimeout(() => {

        insightBtn.textContent = "Refresh insights";

        showToast("Soil insights updated");

    }, 1200);

});


// -----------------------------------------
// Detailed Report
// -----------------------------------------

historyBtn.addEventListener("click", () => {

    showToast("Detailed soil report is being prepared");

});


// -----------------------------------------
// Chart interaction
// -----------------------------------------

document.querySelectorAll(".bar").forEach(bar => {

    bar.addEventListener("click", () => {

        document.querySelectorAll(".bar").forEach(item => {
            item.classList.remove("active-bar");
        });

        bar.classList.add("active-bar");

        showToast("Moisture reading selected");

    });

});


// -----------------------------------------
// Keyboard Shortcuts
// -----------------------------------------

document.addEventListener("keydown", event => {

    const tag = document.activeElement.tagName;

    if (tag === "INPUT" || tag === "TEXTAREA") {
        return;
    }


    // S = Scan soil
    if (event.key.toLowerCase() === "s") {
        scanBtn.click();
    }


    // I = Insights
    if (event.key.toLowerCase() === "i") {

        document.getElementById("insights")
            .scrollIntoView({
                behavior: "smooth"
            });

    }


    // H = History
    if (event.key.toLowerCase() === "h") {

        document.getElementById("history")
            .scrollIntoView({
                behavior: "smooth"
            });

    }


    // T = Theme
    if (event.key.toLowerCase() === "t") {
        themeToggle.click();
    }

});