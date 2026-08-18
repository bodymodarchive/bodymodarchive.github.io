// Shared SVG filter definitions for the hand-drawn boxes.
//
// feTurbulence generates noise; feDisplacementMap pushes a border's pixels
// around by it, so a straight rule comes out shaky like a drawn line. Raise
// "scale" for a wobblier edge, "baseFrequency" for a tighter, jitterier one.
//
// Injected rather than pasted into each page so there's one definition to
// edit. Any page that wants a sketchy box loads this script. If it doesn't
// run, the boxes keep their lopsided border-radius and still read as
// hand-drawn rather than broken.
//
//   wobble / wobble-b / wobble-c  resting edges, three seeds so boxes stacked
//                                 down a page don't look rubber-stamped
//   boil1 / boil2 / boil3         the hover cycle: same idea, ~double the
//                                 wander, so hovering visibly scribbles up
//   frame                         the page border — identical turbulence to
//                                 #wobble so the line matches the button, but
//                                 a tight filter region: the default one is
//                                 2.2x the element's height, which on a
//                                 viewport-sized box is a huge surface to
//                                 rasterise on every scroll.
//
// Seeds must stay distinct or the boil cycle stops reading as motion.

// [id, seed, baseFrequency, scale, region?]
const DEFAULT_REGION = ["-25%", "-60%", "150%", "220%"];

const WOBBLE_FILTERS = [
  ["wobble", 7, 0.045, 2.6],
  ["wobble-b", 23, 0.045, 2.6],
  ["wobble-c", 41, 0.045, 2.6],
  ["boil1", 7, 0.05, 5.5],
  ["boil2", 23, 0.05, 5.5],
  ["boil3", 41, 0.05, 5.5],
  ["frame", 7, 0.045, 2.6, ["-1%", "-1%", "102%", "102%"]],
];

const NS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(NS, "svg");
svg.setAttribute("class", "svg-defs");
svg.setAttribute("aria-hidden", "true");
svg.setAttribute("focusable", "false");

WOBBLE_FILTERS.forEach(([id, seed, freq, scale, region]) => {
  const filter = document.createElementNS(NS, "filter");
  filter.setAttribute("id", id);
  // Generous region by default so the displaced edge isn't clipped at the
  // box bounds; large elements pass a tighter one.
  const [x, y, w, h] = region || DEFAULT_REGION;
  filter.setAttribute("x", x);
  filter.setAttribute("y", y);
  filter.setAttribute("width", w);
  filter.setAttribute("height", h);

  const turb = document.createElementNS(NS, "feTurbulence");
  turb.setAttribute("type", "fractalNoise");
  turb.setAttribute("baseFrequency", String(freq));
  turb.setAttribute("numOctaves", "2");
  turb.setAttribute("seed", String(seed));
  turb.setAttribute("result", "noise");

  const disp = document.createElementNS(NS, "feDisplacementMap");
  disp.setAttribute("in", "SourceGraphic");
  disp.setAttribute("in2", "noise");
  disp.setAttribute("scale", String(scale));
  disp.setAttribute("xChannelSelector", "R");
  disp.setAttribute("yChannelSelector", "G");

  filter.append(turb, disp);
  svg.appendChild(filter);
});

document.body.appendChild(svg);

// The drawn border around the whole page. Injected here rather than pasted
// into every file so there's one place to change it, and so it can never
// appear on a page whose filter definitions failed to load. CSS hides it on
// narrow screens, where an inset frame just eats width.
const frame = document.createElement("div");
frame.className = "page-frame";
frame.setAttribute("aria-hidden", "true");
document.body.appendChild(frame);
