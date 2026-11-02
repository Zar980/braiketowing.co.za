
"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. MOBILE NAVIGATION
    // ==========================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    function closeMenu() {
        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("is-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

        });

        // Close menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", closeMenu);

        });

        // Close menu when Escape is pressed
        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        // Close menu when clicking outside
        document.addEventListener("click", function (event) {

            if (
                navLinks.classList.contains("is-open") &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        });

    }


    // ==========================================
    // 2. GALLERY CAROUSEL
    // ==========================================

    const track = document.getElementById("carouselTrack");

    if (track) {

        const slides = Array.from(track.children);

        let currentIndex = 0;
        let carouselInterval = null;

        const slideDuration = 4000;

        function showSlide(index) {

            if (!slides.length) return;

            currentIndex = (index + slides.length) % slides.length;

            track.style.transform =
                `translateX(-${currentIndex * 100}%)`;

        }

        function nextSlide() {

            showSlide(currentIndex + 1);

        }

        function startCarousel() {

            if (slides.length <= 1 || carouselInterval) return;

            carouselInterval = setInterval(
                nextSlide,
                slideDuration
            );

        }

        function stopCarousel() {

            if (carouselInterval) {

                clearInterval(carouselInterval);

                carouselInterval = null;

            }

        }

        // Start automatic carousel
        startCarousel();

        // Pause while user hovers over gallery
        track.addEventListener("mouseenter", stopCarousel);

        track.addEventListener("mouseleave", startCarousel);

        // Pause when browser tab is inactive
        document.addEventListener("visibilitychange", function () {

            if (document.hidden) {
                stopCarousel();
            } else {
                startCarousel();
            }

        });

        // Pause when user prefers reduced motion
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        if (reducedMotion.matches) {
            stopCarousel();
        }

        if (reducedMotion.addEventListener) {

            reducedMotion.addEventListener("change", function (event) {

                if (event.matches) {
                    stopCarousel();
                } else {
                    startCarousel();
                }

            });

        }

    }


    // ==========================================
    // 3. WHATSAPP QUOTATION FORM
    // ==========================================

    const quoteForm = document.getElementById("quoteForm");

    if (quoteForm) {

        quoteForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!quoteForm.reportValidity()) {
                return;
            }

            const formData = new FormData(quoteForm);

            const name = String(formData.get("name") || "").trim();
            const phone = String(formData.get("phone") || "").trim();
            const vehicle = String(formData.get("vehicle") || "").trim();
            const service = String(formData.get("service") || "").trim();
            const location = String(formData.get("location") || "").trim();

            const destination = String(
                formData.get("destination") || ""
            ).trim();

            const message = String(
                formData.get("message") || ""
            ).trim();

            const whatsappMessage = [

                "BRA IKE TOWING - NEW ENQUIRY",

                "",

                "Customer Name: " + name,

                "Contact Number: " + phone,

                "Vehicle: " + vehicle,

                "Service Required: " + service,

                "Current Location: " + location,

                "Destination: " + (destination || "Not specified"),

                "",

                "Additional Information:",

                message || "None",

                "",

                "Please assist with availability and a quotation."

            ].join("\n");

            trackEnquiry("quotation_form");

            const whatsappURL =
                "https://wa.me/27793633447?text=" +
                encodeURIComponent(whatsappMessage);

            window.location.href = whatsappURL;

        });

    }


    // ==========================================
    // 4. CUSTOMER ENQUIRY TRACKING
    // ==========================================

    function trackEnquiry(action) {

        // Google Tag Manager / Google Analytics
        if (Array.isArray(window.dataLayer)) {

            window.dataLayer.push({

                event: "towing_enquiry",

                enquiry_type: action

            });

        }

    }

    // Track phone and WhatsApp button clicks
    document.querySelectorAll("[data-track]").forEach(function (element) {

        element.addEventListener("click", function () {

            const action = element.getAttribute("data-track");

            trackEnquiry(action);

        });

    });


    // ==========================================
    // 5. AUTOMATIC COPYRIGHT YEAR
    // ==========================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }


    // ==========================================
    // 6. CONSOLE MESSAGE
    // ==========================================

    console.info("Bra Ike Towing website JavaScript loaded successfully.");

});
