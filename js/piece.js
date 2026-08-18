// Single-piece reader. Reads ?p=<slug> and renders from PIECES.

const GENRE_LABEL = {
  poetry: "Poetry",
  fiction: "Fiction",
  essay: "Essay",
  comic: "Comic",
  art: "Visual Art",
};

const root = document.getElementById("piece");
const slug = new URLSearchParams(location.search).get("p");
const piece = PIECES.find((p) => p.slug === slug);

function tagLabel(s) {
  const tag = TAGS.find((t) => t.slug === s);
  return tag ? tag.label : s;
}

if (!piece) {
  root.innerHTML =
    '<p class="empty">That piece isn\'t in the archive.</p>' +
    '<a class="back" href="archive.html">← Back to the archive</a>';
} else {
  document.title = `${piece.title} · bodymodarchive`;

  const label = document.createElement("span");
  label.className = "label";
  label.textContent = GENRE_LABEL[piece.genre] || piece.genre;

  const h1 = document.createElement("h1");
  h1.textContent = piece.title;

  const byline = document.createElement("div");
  byline.className = "byline";
  byline.textContent = `${piece.author} — filed under ${piece.tags.map(tagLabel).join(", ")}`;

  root.append(label, h1, byline);

  if (piece.image) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = piece.image;
    img.alt = `${piece.title} by ${piece.author}. ${piece.excerpt}`;
    figure.appendChild(img);
    root.appendChild(figure);
  }

  const body = document.createElement("div");
  // Poetry keeps its line breaks; prose gets paragraph spacing.
  body.className = piece.genre === "poetry" ? "body verse" : "body";
  piece.body.forEach((line) => {
    const p = document.createElement("p");
    // *Emphasis* becomes a real italic. Assembled from DOM nodes rather than
    // innerHTML, so an angle bracket in a submission can't inject markup.
    line.split(/\*([^*]+)\*/).forEach((chunk, i) => {
      if (!chunk) return;
      if (i % 2 === 1) {
        const em = document.createElement("em");
        em.textContent = chunk;
        p.appendChild(em);
      } else {
        p.appendChild(document.createTextNode(chunk));
      }
    });
    body.appendChild(p);
  });
  root.appendChild(body);

  const back = document.createElement("a");
  back.className = "back";
  back.href = "archive.html";
  back.textContent = "← Back to the archive";
  root.appendChild(back);
}
