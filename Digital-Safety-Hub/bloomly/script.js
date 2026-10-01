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

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("bloomlyTheme") === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀";

}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    themeBtn.textContent =
        isDark ? "☀" : "☾";

    localStorage.setItem(
        "bloomlyTheme",
        isDark ? "dark" : "light"
    );

    showToast(
        isDark
            ? "Dark mode enabled."
            : "Light mode enabled."
    );

});


/* =========================
   SEARCH
========================= */

const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {

    searchPanel.classList.add("active");

    setTimeout(() => {
        searchInput.focus();
    }, 200);

});


closeSearch.addEventListener("click", () => {

    searchPanel.classList.remove("active");

});


searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        const value =
            searchInput.value.trim();

        if (value) {

            showToast(
                `Searching for "${value}"`
            );

            searchPanel.classList.remove("active");

        }

    }

    if (event.key === "Escape") {

        searchPanel.classList.remove("active");

    }

});


/* =========================
   TOAST
========================= */

const toast = document.getElementById("toast");
const toastMessage =
    document.getElementById("toastMessage");

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
   CART
========================= */

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutBtn =
    document.getElementById("checkoutBtn");


let cart = [];


function openCart() {

    cartDrawer.classList.add("active");

    overlay.classList.add("active");

}


function closeCartDrawer() {

    cartDrawer.classList.remove("active");

    overlay.classList.remove("active");

}


cartBtn.addEventListener(
    "click",
    openCart
);

closeCart.addEventListener(
    "click",
    closeCartDrawer
);

overlay.addEventListener(
    "click",
    closeCartDrawer
);


/* =========================
   ADD TO CART
========================= */

document.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click", () => {

        const product =
            button.dataset.product;

        const price =
            Number(button.dataset.price);

        cart.push({
            product,
            price
        });

        updateCart();

        showToast(
            `${product} added to your bag.`
        );

    });

});


function updateCart() {

    cartCount.textContent = cart.length;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <span>🌷</span>
                <h3>Your bag is empty</h3>
                <p>Add something beautiful.</p>
            </div>
        `;

        cartTotal.textContent = "₹0";

        return;
    }


    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach((item, index) => {

        total += item.price;

        const itemElement =
            document.createElement("div");

        itemElement.className =
            "cart-item";

        itemElement.innerHTML = `

            <div class="cart-item-icon">
                🌷
            </div>

            <div class="cart-item-info">

                <strong>
                    ${item.product}
                </strong>

                <span>
                    ₹${item.price.toLocaleString("en-IN")}
                </span>

            </div>

            <button
                class="remove-item"
                data-index="${index}"
            >
                Remove
            </button>
        `;

        cartItems.appendChild(itemElement);

    });


    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;


    document
        .querySelectorAll(".remove-item")
        .forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);

                const removed =
                    cart[index].product;

                cart.splice(index, 1);

                updateCart();

                showToast(
                    `${removed} removed.`
                );

            });

        });

}


/* =========================
   CHECKOUT
========================= */

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        showToast(
            "Your bag is empty."
        );

        return;
    }

    showToast(
        "Checkout demo opened."
    );

});


/* =========================
   FAVORITES
========================= */

document.querySelectorAll(".heart-btn").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

        const product =
            button.dataset.product;

        if (button.classList.contains("active")) {

            button.textContent = "♥";

            showToast(
                `${product} saved to favourites.`
            );

        } else {

            button.textContent = "♡";

            showToast(
                `${product} removed from favourites.`
            );

        }

    });

});


/* =========================
   OCCASION BUTTONS
========================= */

document.querySelectorAll(".occasion-card")
    .forEach(button => {

        button.addEventListener("click", () => {

            const category =
                button.dataset.category;

            showToast(
                `${category} collection selected.`
            );

            document
                .getElementById("flowers")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


/* =========================
   GIFT BUTTONS
========================= */

document.querySelectorAll(".gift-card button")
    .forEach(button => {

        button.addEventListener("click", () => {

            const gift =
                button.dataset.gift;

            showToast(
                `${gift} collection selected.`
            );

            document
                .getElementById("gifts")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


/* =========================
   OFFER
========================= */

const offerBtn =
    document.getElementById("offerBtn");

offerBtn.addEventListener("click", () => {

    document
        .getElementById("gifts")
        .scrollIntoView({
            behavior: "smooth"
        });

    showToast(
        "Exploring special gifts."
    );

});


/* =========================
   NEWSLETTER
========================= */

const newsletterForm =
    document.getElementById("newsletterForm");

const emailInput =
    document.getElementById("emailInput");


newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const email =
        emailInput.value.trim();

    if (!email) {
        return;
    }

    showToast(
        "Welcome to the Bloomly family!"
    );

    emailInput.value = "";

});


/* =========================
   KEYBOARD SHORTCUTS
========================= */

document.addEventListener("keydown", event => {

    if (
        event.key === "/" &&
        document.activeElement.tagName !== "INPUT"
    ) {

        event.preventDefault();

        searchPanel.classList.add("active");

        searchInput.focus();

    }

    if (event.key === "Escape") {

        searchPanel.classList.remove("active");

        closeCartDrawer();

    }

});


/* =========================
   SCROLL NAVBAR
========================= */

window.addEventListener("scroll", () => {

    const navbar =
        document.querySelector(".navbar");

    if (window.scrollY > 30) {

        navbar.style.boxShadow =
            "0 8px 30px rgba(55,38,33,0.06)";

    } else {

        navbar.style.boxShadow = "none";

    }

});


/* =========================
   WELCOME MESSAGE
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        showToast(
            "Welcome to Bloomly ✦"
        );

    }, 700);

});