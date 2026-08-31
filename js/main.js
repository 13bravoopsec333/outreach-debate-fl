/* Outreach Debate Florida — site JS (nav, reveal, marquee) */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveal();
  initMarquee();
  initActiveLink();
});

function initNav() {
  const nav = document.querySelector(".nav");
  const burger = document.querySelector(".burger");

  const onScroll = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (burger) {
    burger.addEventListener("click", () => {
      document.body.classList.toggle("menu-open");
    });
  }

  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () => document.body.classList.remove("menu-open"));
  });
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
  );

  els.forEach((el) => io.observe(el));
}

function initActiveLink() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
}

document.addEventListener("add-reveals", () => {
  initReveal();
});

function initMarquee() {
  const track = document.querySelector(".marquee-track");
  if (!track) return;

  const gap = 26;
  let totalWidth = 0;
  track.querySelectorAll("span").forEach((s) => {
    totalWidth += s.offsetWidth + gap;
  });

  if (totalWidth > 0) {
    track.innerHTML += track.innerHTML;
  }
}