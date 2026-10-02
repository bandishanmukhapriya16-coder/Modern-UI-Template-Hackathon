const themeToggle = document.getElementById("themeToggle");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const remainingCount = document.getElementById("remainingCount");
const takenCount = document.getElementById("takenCount");

const medicationCards = document.querySelectorAll(".medication-card");
const doseButtons = document.querySelectorAll(".dose-btn");
const takeButtons = document.querySelectorAll(".take-btn");

const reminderBtn = document.getElementById("reminderBtn");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


// ===============================
// DARK MODE
// ===============================

if (localStorage.getItem("medly-theme") === "dark") {
    document.body.classList.add("dark-mode");
}

themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "medly-theme",
        isDark ? "dark" : "light"
    );

    showToast(
        isDark
            ? "Dark mode enabled"
            : "Light mode enabled"
    );
});


// ===============================
// MOBILE MENU
// ===============================

menuBtn?.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuBtn.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");
    });
});


// ===============================
// TOAST
// ===============================

let toastTimer;

function showToast(message) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


// ===============================
// MEDICATION STATISTICS
// ===============================

function updateMedicationStats() {
    let taken = 0;
    let remaining = 0;

    medicationCards.forEach(card => {
        if (card.classList.contains("taken")) {
            taken++;
        } else {
            remaining++;
        }
    });

    if (takenCount) {
        takenCount.textContent = taken;
    }

    if (remainingCount) {
        remainingCount.textContent = remaining;
    }

    updateProgress(taken);
}


// ===============================
// PROGRESS
// ===============================

function updateProgress(taken) {
    const total = medicationCards.length;

    if (total === 0) return;

    const percentage = Math.round(
        (taken / total) * 100
    );

    const progressValue =
        document.querySelector(".progress-value");

    const progressFill =
        document.querySelector(".progress-fill");

    if (progressValue) {
        progressValue.textContent = `${percentage}%`;
    }

    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
}


// ===============================
// MARK MEDICATION AS TAKEN
// ===============================

takeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card =
            button.closest(".medication-card");

        if (!card) return;

        const medicationName =
            card.querySelector("h3")?.textContent ||
            "Medication";

        const alreadyTaken =
            card.classList.contains("taken");

        if (alreadyTaken) {

            card.classList.remove("taken");

            button.textContent =
                "Mark as taken";

            button.classList.remove("completed");

            showToast(
                `${medicationName} marked as upcoming`
            );

        } else {

            card.classList.add("taken");

            button.textContent =
                "Taken ✓";

            button.classList.add("completed");

            showToast(
                `${medicationName} marked as taken`
            );
        }

        updateMedicationStats();
    });

});


// ===============================
// DOSE DETAILS
// ===============================

doseButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card =
            button.closest(".medication-card");

        if (!card) return;

        const medicationName =
            card.querySelector("h3")?.textContent ||
            "Medication";

        if (card.classList.contains("taken")) {

            showToast(
                `${medicationName} was already marked as taken`
            );

        } else {

            showToast(
                `Dose details opened for ${medicationName}`
            );
        }

    });

});


// ===============================
// REMINDER BUTTON
// ===============================

reminderBtn?.addEventListener("click", () => {

    const isSet =
        reminderBtn.classList.contains("active");

    if (isSet) {

        reminderBtn.classList.remove("active");

        reminderBtn.textContent =
            "Set reminder";

        showToast("Reminder turned off");

    } else {

        reminderBtn.classList.add("active");

        reminderBtn.textContent =
            "Reminder set ✓";

        showToast(
            "Reminder set for 8:00 PM"
        );
    }

});


// ===============================
// SCHEDULE INTERACTION
// ===============================

document
    .querySelectorAll(".schedule-item")
    .forEach(item => {

        item.addEventListener("click", () => {

            const title =
                item.querySelector("h4");

            if (title) {

                showToast(
                    `Schedule selected: ${title.textContent}`
                );

            }

        });

    });


// ===============================
// SMOOTH SCROLL
// ===============================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

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

        });

    });


// ===============================
// KEYBOARD SHORTCUTS
// ===============================

document.addEventListener("keydown", event => {

    const key =
        event.key.toLowerCase();

    if (key === "m") {

        document
            .querySelector("#medications")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    }

    if (key === "s") {

        document
            .querySelector("#schedule")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    }

    if (key === "t") {
        themeToggle?.click();
    }

    if (event.key === "Escape") {

        navLinks?.classList.remove("active");

        menuBtn?.classList.remove("active");
    }

});


// ===============================
// SCROLL ANIMATION
// ===============================

const animatedElements =
    document.querySelectorAll(
        ".overview-card, .medication-card, .schedule-item"
    );

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );

animatedElements.forEach(element => {
    observer.observe(element);
});


// ===============================
// INITIALIZE
// ===============================

updateMedicationStats();

setTimeout(() => {
    showToast("Welcome to Medly");
}, 800);