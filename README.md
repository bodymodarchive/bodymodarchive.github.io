# bodymodarchive

A static literary magazine. No build step, no dependencies — open `index.html` or serve the folder.

```bash
python3 -m http.server 4321 --directory ~/bodymodarchive
```

## Structure

| File | What it is |
|---|---|
| `index.html` | Cover — the comic and the way in |
| `packages.html` | Six packages, one per category; hover opens one, click reads it |
| `archive.html` | Every work, filterable by tag — also where a package lands you |
| `piece.html` | Reader — renders whichever piece `?p=<slug>` names |
| `about.html` | Static prose page (lorem ipsum placeholder for now) |
| `submit.html` | Submission guidelines (lorem ipsum placeholder for now) |
| `js/data.js` | **All content lives here.** The only file you edit to publish |
| `js/wobble.js` | The SVG filters behind every hand-drawn box |
| `css/style.css` | Everything visual |
| `assets/` | Comic pages, package drawings, artwork, fonts |

The path through the site is cover → packages → a filtered list → a piece.
Clicking a package is just a link to `archive.html?tag=<slug>`, so the package
grid and the full index stay one list with one filter behind them.

## The packages

`packages.html` builds itself from `TAGS` in `js/data.js` — one package per tag,
in that order, with a live count of works underneath. Add a seventh tag and a
seventh package appears; there is no per-package markup to write.

Both drawings (`assets/package-tied.png`, `assets/package-open.png`) sit in the
page at once and cross-fade on hover. Swapping an `src` instead would leave the
opened drawing unfetched until the first hover and flash blank right when
someone is looking at it. They're composed on a shared canvas with a common
ground line so the swap happens in place instead of jumping.

## Adding a piece

Append an object to `PIECES` in `js/data.js`. Nothing else needs touching — the
archive list, the filters and their counts, and the reader page all build
themselves from it.

```js
{
  slug: "url-safe-name",        // becomes piece.html?p=url-safe-name
  title: "Title",
  author: "Author Name",
  genre: "poetry",              // poetry | fiction | essay | comic | art
  tags: ["implant", "surgery"], // slugs from TAGS, drives the filters
  excerpt: "One line shown in the archive list.",
  image: "assets/your-art.png", // comics and visual art only; omit for text
  body: [
    "One string per paragraph.",
    "",                         // empty string = blank line / stanza break
    "Poetry keeps its line breaks; prose gets paragraph spacing.",
    "Wrap words in *asterisks* for a true italic.",
  ],
}
```

To add a new modification category, add it to `TAGS` in the same file — that
also adds its package. Tags with no pieces are hidden from the archive's filter
bar automatically, though they still get a package showing "0 works".

## Type

Two roles, both set on `:root` in `css/style.css`:

| Role | Face | Used by |
|---|---|---|
| `--serif` — reading text | Wittgenstein (roman + true italic) | the pieces, archive excerpts |
| `--mono` — labels | system monospace stack | wordmark, buttons, tags, bylines, footer |

Wittgenstein is self-hosted from `assets/fonts/` — no external requests, works
offline, nothing to break if a font host goes away. It's SIL Open Font Licence
(kept alongside the files), so bundling it is permitted. Both files are variable
fonts, so every weight is available at no extra download, and the italic is only
fetched when a piece actually uses one.

To swap the reading face, drop the new files in `assets/fonts/`, repoint the two
`@font-face` blocks at the top of `style.css`, and change the `--serif` line.
Watch the reading size when you do: faces differ a lot in x-height, so a font
that looks right at one size can read cramped or oversized at the same number.

## Notes

- **The eight pieces in `data.js` are placeholders** — all titled "Title" by
  "Author Name" with lorem ipsum bodies. They exist only to keep every layout
  (verse, prose, image) and every category populated while you build. Delete
  them as real submissions come in.
- `assets/comic-husk.svg` and `assets/art-reliquary.svg` are placeholder panels;
  replace with real art at any size.
- `assets/landing-comic.png` is cropped to the four panels. The caption and the
  "Enter the archive" box that were drawn beneath them are now real elements
  (`.cover-question` and `.enter`), set in the same mono face as the wordmark.
  `assets/landing-comic-full.png` is the original, uncropped art.
- The comic is black line art on white, composited with `mix-blend-mode` so the
  white drops out against the paper background. Dark mode inverts it. Keep new
  cover art as line art on white and it will behave the same way.
- **The page frame** is a fixed, inset `div` injected by `js/wobble.js`. It
  uses the same weight, radius and turbulence as the cover button so it reads
  as the same pen — but with its own `#frame` filter purely to shrink the
  filter region: the default is 2.2x the element's height, which on a
  viewport-sized box is a lot of surface to rasterise. Hidden below 48rem,
  where an inset border costs more width than it earns. Every page loads
  `wobble.js` so the frame is everywhere.
- **The page frame** is a fixed, inset `div` injected by `js/wobble.js`, drawn
  with the same pen as the cover button. Because it's fixed, content would
  normally scroll underneath and get a line drawn across it — so wherever the
  frame shows, the document is locked and `.page-scroll` becomes the
  scrollport, sized just inside the drawn line. Pieces clip at the border
  instead of crossing it. Below 48rem the frame is hidden and native document
  scrolling comes back, which is what phones want.
- **Sketchy boxes** (the cover button, every row on the archive) are a normal
  CSS border on a `::before`, warped by an SVG turbulence filter from
  `js/wobble.js`. It goes on the pseudo-element so the outline wobbles and the
  type stays crisp. Archive rows cycle three seeds down the list so stacked
  boxes aren't identical; the cover button additionally animates between three
  higher-amplitude seeds on hover.
- Filters are additive (a piece shows if it matches *any* selected tag) and live
  in the URL, so a filtered view can be linked to and the back button works.
