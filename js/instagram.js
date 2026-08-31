/* Outreach Debate Florida — Instagram feed renderer.
   Reads data/posts.json and renders the [data-ig-grid]. */

document.addEventListener("DOMContentLoaded", initInstagram);

async function initInstagram() {
  const grid = document.querySelector("[data-ig-grid]");
  if (!grid) return;

  let posts;
  try {
    const res = await fetch("data/posts.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    posts = (await res.json()).posts;
  } catch {
    posts = [];
  }

  if (!posts || !posts.length) {
    grid.innerHTML = `<p class="ig-empty">The field notes are being compiled — follow us directly on Instagram.</p>`;
    return;
  }

  const frag = document.createDocumentFragment();

  posts.forEach((post) => {
    const src = post.local || post.image_url;
    const alt = truncate(post.caption || "", 110);

    const card = document.createElement("a");
    card.className = "ig-card reveal";
    card.href = post.permalink || "https://www.instagram.com/outreachdebate.fl/";
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.width = 720;
    img.height = 900;
    img.loading = "lazy";
    img.decoding = "async";

    const cap = document.createElement("span");
    cap.className = "ig-cap";
    cap.textContent = truncate(post.caption || "", 140);

    const meta = document.createElement("span");
    meta.className = "ig-meta";
    meta.textContent = `${formatDate(post.timestamp)} · @outreachdebate.fl`;

    card.append(img, cap, meta);
    frag.appendChild(card);
  });

  grid.innerHTML = "";
  grid.appendChild(frag);
  document.dispatchEvent(new CustomEvent("add-reveals"));
}

function truncate(text, max) {
  return text.length <= max ? text : `${text.slice(0, max).trimEnd()}…`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}