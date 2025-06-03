document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item");
    const infoBox = document.querySelector(".info-box"); // Select the info box
    const loadingText = document.getElementById('loading-text');
    const logo = document.getElementById('logo');
    const loadingScreen = document.getElementById('loading-screen');
    const curtain = document.getElementById('curtain');
    const box = document.querySelector('.box');
    const mainContent = document.getElementById('main-content');
    
    let progress = 0;

    // Function to update loading progress
    function updateLoadingProgress(percent) {
        loadingText.textContent = percent + "%";
        if (percent === 100) {
            logo.style.width = "200px";
            logo.style.opacity = "1";
            logo.style.filter = "grayscale(0)";
        }
    }

    // Use requestAnimationFrame to handle the interval for smoother performance
    function updateProgress() {
        progress += 1;
        updateLoadingProgress(progress);
        if (progress < 100) {
            requestAnimationFrame(updateProgress);
        } else {
            completeLoading();
        }
    }

    function completeLoading() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                curtain.style.transform = 'translateY(0)';
                setTimeout(() => {
                    curtain.style.transform = 'translateY(-100%)';
                    mainContent.classList.remove('hidden');
                    mainContent.classList.add('slide-up');
                    
                    
                }, 500);
            }, 300);
        }, 800);
    }

    function showInfoBoxAndAnimateNav() {
        // Show the info box with fade-in animation
        infoBox.classList.add("visible");

        // Trigger animation for nav items
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add("animated");
                        }, index * 200);
                    });
                    observer.disconnect();
                }
            });
        });

        observer.observe(document.querySelector("header"));
    }

    // Start loading progress
    updateProgress();

    // Resize function remains unchanged
    window.addEventListener('resize', resizeVideo);
    window.addEventListener('load', resizeVideo);

    function resizeVideo() {
        const video = document.getElementById('background-video');
        video.style.width = `${window.innerWidth}px`;
        video.style.height = `${window.innerHeight}px`;
    }
});
