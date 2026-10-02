const body = document.body;

const themeToggle = document.getElementById("themeToggle");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const resumeFile = document.getElementById("resumeFile");
const uploadStatus = document.getElementById("uploadStatus");
const analyzeBtn = document.getElementById("analyzeBtn");

const scoreValue = document.getElementById("scoreValue");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


// =========================================
// Toast
// =========================================

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}


// =========================================
// Theme
// =========================================

const savedTheme = localStorage.getItem("resumeai-theme");

if (savedTheme === "dark") {

    body.classList.add("dark");

    themeToggle.textContent = "🌙";
}


themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");

    themeToggle.textContent = isDark ? "🌙" : "☀️";

    localStorage.setItem(
        "resumeai-theme",
        isDark ? "dark" : "light"
    );

    showToast(
        isDark
            ? "Dark mode enabled"
            : "Light mode enabled"
    );
});


// =========================================
// Mobile Navigation
// =========================================

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


// =========================================
// Resume File Selection
// =========================================

resumeFile.addEventListener("change", () => {

    const file = resumeFile.files[0];

    if (!file) {

        uploadStatus.textContent = "No file selected";

        return;
    }


    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {

        uploadStatus.textContent =
            "File is larger than 5 MB";

        showToast("Please choose a file under 5 MB");

        resumeFile.value = "";

        return;
    }


    const fileName = file.name;

    uploadStatus.textContent =
        `Selected: ${fileName}`;

    showToast("Resume selected successfully");
});


// =========================================
// Resume Analysis Simulation
// =========================================

analyzeBtn.addEventListener("click", () => {

    if (!resumeFile.files.length) {

        showToast("Please choose your resume first");

        return;
    }


    analyzeBtn.disabled = true;

    analyzeBtn.innerHTML =
        "Analyzing resume... <span>✦</span>";


    showToast("AI analysis started");


    setTimeout(() => {

        scoreValue.textContent = "88";

        showToast("Content analysis completed");

    }, 900);


    setTimeout(() => {

        scoreValue.textContent = "91";

        showToast("Keyword analysis completed");

    }, 1700);


    setTimeout(() => {

        scoreValue.textContent = "93";

    }, 2400);


    setTimeout(() => {

        analyzeBtn.disabled = false;

        analyzeBtn.innerHTML =
            "Analyze again <span>✦</span>";

        showToast(
            "Resume analysis completed successfully"
        );

    }, 2800);

});


// =========================================
// Feature Card Interactions
// =========================================

document.querySelectorAll(".feature-card a").forEach(link => {

    link.addEventListener("click", () => {

        showToast("Opening resume analysis section");

    });

});


// =========================================
// Upload Area Drag & Drop
// =========================================

const uploadCard = document.querySelector(".upload-card");

uploadCard.addEventListener("dragover", event => {

    event.preventDefault();

    uploadCard.style.borderColor = "var(--primary)";

});


uploadCard.addEventListener("dragleave", () => {

    uploadCard.style.borderColor = "";

});


uploadCard.addEventListener("drop", event => {

    event.preventDefault();

    uploadCard.style.borderColor = "";

    const files = event.dataTransfer.files;

    if (!files.length) {
        return;
    }

    const file = files[0];

    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.type)) {

        showToast("Please upload a PDF or DOCX file");

        return;
    }


    if (file.size > 5 * 1024 * 1024) {

        showToast("File must be under 5 MB");

        return;
    }


    uploadStatus.textContent =
        `Selected: ${file.name}`;

    showToast("Resume added successfully");
});


// =========================================
// Smooth Section Navigation
// =========================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        if (
            targetId === "#" ||
            !document.querySelector(targetId)
        ) {
            return;
        }

        event.preventDefault();

        document
            .querySelector(targetId)
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    });

});


// =========================================
// Keyboard Shortcuts
// =========================================

document.addEventListener("keydown", event => {

    const activeElement =
        document.activeElement.tagName;

    if (
        activeElement === "INPUT" ||
        activeElement === "TEXTAREA"
    ) {
        return;
    }


    // C = Resume Checker
    if (event.key.toLowerCase() === "c") {

        document
            .getElementById("checker")
            .scrollIntoView({
                behavior: "smooth"
            });
    }


    // F = Features
    if (event.key.toLowerCase() === "f") {

        document
            .getElementById("features")
            .scrollIntoView({
                behavior: "smooth"
            });
    }


    // T = Theme
    if (event.key.toLowerCase() === "t") {

        themeToggle.click();

    }

});


// =========================================
// Initial Page Message
// =========================================

window.addEventListener("load", () => {

    setTimeout(() => {

        showToast(
            "Welcome to ResumeAI ✦"
        );

    }, 800);

});