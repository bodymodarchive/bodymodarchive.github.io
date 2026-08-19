// Single-piece reader. Reads ?p=<slug> and renders from PIECES.
//
// The genre isn't shown here — it's on the list, and above a title it just
// restated what the piece obviously is. archive.js keeps its own labels.

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

  const h1 = document.createElement("h1");
  h1.textContent = piece.title;

  const byline = document.createElement("div");
  byline.className = "byline";
  byline.textContent = piece.author;

  root.append(h1, byline);

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

  // Tags at the foot of the piece, drawn like the filter chips on the list.
  // Each links to the list filtered by that tag, so a reader can follow a
  // thread sideways instead of only backwards.
  if (piece.tags.length) {
    const tagRow = document.createElement("div");
    tagRow.className = "piece-tag-row";

    piece.tags.forEach((slug) => {
      const tag = document.createElement("a");
      tag.className = "tag-btn";
      tag.href = `archive.html?tag=${encodeURIComponent(slug)}`;
      tag.textContent = tagLabel(slug);
      tagRow.appendChild(tag);
    });

    root.appendChild(tagRow);
  }

  const back = document.createElement("a");
  back.className = "back";
  back.href = "archive.html";
  back.textContent = "← Back to the archive";
  root.appendChild(back);
}
