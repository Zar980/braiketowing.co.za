// Wait for the HTML document to fully load
document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. MOBILE MENU TOGGLE ---
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function() {
            navLinks.classList.toggle("active");
        });
    }

    // --- 2. GALLERY CAROUSEL ---
    const track = document.getElementById("carouselTrack");
    
    // If the track doesn't exist on this page, stop here
    if (!track) return;

    const slides = Array.from(track.children);
    let currentIndex = 0;

    function nextSlide() {
        currentIndex++;
        
        // If we reach the end, loop back to the first slide
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }

        // Move the track to the left by 100% per slide
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Auto-slide every 3 seconds
    setInterval(nextSlide, 3000);
});