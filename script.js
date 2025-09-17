// ====== Hamburger Menu Toggle ======
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close nav when link clicked (mobile UX)
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// ====== Typing Effect (Hero Section) ======
const typedText = document.getElementById("typed");
const words = ["AI Engineer", "Web Developer", "Tech Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    typedText.textContent = currentWord.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 500);
      return;
    }
  } else {
    typedText.textContent = currentWord.substring(0, charIndex++);
    if (charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  }
  setTimeout(typeEffect, isDeleting ? 80 : 120);
}
typeEffect();

// ====== GSAP Animations ======
window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Hero Section
  gsap.from(".hero-left h1, .hero-tagline, .hero-cta", {
    opacity: 0,
    y: 40,
    duration: 1,
    stagger: 0.3
  });

  gsap.from(".hero-image", {
    opacity: 0,
    x: 60,
    duration: 1.2,
    delay: 0.5
  });

  // About Section
  gsap.from(".about-text, .about-image", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 80%"
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3
  });

  // Skills Section (cards stagger)
  gsap.from(".skill-card", {
    scrollTrigger: {
      trigger: ".skills-grid",
      start: "top 80%"
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  });

  // Projects Section (cards stagger)
  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: ".projects-grid",
      start: "top 80%"
    },
    opacity: 0,
    y: 60,
    duration: 1,
    stagger: 0.25,
    ease: "power2.out"
  });

  // Contact Section
  gsap.from(".contact-form", {
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 80%"
    },
    opacity: 0,
    y: 50,
    duration: 1
  });

  gsap.from(".contact-links a", {
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 80%"
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.2,
    delay: 0.3
  });

  // Footer
  gsap.from(".footer", {
    scrollTrigger: {
      trigger: ".footer",
      start: "top 90%"
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power2.out"
  });

  gsap.from(".footer-right a", {
    scrollTrigger: {
      trigger: ".footer",
      start: "top 90%"
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.2,
    delay: 0.3
  });
});
