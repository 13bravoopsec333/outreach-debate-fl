/* Outreach Debate Florida — nav, mobile menu, scroll reveal. Vanilla JS, minimal. */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveal();
});

document.addEventListener("add-reveals", initReveal);

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
  const els = document.querySelectorAll(".reveal:not(.in)");
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
    { threshold: 0.15 }
  );

  els.forEach((el) => io.observe(el));
}