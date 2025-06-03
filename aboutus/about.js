// Scroll-triggered animation for boxes and images (Triggers both scroll down and up)
const boxes = document.querySelectorAll(".about-box");
const images = document.querySelectorAll(".about-image");

function animateOnScroll() {
  const triggerBottom = (window.innerHeight / 5) * 1; // Trigger point

  boxes.forEach((box, index) => {
    const boxTop = box.getBoundingClientRect().top;
    const image = images[index];

    if (boxTop < triggerBottom && boxTop > -box.offsetHeight) {
      box.classList.add("animate");
      image.classList.add("animate");
    } else {
      box.classList.remove("animate");
      image.classList.remove("animate");
    }
  });
}

// Initial call to check on load
animateOnScroll();

// Listen for scroll events
window.addEventListener("scroll", animateOnScroll);
