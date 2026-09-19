/* =========================================================
   SHAKTI — INTERACTION ENGINE
========================================================= */


/* =========================================================
   HELPERS
========================================================= */

const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    document.querySelectorAll(selector);


/* =========================================================
   SPLASH SCREEN
========================================================= */

window.addEventListener("load", () => {

    const splash = $("#splash");

    if (!splash) return;

    setTimeout(() => {

        splash.classList.add("hide");

        document.body.classList.add("loaded");

    }, 2800);

});


/* =========================================================
   PARTICLES
========================================================= */

const particles =
    $("#particles");


function createParticle() {

    if (!particles) return;

    const element =
        document.createElement("span");

    element.className =
        "particle";

    element.style.left =
        `${Math.random() * 100}%`;

    element.style.animationDuration =
        `${7 + Math.random() * 12}s`;

    element.style.animationDelay =
        `${Math.random() * 10}s`;

    element.style.opacity =
        `${.25 + Math.random() * .7}`;

    const size =
        1 + Math.random() * 3;

    element.style.width =
        `${size}px`;

    element.style.height =
        `${size}px`;

    element.style.setProperty(
        "--drift",
        `${-80 + Math.random() * 160}px`
    );

    particles.appendChild(element);
}


for (let i = 0; i < 80; i++) {

    createParticle();

}


/* =========================================================
   PETALS
========================================================= */

const petals =
    $("#petals");


function createPetal() {

    if (!petals) return;

    const element =
        document.createElement("span");

    element.className =
        "petal";

    element.style.left =
        `${Math.random() * 100}%`;

    element.style.animationDuration =
        `${9 + Math.random() * 13}s`;

    element.style.animationDelay =
        `${Math.random() * 12}s`;

    element.style.opacity =
        `${.18 + Math.random() * .55}`;

    element.style.transform =
        `scale(${.6 + Math.random() * .9})`;

    petals.appendChild(element);
}


for (let i = 24; i < 44; i++) {

    createPetal();

}


/* =========================================================
   COUNTDOWN
========================================================= */

const presentationDate =
    new Date(
        "September 22, 2026 10:00:00"
    ).getTime();


function updateCountdown() {

    const distance =
        presentationDate - Date.now();


    const days =
        Math.max(
            0,
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            )
        );


    const hours =
        Math.max(
            0,
            Math.floor(
                (
                    distance %
                    (1000 * 60 * 60 * 24)
                ) /
                (1000 * 60 * 60)
            )
        );


    const minutes =
        Math.max(
            0,
            Math.floor(
                (
                    distance %
                    (1000 * 60 * 60)
                ) /
                (1000 * 60)
            )
        );


    const seconds =
        Math.max(
            0,
            Math.floor(
                (
                    distance %
                    (1000 * 60)
                ) /
                1000
            )
        );


    const values = {

        days,
        hours,
        minutes,
        seconds

    };


    Object.entries(values)
        .forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(id);

                if (!element) return;

                element.textContent =
                    String(value)
                        .padStart(2, "0");

            }
        );

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    $$(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },
            {
                threshold: .12,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   MOUSE PARALLAX
========================================================= */

const visual =
    $(".divine-visual");


let mouseX = 0;
let mouseY = 0;

let visualX = 0;
let visualY = 0;


window.addEventListener(
    "mousemove",
    event => {

        if (
            window.innerWidth < 850
        ) {
            return;
        }


        mouseX =
            event.clientX /
            window.innerWidth
            - .5;


        mouseY =
            event.clientY /
            window.innerHeight
            - .5;

    },
    {
        passive: true
    }
);


function animateVisual() {

    if (
        visual &&
        window.innerWidth >= 850
    ) {

        visualX +=
            (
                mouseX * 16 -
                visualX
            ) * .035;


        visualY +=
            (
                mouseY * 11 -
                visualY
            ) * .035;


        visual.style.setProperty(
            "--visual-x",
            `${visualX}px`
        );


        visual.style.setProperty(
            "--visual-y",
            `${visualY}px`
        );

    }


    requestAnimationFrame(
        animateVisual
    );

}


animateVisual();


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

$$(
    'a[href^="#"]'
).forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const navbar =
                    $(".navbar");


                const offset =
                    navbar
                        ? navbar.offsetHeight
                        : 70;


                const position =
                    target.getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    offset
                    -
                    10;


                window.scrollTo({

                    top: position,

                    behavior: "smooth"

                });

            }
        );

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    $$("section[id]");

const navLinks =
    $$(".navbar nav a");


function updateNavigation() {

    let current =
        "home";


    const scroll =
        window.scrollY + 180;


    sections.forEach(
        section => {

            if (
                scroll >=
                section.offsetTop
            ) {

                current =
                    section.id;

            }

        }
    );


    navLinks.forEach(
        link => {

            const target =
                link.getAttribute(
                    "href"
                );


            const active =
                target ===
                `#${current}`;


            link.classList.toggle(
                "active",
                active
            );

        }
    );

}


window.addEventListener(
    "scroll",
    updateNavigation,
    {
        passive: true
    }
);


updateNavigation();


/* =========================================================
   NAVBAR SCROLL
========================================================= */

const navbar =
    $(".navbar");


window.addEventListener(
    "scroll",
    () => {

        if (!navbar) return;


        if (
            window.scrollY > 50
        ) {

            navbar.style.background =
                "rgba(4,1,2,.94)";

            navbar.style.boxShadow =
                "0 15px 45px rgba(0,0,0,.3)";

        } else {

            navbar.style.background =
                "linear-gradient(180deg, rgba(4,1,2,.9), rgba(4,1,2,.3))";

            navbar.style.boxShadow =
                "none";

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   CARD GLOW FOLLOW
========================================================= */

const cards =
    $$(
        ".highlight-card, .team-card, .prep-card, .assignment-card, .info-card"
    );


cards.forEach(
    card => {

        card.addEventListener(
            "pointermove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width *
                    100;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height *
                    100;


                card.style.background =
                    `
                    radial-gradient(
                        circle at ${x}% ${y}%,
                        rgba(255,208,105,.11),
                        transparent 42%
                    ),
                    linear-gradient(
                        145deg,
                        rgba(33,8,10,.82),
                        rgba(8,2,4,.82)
                    )
                    `;

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.background =
                    "";

            }
        );

    }
);


/* =========================================================
   DYNAMIC HERO GLOW
========================================================= */

const hero =
    $(".hero");


if (hero) {

    hero.addEventListener(
        "pointermove",
        event => {

            if (
                window.innerWidth < 850
            ) {
                return;
            }


            const rect =
                hero.getBoundingClientRect();


            const x =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width *
                100;


            const y =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height *
                100;


            hero.style.setProperty(
                "--mouse-x",
                `${x}%`
            );


            hero.style.setProperty(
                "--mouse-y",
                `${y}%`
            );

        }
    );

}


/* =========================================================
   VISIBILITY PERFORMANCE
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        const animations =
            $$(
                ".particle, .petal"
            );


        animations.forEach(
            element => {

                element.style
                    .animationPlayState =
                    document.hidden
                        ? "paused"
                        : "running";

            }
        );

    }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c🔱 SHAKTI",
    "color:#ffe5a0;font-size:24px;font-weight:800;"
);

console.log(
    "%cPunjab & Bengal — The Pain of Partition",
    "color:#d7a23a;font-size:13px;"
);

console.log(
    "%c22 September 2026 • 10:00 AM • Humanities Lab",
    "color:#9d8a78;font-size:11px;"
);