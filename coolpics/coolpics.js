const menuButton = document.querySelector(".menu-button");

function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("show");
}

menuButton.addEventListener("click", toggleMenu);
