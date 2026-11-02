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
    
    if (track) {
        const slides = Array.from(track.children);
        let currentIndex = 0;

        function nextSlide() {
            currentIndex++;
            
            if (currentIndex >= slides.length) {
                currentIndex = 0;
            }

            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // Auto-slide every 3 seconds
        setInterval(nextSlide, 3000);
    }

    // --- 3. WHATSAPP QUOTATION FORM ---
    const quoteForm = document.getElementById("quoteForm");
    
    if (quoteForm) {
        quoteForm.addEventListener("submit", function(e) {
            e.preventDefault(); 
            
            // Get the values from the form
            const name = document.getElementById("qName").value;
            const phone = document.getElementById("qPhone").value;
            const location = document.getElementById("qLocation").value;
            const service = document.getElementById("qService").value;
            const message = document.getElementById("qMessage").value;
            
            // Format the text for WhatsApp
            const waText = `Hello Bra Ike Towing! I would like to request a quote.%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Location:* ${location}%0A*Service Needed:* ${service}%0A*Details:* ${message}`;
            
            // Open WhatsApp with the business number (+27 73 638 2838)
            window.open(`https://wa.me/27736382838?text=${waText}`, "_blank");
        });
    }
});