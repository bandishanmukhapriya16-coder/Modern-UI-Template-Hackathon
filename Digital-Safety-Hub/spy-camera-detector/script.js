/* =========================
   NAVIGATION
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuBtn.textContent =
        navLinks.classList.contains("active")
            ? "✕"
            : "☰";

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

const themeBtn =
    document.getElementById("themeBtn");

if (localStorage.getItem("safeScanTheme") === "dark") {

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
        "safeScanTheme",
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

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

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
   SCANNER
========================= */

const scanButton =
    document.getElementById("scanButton");

const startScanBtn =
    document.getElementById("startScanBtn");

const ctaScan =
    document.getElementById("ctaScan");

const scanStatus =
    document.getElementById("scanStatus");

const scanSubtext =
    document.getElementById("scanSubtext");

const scanPercent =
    document.getElementById("scanPercent");


let scanning = false;


function startScan() {

    if (scanning) {
        return;
    }

    scanning = true;

    scanButton.disabled = true;

    scanButton.textContent =
        "Scanning...";

    scanStatus.textContent =
        "Checking environment";

    scanSubtext.textContent =
        "Privacy review in progress";

    let progress = 0;

    const scanInterval =
        setInterval(() => {

            progress += Math.floor(
                Math.random() * 8
            ) + 4;

            if (progress >= 100) {

                progress = 100;

                clearInterval(scanInterval);

                finishScan();

            }

            scanPercent.textContent =
                `${progress}%`;

        }, 180);

}


function finishScan() {

    scanStatus.textContent =
        "Review complete";

    scanSubtext.textContent =
        "No automatic conclusion detected";

    scanButton.disabled = false;

    scanButton.textContent =
        "Run Scan Again";

    scanning = false;

    showToast(
        "Safety scan simulation completed."
    );

    document.getElementById("score").textContent =
        "98";

}


scanButton.addEventListener(
    "click",
    startScan
);


startScanBtn.addEventListener(
    "click",
    () => {

        document.getElementById("scanner")
            .scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        setTimeout(() => {
            startScan();
        }, 600);

    }
);


ctaScan.addEventListener(
    "click",
    () => {

        document.getElementById("scanner")
            .scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        setTimeout(() => {
            startScan();
        }, 600);

    }
);


/* =========================
   SAFETY CHECK BUTTONS
========================= */

const checkButtons =
    document.querySelectorAll(".check-btn");


checkButtons.forEach(button => {

    button.addEventListener("click", () => {

        const checkName =
            button.dataset.check;

        showToast(
            `${checkName} started.`
        );

        button.textContent =
            "Check selected ✓";

        setTimeout(() => {

            button.textContent =
                "Run Check →";

        }, 1800);

    });

});


/* =========================
   KEYBOARD SHORTCUTS
========================= */

document.addEventListener("keydown", event => {

    if (
        event.key.toLowerCase() === "s" &&
        document.activeElement.tagName !== "INPUT"
    ) {

        startScan();

    }

    if (
        event.key.toLowerCase() === "d" &&
        document.activeElement.tagName !== "INPUT"
    ) {

        themeBtn.click();

    }

});


/* =========================
   NAVBAR SHADOW
========================= */

window.addEventListener("scroll", () => {

    const navbar =
        document.querySelector(".navbar");

    if (window.scrollY > 30) {

        navbar.style.boxShadow =
            "0 8px 30px rgba(16,24,40,0.06)";

    } else {

        navbar.style.boxShadow =
            "none";

    }

});


/* =========================
   INITIAL MESSAGE
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        showToast(
            "SafeScan is ready."
        );

    }, 700);

});