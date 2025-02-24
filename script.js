document.addEventListener("DOMContentLoaded", () => {
    function enterFullScreen() {
        let elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }

    // Enable full screen on click
    document.body.addEventListener("click", enterFullScreen);

    // Drag to scroll functionality with smooth scroll behavior
    const gameGrid = document.querySelector(".game-grid");
    let isDown = false;
    let startX;
    let scrollLeft;

    gameGrid.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - gameGrid.offsetLeft;
        scrollLeft = gameGrid.scrollLeft;
    });

    gameGrid.addEventListener("mouseleave", () => {
        isDown = false;
    });

    gameGrid.addEventListener("mouseup", () => {
        isDown = false;
    });

    gameGrid.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - gameGrid.offsetLeft;
        const walk = (x - startX) * 2;
        gameGrid.scrollLeft = scrollLeft - walk;

        // Smooth scroll effect on drag release
        gameGrid.style.scrollBehavior = 'smooth';
    });

    // Touch support
    let touchStartX = 0;
    let touchScrollLeft = 0;

    gameGrid.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = gameGrid.scrollLeft;
    });

    gameGrid.addEventListener("touchmove", (e) => {
        const touchX = e.touches[0].pageX;
        const move = touchX - touchStartX;
        gameGrid.scrollLeft = touchScrollLeft - move;
    });
});
