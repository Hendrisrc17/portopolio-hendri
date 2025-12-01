const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navLinks.classList.toggle("open");
    });

    
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("active");
            navLinks.classList.remove("open");
        });
    });
}


const parallaxEls = document.querySelectorAll(".parallax");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.speed) || 0;
        el.style.transform = `translateY(${scrollY * speed}px)`;
    });
});


const tiltCards = document.querySelectorAll(".card-3d");

tiltCards.forEach((card) => {
    const strength = 12; 

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x - rect.width / 2) / rect.width) * strength;
        const rotateX = -((y - rect.height / 2) / rect.height) * strength;

        card.style.transform = `
            perspective(800px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(6px)
        `;
        card.style.boxShadow = "0 26px 60px rgba(0,0,0,0.18)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)";
        card.style.boxShadow = "0 18px 40px rgba(0,0,0,0.08)";
    });
});


if (typeof AOS !== "undefined") {
    AOS.init({
        duration: 800,
        easing: "ease-out-quart",
        once: true,
        offset: 80,
    });
}


const mobileItems = document.querySelectorAll(".mobile-item");

mobileItems.forEach(item => {
    item.addEventListener("click", () => {
        mobileItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    });
});

window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    mobileItems.forEach(item => {
        const section = document.querySelector(item.getAttribute("href"));
        if (section.offsetTop - 80 <= scrollPos &&
            section.offsetTop + section.offsetHeight - 80 > scrollPos) {
            mobileItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        }
    });
});


const flip = document.querySelector(".home-flip");
flip.addEventListener("click", () => flip.classList.toggle("flip-mobile"));


const texts = [
    "Hi, I'm Hendri",
    "AI Engineer",
    "Web Developer",
    "App Developer",
    "Anime Enjoyer"
];

let idx = 0;
let char = 0;
let deleting = false;
const typingElement = document.getElementById("typing-text");

function typeEffect() {
    const current = texts[idx];
    typingElement.textContent = current.substring(0, char);

    if (!deleting && char < current.length) {
        char++;
        setTimeout(typeEffect, 100);
    } else if (deleting && char > 0) {
        char--;
        setTimeout(typeEffect, 50);
    } else {
        deleting = !deleting;
        if (!deleting) idx = (idx + 1) % texts.length;
        setTimeout(typeEffect, 400);
    }
}

typeEffect();

document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll(".skill-bar span");

    const resumeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                bars.forEach(bar => {
                    bar.style.animationPlayState = "running";
                });
            }
        });
    }, { threshold: 0.3 });

    resumeObserver.observe(document.querySelector("#resume"));
});

const slider = document.querySelector('.sertifikat-scroll');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
});

slider.addEventListener('mouseup', () => {
  isDown = false;
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // speed
  slider.scrollLeft = scrollLeft - walk;
});


fetch("/api/handler?action=view")
    .then(res => res.json())
    .then(data => {
        document.getElementById("view-count").innerText = data.views;
        document.getElementById("like-count").innerText = data.likes;
    });

// Like button
document.querySelector(".likes-btn").addEventListener("click", function() {
    fetch("/api/handler?action=like")
        .then(res => res.json())
        .then(data => {
            document.getElementById("like-count").innerText = data.likes;
        });
});
