// Content index for bodymodarchive.
// Add a piece by appending an object to PIECES. Nothing else needs editing.
//
// genre:   "poetry" | "fiction" | "essay" | "comic" | "art"
// tags:    array of slugs from TAGS below — these drive the categories
// excerpt: shown in the list for comics and art, which have no body text
// body:    array of paragraphs (prose) or lines (poetry). "" = blank line.
//          Wrap words in *asterisks* for a true italic.
// image:   optional path, used for comics and visual art

// The six packages on packages.html are generated from this list, in this
// order. Add a seventh and a seventh package appears — no markup to touch.
const TAGS = [
  { slug: "nexplanon",       label: "Nexplanon",       note: "the arm implant" },
  { slug: "iud",             label: "IUD",             note: "intrauterine device" },
  { slug: "surgery",         label: "Surgery",         note: "elective, corrective, emergency" },
  { slug: "placeholder1",    label: "Placeholder 1",   note: "to be named" },
  { slug: "placeholder2",    label: "Placeholder 2",   note: "to be named" },
  { slug: "medical-anomaly", label: "Medical Anomaly", note: "the unexplained" },
];

// Placeholder entries. Every tag has at least one and every genre appears, so
// the layouts (verse, prose, image) all stay exercised. Replace as real work
// arrives — nothing here is meant to be read.
const PIECES = [
  {
    slug: "piece-1",
    title: "Title",
    author: "Author Name",
    genre: "poetry",
    tags: ["nexplanon"],
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body: [
      "Lorem ipsum dolor sit amet,",
      "consectetur adipiscing elit,",
      "sed do eiusmod tempor.",
      "",
      "Ut enim ad minim veniam,",
      "quis nostrud exercitation",
      "ullamco laboris nisi.",
      "",
      "Duis aute irure dolor",
      "in reprehenderit,",
      "velit esse cillum.",
    ],
  },
  {
    slug: "piece-2",
    title: "Title",
    author: "Author Name",
    genre: "fiction",
    tags: ["iud"],
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    ],
  },
  {
    slug: "piece-3",
    title: "Title",
    author: "Author Name",
    genre: "essay",
    tags: ["surgery"],
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est *laborum*.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    ],
  },
  {
    slug: "piece-4",
    title: "Title",
    author: "Author Name",
    genre: "comic",
    tags: ["surgery"],
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "assets/comic-husk.svg",
    body: [],
  },
  {
    slug: "piece-5",
    title: "Title",
    author: "Author Name",
    genre: "poetry",
    tags: ["placeholder1"],
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body: [
      "Lorem ipsum dolor sit amet,",
      "consectetur adipiscing elit.",
      "",
      "Sed do eiusmod tempor",
      "incididunt ut labore,",
      "et dolore magna aliqua.",
    ],
  },
  {
    slug: "piece-6",
    title: "Title",
    author: "Author Name",
    genre: "fiction",
    tags: ["placeholder2"],
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    ],
  },
  {
    slug: "piece-7",
    title: "Title",
    author: "Author Name",
    genre: "essay",
    tags: ["medical-anomaly"],
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
    ],
  },
  {
    slug: "piece-8",
    title: "Title",
    author: "Author Name",
    genre: "art",
    tags: ["surgery"],
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "assets/art-reliquary.svg",
    body: [],
  },
];
