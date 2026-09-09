/* =========================================
   NELSHI ♡ MY LITTLE CORNER
   UPDATED SCRIPT.JS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  /* DARK MODE */
  const savedTheme = localStorage.getItem("nelshi-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    if (themeIcon) themeIcon.textContent = "☀️";
    if (themeToggle) themeToggle.setAttribute("aria-label", "Switch to light mode");
  }

  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("nelshi-theme", isDark ? "dark" : "light");

    if (themeIcon) themeIcon.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  });

  /* MOBILE MENU */
  menuToggle?.addEventListener("click", () => {
    const isOpen = navMenu?.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(!!isOpen));

    if (navMenu) {
      navMenu.style.display = isOpen ? "flex" : "";
      if (isOpen) {
        navMenu.style.position = "absolute";
        navMenu.style.top = "68px";
        navMenu.style.left = "0";
        navMenu.style.right = "0";
        navMenu.style.padding = "20px";
        navMenu.style.flexDirection = "column";
        navMenu.style.background = getComputedStyle(body).backgroundColor;
      }
    }
  });

  navMenu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navMenu.style.display = "";
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  /* REVEAL ANIMATION */
  const revealItems = document.querySelectorAll(
    ".about-card, .fact-card, .favorite-category, .hobby-card, .kpop-card, .memory-photo, .video-card, .contact-box"
  );

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(18px)";
    item.style.transition = `opacity .5s ease ${index * 0.04}s, transform .5s ease ${index * 0.04}s`;
    revealObserver.observe(item);
  });

  /* VIDEO MODAL */
  const videoModal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const modalTitle = document.getElementById("videoModalTitle");
  const modalClose = document.getElementById("videoModalClose");

  function openVideoModal(src, title) {
    if (!videoModal || !modalVideo) return;

    if (modalTitle) modalTitle.textContent = title || "Video";
    modalVideo.src = src;
    videoModal.classList.add("show");
    videoModal.setAttribute("aria-hidden", "false");

    modalVideo.play().catch(() => {});
    document.body.style.overflow = "hidden";
  }

  function closeVideoModal() {
    if (!videoModal || !modalVideo) return;

    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();

    videoModal.classList.remove("show");
    videoModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".video-view-btn").forEach(button => {
    button.addEventListener("click", () => {
      openVideoModal(
        button.dataset.video,
        button.dataset.title
      );
    });
  });

  modalClose?.addEventListener("click", closeVideoModal);

  document.querySelectorAll("[data-close-video]").forEach(element => {
    element.addEventListener("click", closeVideoModal);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && videoModal?.classList.contains("show")) {
      closeVideoModal();
    }
  });

  /* HERO CAT */
  const heroCat = document.getElementById("heroCat");

  heroCat?.addEventListener("click", () => {
    heroCat.animate(
      [
        { transform: "rotate(0deg) scale(1)" },
        { transform: "rotate(-5deg) scale(1.04)" },
        { transform: "rotate(5deg) scale(1.04)" },
        { transform: "rotate(0deg) scale(1)" }
      ],
      {
        duration: 500,
        easing: "ease-in-out"
      }
    );
  });

  /* MISSING BOYFRIEND PHOTOS */
  document.querySelectorAll(".memory-photo img").forEach(img => {
    img.addEventListener("error", () => {
      const figure = img.closest(".memory-photo");
      if (figure) figure.style.display = "none";
    });
  });
});
