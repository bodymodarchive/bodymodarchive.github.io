// Archive index: renders the tag filters and the piece list.
// Active filters live in the URL (?tag=implant&tag=surgery) so a filtered
// view can be linked to and survives the back button.

const GENRE_LABEL = {
  poetry: "Poetry",
  fiction: "Fiction",
  essay: "Essay",
  comic: "Comic",
  art: "Visual Art",
};

const filtersEl = document.getElementById("filters");
const piecesEl = document.getElementById("pieces");
const countEl = document.getElementById("count");

const active = new Set(new URLSearchParams(location.search).getAll("tag"));

function tagLabel(slug) {
  const tag = TAGS.find((t) => t.slug === slug);
  return tag ? tag.label : slug;
}

function syncUrl() {
  const params = new URLSearchParams();
  active.forEach((slug) => params.append("tag", slug));
  const query = params.toString();
  history.replaceState(null, "", query ? `?${query}` : location.pathname);
}

function visiblePieces() {
  if (active.size === 0) return PIECES;
  // A piece shows if it carries any active tag.
  return PIECES.filter((p) => p.tags.some((t) => active.has(t)));
}

function renderFilters() {
  filtersEl.innerHTML = "";

  const all = document.createElement("button");
  all.className = "tag-btn";
  all.type = "button";
  all.textContent = "Everything";
  all.setAttribute("aria-pressed", String(active.size === 0));
  all.addEventListener("click", () => {
    active.clear();
    render();
  });
  filtersEl.appendChild(all);

  TAGS.forEach((tag) => {
    const count = PIECES.filter((p) => p.tags.includes(tag.slug)).length;
    if (count === 0) return; // don't advertise an empty shelf

    const btn = document.createElement("button");
    btn.className = "tag-btn";
    btn.type = "button";
    btn.textContent = `${tag.label} · ${count}`;
    btn.title = tag.note;
    btn.setAttribute("aria-pressed", String(active.has(tag.slug)));
    btn.addEventListener("click", () => {
      active.has(tag.slug) ? active.delete(tag.slug) : active.add(tag.slug);
      render();
    });
    filtersEl.appendChild(btn);
  });
}

function renderPieces() {
  const list = visiblePieces();
  piecesEl.innerHTML = "";

  countEl.textContent =
    active.size === 0
      ? `${list.length} pieces`
      : `${list.length} ${list.length === 1 ? "piece" : "pieces"} · ${[...active].map(tagLabel).join(" / ")}`;

  if (list.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "Nothing filed under that combination yet.";
    piecesEl.appendChild(empty);
    return;
  }

  list.forEach((piece) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "piece-row";
    a.href = `piece.html?p=${encodeURIComponent(piece.slug)}`;

    // Left: title and author on one line, opening line beneath.
    // Right: tag over medium.
    const main = document.createElement("span");
    main.className = "piece-main";

    const head = document.createElement("span");
    head.className = "piece-head";

    const title = document.createElement("span");
    title.className = "piece-title";
    title.textContent = piece.title;

    const author = document.createElement("span");
    author.className = "piece-author";
    author.textContent = piece.author;

    head.append(title, author);

    // The piece's actual opening line. Comics and visual art have no body text,
    // so they fall back to the excerpt — otherwise those rows would be blank.
    const opening = document.createElement("span");
    opening.className = "piece-first";
    opening.textContent = piece.body.find((line) => line.trim()) || piece.excerpt;

    main.append(head, opening);

    const meta = document.createElement("span");
    meta.className = "piece-meta";

    const tags = document.createElement("span");
    tags.className = "piece-tags";
    tags.textContent = piece.tags.map(tagLabel).join(" · ");

    const genre = document.createElement("span");
    genre.className = "piece-genre";
    genre.textContent = GENRE_LABEL[piece.genre] || piece.genre;

    meta.append(tags, genre);

    a.append(main, meta);
    li.appendChild(a);
    piecesEl.appendChild(li);
  });
}

function render() {
  renderFilters();
  renderPieces();
  syncUrl();
}

render();
