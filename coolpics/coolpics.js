const menuButton = document.querySelector(".menu-button");


function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("show");
    menu.classList.toggle("hide");
}

function handleResize() {
    const menu = document.querySelector(".menu");
    if (window.innerWidth > 1000) {
        menu.classList.remove("hide");
        menu.classList.add("show");
    } else {
        menu.classList.add("hide");
        menu.classList.remove("show");
    }
}

menuButton.addEventListener("click", toggleMenu);

window.addEventListener("resize", handleResize);

handleResize();



function viewerTemplate(pic, alt) {
    return `
    <div class="viewer show">
        <button class="close-viewer">X</button>
        <img src="${pic}" alt="${alt}">
    </div>`;
}



function viewHandler(event) {
    const target = event.target;

    if (target.tagName === 'IMG') {
        
        const imgSrc = target.src.split('-sm')[0];
        const largeImgSrc = imgSrc + '-full.jpeg';

        
        document.body.insertAdjacentHTML("afterbegin", viewerTemplate(largeImgSrc, target.alt));

        
        const closeButton = document.querySelector('.close-viewer');
        closeButton.addEventListener('click', closeViewer);
    }
}



function closeViewer() {
    const viewer = document.querySelector('.viewer');
    if (viewer) {
        viewer.classList.remove('show');
        viewer.remove();
    }
}


const gallery = document.querySelector('.gallery');
gallery.addEventListener('click', viewHandler);
