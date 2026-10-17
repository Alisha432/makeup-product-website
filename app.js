
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.innerHTML = isOpen
        ? '<i class="bi bi-x-lg"></i>'
        : '<i class="bi bi-list"></i>';
});

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="bi bi-list"></i>';
    });
});



const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const searchInput = document.querySelector("#searchInput");
const noResults = document.querySelector("#noResults");

let selectedCategory = "All";

function showProducts() {
    const searchText = searchInput.value.toLowerCase().trim();
    let visibleProducts = 0;

    productCards.forEach(function (card) {
        const category = card.dataset.category;
        const name = card.dataset.name.toLowerCase();

        const categoryMatch =
            selectedCategory === "All" ||
            category === selectedCategory;

        const searchMatch = name.includes(searchText);

        if (categoryMatch && searchMatch) {
            card.style.display = "";
            visibleProducts++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.hidden = visibleProducts !== 0;
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");
        selectedCategory = button.dataset.filter;

        showProducts();
    });
});

searchInput.addEventListener("input", function () {
    showProducts();
});


const categoryCards = document.querySelectorAll(".category-card");

categoryCards.forEach(function (card) {
    card.addEventListener("click", function () {
        selectedCategory = card.dataset.category;

        filterButtons.forEach(function (button) {
            button.classList.remove("active");

            if (button.dataset.filter === selectedCategory) {
                button.classList.add("active");
            }
        });

        showProducts();
    });
});


const cartCount = document.querySelector("#cartCount");
const quickAddButtons = document.querySelectorAll(".quick-add");
const toast = document.querySelector("#toast");

let totalItems = 0;
let cartItems = [];

function showMessage(message) {
    toast.textContent = message;
    toast.classList.add("show");

    // Restart the toast animation on repeated messages
    toast.style.transition = "none";
    toast.offsetHeight;
    toast.style.transition = "";

    // Automatically hide the message
    clearTimeout(hideToastTimer);
    hideToastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}

let hideToastTimer;

quickAddButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const productName = button.dataset.name;
        const productPrice = Number(button.dataset.price);

        cartItems.push({
            name: productName,
            price: productPrice
        });

        totalItems++;

        cartCount.textContent = totalItems;

        showMessage(productName + " added to your bag!");
    });
});


const newsletterForm = document.querySelector("#newsletterForm");
const newsletterEmail = document.querySelector("#newsletterEmail");
const newsletterMessage = document.querySelector("#newsletterMessage");

newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = newsletterEmail.value.trim();

    if (email === "") {
        newsletterMessage.textContent = "Please enter your email address.";
        return;
    }

    newsletterMessage.textContent =
        "Thank you! Your email has been entered successfully.";

    newsletterForm.reset();
});


// ========== CURRENT YEAR ==========
const footerText = document.querySelector(".footer-bottom p");

footerText.textContent =
    "© " + new Date().getFullYear() +
    " Veloura Beauty. All rights reserved.";
