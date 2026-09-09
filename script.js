// ================================
// NELSHI SITE - PERSONAL WEBSITE
// ================================

const heroCat = document.getElementById("heroCat");
const navMenu = document.getElementById("nav-menu");
const menuToggle = document.querySelector(".menu-toggle");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// -------------------------------
// Mobile navigation
// -------------------------------
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// -------------------------------
// Dark mode
// -------------------------------
function setTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
  themeToggle.setAttribute(
    "title",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
  localStorage.setItem("nelshi-theme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("nelshi-theme");
setTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
  setTheme(!document.body.classList.contains("dark-mode"));
});

// -------------------------------
// Animated cat click
// -------------------------------
const catCaptions = [
  "click me ♡",
  "meow! 🐾",
  "hehe ♡",
  "nyaa~ 🎀",
  "you found me!"
];

let captionIndex = 0;

function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "heart-pop";
  heart.textContent = Math.random() > 0.5 ? "♡" : "♥";
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}

heroCat.addEventListener("click", event => {
  heroCat.classList.remove("clicked");
  void heroCat.offsetWidth;
  heroCat.classList.add("clicked");

  createHeart(event.clientX, event.clientY);
  createHeart(event.clientX + 25, event.clientY - 5);

  captionIndex = (captionIndex + 1) % catCaptions.length;
  document.querySelector(".cat-caption").textContent = catCaptions[captionIndex];

  setTimeout(() => heroCat.classList.remove("clicked"), 700);
});

// -------------------------------
// Paw-print cursor trail
// -------------------------------
let lastPaw = 0;

document.addEventListener("mousemove", event => {
  if ("ontouchstart" in window) return;

  const now = Date.now();
  if (now - lastPaw < 220) return;
  lastPaw = now;
  if (Math.random() > 0.6) return;

  const paw = document.createElement("div");
  paw.className = "paw-print";
  paw.textContent = "🐾";
  paw.style.left = `${event.clientX}px`;
  paw.style.top = `${event.clientY}px`;

  document.body.appendChild(paw);
  setTimeout(() => paw.remove(), 1200);
});

// -------------------------------
// Gentle reveal animation
// -------------------------------
const revealElements = document.querySelectorAll(
  ".about-card, .fact-card, .favorite-category, .hobby-card, .video-card, .kpop-card, .memory-photo, .contact-link"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach(element => {
  element.style.opacity = "0";
  element.style.transform = "translateY(18px)";
  element.style.transition = "opacity .6s ease, transform .6s ease";
  observer.observe(element);
});

// -------------------------------
// Hide missing boyfriend photos
// -------------------------------
document.querySelectorAll(".memory-photo img").forEach(image => {
  image.addEventListener("error", () => {
    image.closest(".memory-photo").style.display = "none";
  });
});

// -------------------------------
// KPOP uploaded-image fallback
// -------------------------------
// Supports the common JPG/JPEG/PNG spellings and an optional kpop/ folder.
document.querySelectorAll(".kpop-image").forEach(image => {
  const baseName = image.dataset.imageName;
  const candidates = [
    `${baseName}.jpg`,
    `${baseName}.jpeg`,
    `${baseName}.JPG`,
    `${baseName}.JPEG`,
    `${baseName}.png`,
    `${baseName}.PNG`,
    `kpop/${baseName}.jpg`,
    `kpop/${baseName}.jpeg`,
    `kpop/${baseName}.png`
  ];

  let index = 0;
  image.addEventListener("error", () => {
    if (index < candidates.length - 1) {
      index += 1;
      image.src = candidates[index];
    } else {
      image.closest(".kpop-card").classList.add("image-missing");
      image.alt = `${baseName} photo not found`;
    }
  });
});


// -------------------------------
// Full-video viewer
// -------------------------------
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const videoModalTitle = document.getElementById("videoModalTitle");
const videoModalClose = document.getElementById("videoModalClose");

function openVideoModal(videoSrc, title) {
  videoModalTitle.textContent = title || "Video";
  modalVideo.pause();
  modalVideo.src = videoSrc;
  modalVideo.load();
  videoModal.classList.add("is-open");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");

  const playWhenReady = () => {
    modalVideo.play().catch(() => {});
    modalVideo.removeEventListener("loadeddata", playWhenReady);
  };
  modalVideo.addEventListener("loadeddata", playWhenReady);
}

function closeVideoModal() {
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

document.querySelectorAll(".video-view-btn").forEach(button => {
  button.addEventListener("click", () => {
    openVideoModal(button.dataset.video, button.dataset.title);
  });
});

videoModalClose.addEventListener("click", closeVideoModal);
document.querySelector("[data-close-video]").addEventListener("click", closeVideoModal);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && videoModal.classList.contains("is-open")) {
    closeVideoModal();
  }
});

// -------------------------------
// Current year
// -------------------------------
document.getElementById("year").textContent = new Date().getFullYear();

// -------------------------------
// Touch-device class
// -------------------------------
if ("ontouchstart" in window) {
  document.body.classList.add("touch-device");
}
