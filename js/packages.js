// Builds the package grid from TAGS. One package per tag, same order.
//
// Both the tied and the opened drawing are placed in the DOM up front and
// cross-faded with opacity — swapping an img src or a background-image would
// leave the opened one unfetched until the first hover, which shows as a blank
// flash exactly when the reader is looking at it.

const packagesEl = document.getElementById("packages");

TAGS.forEach((tag) => {
  const count = PIECES.filter((p) => p.tags.includes(tag.slug)).length;

  const li = document.createElement("li");

  const a = document.createElement("a");
  a.className = "package";
  a.href = `archive.html?tag=${encodeURIComponent(tag.slug)}`;
  // No title attribute: it wins over the link's own text in the accessibility
  // tree, so the link would announce as "the arm implant" instead of
  // "Nexplanon, 1 work" — the label and count below are the name we want.

  const art = document.createElement("span");
  art.className = "package-art";

  const tied = document.createElement("img");
  tied.className = "art art-tied";
  tied.src = "assets/package-tied.png";
  tied.alt = ""; // decorative: the label below is the accessible name
  tied.setAttribute("aria-hidden", "true");

  const open = document.createElement("img");
  open.className = "art art-open";
  open.src = "assets/package-open.png";
  open.alt = "";
  open.setAttribute("aria-hidden", "true");

  art.append(tied, open);

  const label = document.createElement("span");
  label.className = "package-label";
  label.textContent = tag.label;

  const meta = document.createElement("span");
  meta.className = "package-count";
  meta.textContent = count === 1 ? "1 work" : `${count} works`;

  a.append(art, label, meta);
  li.appendChild(a);
  packagesEl.appendChild(li);
});
