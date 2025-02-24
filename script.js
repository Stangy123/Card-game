document.addEventListener("DOMContentLoaded", () => {
    // Full-Screen Functionality
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

        // Use requestAnimationFrame for smoother animation during drag
        requestAnimationFrame(() => {
            gameGrid.scrollLeft = scrollLeft - walk;
        });

        // Enable smooth scroll behavior
        gameGrid.style.scrollBehavior = 'smooth';
    });

    // Touch support for mobile
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
