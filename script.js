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

    // Only enable scrolling for touch devices
    if ("ontouchstart" in document.documentElement) {
        const gameGrid = document.querySelector(".game-grid");
        let touchStartX = 0;
        let touchScrollLeft = 0;
        let touchVelocity = 0;
        let rafId;

        gameGrid.addEventListener("touchstart", (e) => {
            touchStartX = e.touches[0].pageX;
            touchScrollLeft = gameGrid.scrollLeft;
            cancelAnimationFrame(rafId); // Stop momentum
        });

        gameGrid.addEventListener("touchmove", (e) => {
            const touchX = e.touches[0].pageX;
            touchVelocity = (touchX - touchStartX) * 0.1; // Adjust speed
            gameGrid.scrollLeft -= touchVelocity;
        });

        gameGrid.addEventListener("touchend", () => {
            requestMomentumScroll();
        });

        function requestMomentumScroll() {
            if (Math.abs(touchVelocity) < 0.1) return; // Stop if velocity is very low
            gameGrid.scrollLeft -= touchVelocity;
            touchVelocity *= 0.95; // Apply friction to slow down
            rafId = requestAnimationFrame(requestMomentumScroll);
        }
    }
});
