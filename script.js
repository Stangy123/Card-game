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

    // Drag to scroll functionality with enhanced smooth scroll behavior
    const gameGrid = document.querySelector(".game-grid");
    let isDown = false;
    let startX;
    let scrollLeft;

    // mousedown event: Track the initial position
    gameGrid.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - gameGrid.offsetLeft;
        scrollLeft = gameGrid.scrollLeft;
    });

    // mouseleave and mouseup: End the dragging
    gameGrid.addEventListener("mouseleave", () => {
        isDown = false;
    });

    gameGrid.addEventListener("mouseup", () => {
        isDown = false;
    });

    // mousemove: Smooth dragging with `requestAnimationFrame`
    gameGrid.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - gameGrid.offsetLeft;
        const walk = (x - startX) * 2;

        // Smooth dragging with requestAnimationFrame for smoother animations
        requestAnimationFrame(() => {
            gameGrid.scrollLeft = scrollLeft - walk;
        });
    });

    // Touch support for mobile devices with smooth scroll
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
