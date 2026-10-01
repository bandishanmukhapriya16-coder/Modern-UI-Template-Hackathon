/* =========================
   NAVIGATION
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});


/* Close mobile menu after clicking a link */

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

const savedTheme = localStorage.getItem("privacyGuardTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀";
        localStorage.setItem("privacyGuardTheme", "dark");

        showToast("Dark mode enabled.");
    } else {
        themeBtn.textContent = "☾";
        localStorage.setItem("privacyGuardTheme", "light");

        showToast("Light mode enabled.");
    }
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
    }, 2800);
}


/* =========================
   PRIVACY PROTECTION
========================= */

const protectBtn = document.getElementById("protectBtn");
const aboutBtn = document.getElementById("aboutBtn");
const ctaBtn = document.getElementById("ctaBtn");
const privacyToggle = document.getElementById("privacyToggle");


function enableProtection() {

    privacyToggle.checked = true;

    showToast("Privacy protection enabled.");

    document.getElementById("protection").scrollIntoView({
        behavior: "smooth"
    });
}


protectBtn.addEventListener("click", enableProtection);
aboutBtn.addEventListener("click", enableProtection);
ctaBtn.addEventListener("click", enableProtection);


/* =========================
   MAIN PRIVACY TOGGLE
========================= */

privacyToggle.addEventListener("change", () => {

    if (privacyToggle.checked) {
        showToast("Screen privacy protection enabled.");
    } else {
        showToast("Screen privacy protection paused.");
    }

});


/* =========================
   SETTINGS TOGGLES
========================= */

const settingToggles = document.querySelectorAll(".settingToggle");

settingToggles.forEach(toggle => {

    toggle.addEventListener("change", () => {

        const settingName =
            toggle.closest(".setting")
            .querySelector("strong")
            .textContent;

        if (toggle.checked) {
            showToast(`${settingName} enabled.`);
        } else {
            showToast(`${settingName} disabled.`);
        }

    });

});


/* =========================
   FEATURE BUTTONS
========================= */

const learnButtons = document.querySelectorAll(".learn-btn");

learnButtons.forEach(button => {

    button.addEventListener("click", () => {

        const featureName =
            button.closest(".feature-card")
            .querySelector("h3")
            .textContent;

        showToast(`${featureName} selected.`);

    });

});


/* =========================
   KEYBOARD SHORTCUT
========================= */

document.addEventListener("keydown", event => {

    /* Press P to activate protection */

    if (
        event.key.toLowerCase() === "p" &&
        !event.target.matches("input, textarea, button")
    ) {
        enableProtection();
    }

    /* Press D to toggle dark mode */

    if (
        event.key.toLowerCase() === "d" &&
        !event.target.matches("input, textarea, button")
    ) {
        themeBtn.click();
    }

});


/* =========================
   SCROLL EFFECT
========================= */

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 30) {
        navbar.style.boxShadow =
            "0 8px 30px rgba(16, 24, 40, 0.06)";
    } else {
        navbar.style.boxShadow = "none";
    }

});


/* =========================
   INITIAL MESSAGE
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {
        showToast("PrivacyGuard is ready.");
    }, 800);

});