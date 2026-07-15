function buildPostCell(url) {
  const cell = document.createElement("div");
  cell.className = "post-cell";

  if (url && url.includes("instagram.com")) {
    const blockquote = document.createElement("blockquote");
    blockquote.className = "instagram-media";
    blockquote.setAttribute("data-instgrm-captioned", "");
    blockquote.setAttribute("data-instgrm-permalink", url);
    const link = document.createElement("a");
    link.href = url;
    blockquote.appendChild(link);
    cell.appendChild(blockquote);
  } else if (url) {
    const img = document.createElement("img");
    img.className = "local-photo";
    img.src = url;
    img.loading = "lazy";
    img.alt = "Challenge photo";
    cell.appendChild(img);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "placeholder";
    placeholder.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
      '<path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />' +
      '<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />' +
      "</svg>" +
      "<span>Awaiting photo</span>";
    cell.appendChild(placeholder);
  }

  return cell;
}

function buildPromptCard(prompt) {
  const card = document.createElement("article");
  card.className = "tile";

  const meta = document.createElement("header");
  meta.className = "tile-meta";

  const number = document.createElement("span");
  number.className = "tile-number";
  number.textContent = String(prompt.id).padStart(2, "0");
  meta.appendChild(number);

  const text = document.createElement("div");
  const heading = document.createElement("h2");
  heading.textContent = prompt.title;
  text.appendChild(heading);

  const description = document.createElement("p");
  description.className = "description";
  description.textContent = prompt.description;
  text.appendChild(description);

  meta.appendChild(text);
  card.appendChild(meta);

  const posts = document.createElement("div");
  posts.className = "posts";
  if (prompt.posts.length) {
    prompt.posts.forEach((url) => posts.appendChild(buildPostCell(url)));
  } else {
    posts.appendChild(buildPostCell(null));
  }
  card.appendChild(posts);

  return card;
}

function updateProgress() {
  const started = PROMPTS.filter((p) => p.posts.length > 0).length;
  const el = document.getElementById("progress");
  el.textContent = `${started} / ${PROMPTS.length} prompts started`;
}

function observeEntrances() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".tile").forEach((tile) => {
    tile.classList.add("will-enter");
    observer.observe(tile);
  });
}

function processInstagramEmbeds(attemptsLeft = 25) {
  if (window.instgrm) {
    window.instgrm.Embeds.process();
  } else if (attemptsLeft > 0) {
    setTimeout(() => processInstagramEmbeds(attemptsLeft - 1), 200);
  }
}

function render() {
  const grid = document.getElementById("challenge-grid");
  PROMPTS.forEach((prompt) => grid.appendChild(buildPromptCard(prompt)));
  updateProgress();
  observeEntrances();
  processInstagramEmbeds();
}

render();
