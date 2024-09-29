const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");

function toggleMenu() {
    menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);

function handleResize() {
    if (window.innerWidth > 1000) {
        menu.classList.remove("hide");
    } else {
        menu.classList.add("hide");
    }
}

window.addEventListener("resize", handleResize);
handleResize();

const gallery = document.querySelector(".gallery");
gallery.addEventListener("click", viewHandler);

function viewerTemplate(src, alt) {
    return `
        <div class="viewer">
            <button class="close-viewer">X</button>
            <img src="${src}" alt="${alt}">
        </div>
    `;
}

function viewHandler(event) {
    const img = event.target.closest("img");
    if (!img) return;

    const imgSrc = img.src.split("-")[0];
    const fullImgSrc = `${imgSrc}-full.jpeg`;

    const viewerHTML = viewerTemplate(fullImgSrc, img.alt);
    document.body.insertAdjacentHTML("afterbegin", viewerHTML);

    const closeButton = document.querySelector(".close-viewer");
    closeButton.addEventListener("click", closeViewer);
}

function closeViewer() {
    const viewer = document.querySelector(".viewer");
    viewer.remove();
}
