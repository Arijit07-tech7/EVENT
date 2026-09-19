/* =========================================================
   SPLASH SCREEN
========================================================= */

const splash = document.getElementById("splashScreen");
const progress = document.getElementById("loadingProgress");
const percent = document.getElementById("loadingPercent");

let loading = 0;

const loader = setInterval(() => {

    loading += Math.floor(Math.random() * 5) + 2;

    if (loading >= 100) {
        loading = 100;
        clearInterval(loader);

        setTimeout(() => {
            splash.classList.add("hide");
            document.body.style.overflow = "";
        }, 500);
    }

    progress.style.width = `${loading}%`;
    percent.textContent = `${loading}%`;

}, 55);


/* Prevent scrolling while splash is visible */

document.body.style.overflow = "hidden";


/* =========================================================
   PARTICLES
========================================================= */

const particlesContainer = document.getElementById("particles");

for (let i = 0; i < 55; i++) {

    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left = `${Math.random() * 100}%`;

    particle.style.animationDuration =
        `${8 + Math.random() * 15}s`;

    particle.style.animationDelay =
        `${Math.random() * 12}s`;

    const size = Math.random() * 2 + 1;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particlesContainer.appendChild(particle);
}


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;

});


/* =========================================================
   COUNTDOWN
========================================================= */

const eventDate = new Date(
    "September 22, 2026 10:00:00"
).getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = eventDate - now;

    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    observer.observe(element);

});


/* =========================================================
   STAGGER ASSIGNMENT CARDS
========================================================= */

const assignmentCards =
    document.querySelectorAll(".assignment-card");


assignmentCards.forEach((card, index) => {

    card.style.transitionDelay =
        `${index * 80}ms`;

});


/* =========================================================
   STAGGER TEAM CARDS
========================================================= */

const personCards =
    document.querySelectorAll(".person-card");


personCards.forEach((card, index) => {

    card.style.transitionDelay =
        `${index * 70}ms`;

});


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        navbar.style.background =
            "rgba(6,6,13,.82)";

        navbar.style.boxShadow =
            "0 15px 50px rgba(0,0,0,.25)";

    } else {

        navbar.style.background =
            "rgba(6,6,13,.58)";

        navbar.style.boxShadow =
            "none";

    }

});


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   TILT EFFECT — DESKTOP ONLY
========================================================= */

const tiltCards =
    document.querySelectorAll(
        ".assignment-card, .person-card, .instruction-card"
    );


if (window.innerWidth > 900) {

    tiltCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateX =
                ((y / rect.height) - 0.5) * -4;

            const rotateY =
                ((x / rect.width) - 0.5) * 4;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-6px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

}


/* =========================================================
   DYNAMIC YEAR
========================================================= */

const currentYear =
    new Date().getFullYear();

console.log(
    `Partition Presentation • ${currentYear}`
);