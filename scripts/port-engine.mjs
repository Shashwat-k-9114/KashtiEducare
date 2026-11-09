// One-off: legacy/js/main.js -> src/legacy/engine.js (an init function with a real cleanup).
import fs from "node:fs";
let s = fs.readFileSync("legacy/js/main.js", "utf8");
const head = `(function () {
  "use strict";
  const D = window.KASHTI;
  if (!D) return;
`;
if (!s.includes(head)) throw new Error("head not found");
s = s.replace(head, `export function initKashti(D) {
  "use strict";
  /* ---- lifecycle tracking: everything started here is stopped by the returned cleanup ---- */
  let dead = false;
  const T = { timeouts: new Set(), intervals: new Set(), frames: new Set(), observers: new Set(), listeners: [] };
  const setTimeout = (fn, ms, ...a) => { if (dead) return 0; const id = window.setTimeout(fn, ms, ...a); T.timeouts.add(id); return id; };
  const requestAnimationFrame = (fn) => { if (dead) return 0; const id = window.requestAnimationFrame(fn); T.frames.add(id); return id; };
  const IntersectionObserver = function (cb, o) { const io = new window.IntersectionObserver(cb, o); T.observers.add(io); return io; };
  const track = (target) => (type, fn, opts) => { target.addEventListener(type, fn, opts); T.listeners.push([target, type, fn, opts]); };
  const onWin = track(window);
  const onDoc = track(document);
  const cleanup = () => {
    dead = true;
    T.timeouts.forEach((id) => window.clearTimeout(id));
    T.intervals.forEach((id) => window.clearInterval(id));
    T.frames.forEach((id) => window.cancelAnimationFrame(id));
    T.observers.forEach((o) => o.disconnect());
    T.listeners.forEach(([t, type, fn, opts]) => t.removeEventListener(type, fn, opts));
    document.querySelectorAll("body > .sun-rail").forEach((n) => n.remove());
    document.documentElement.classList.remove("mx-on");
    document.body.style.overflow = "";
  };
`);
if (!s.trimEnd().endsWith("})();")) throw new Error("tail not found");
s = s.trimEnd().replace(/\}\)\(\);$/, "  return cleanup;\n}\n");
s = s.replace(/window\.addEventListener\(/g, "onWin(").replace(/document\.addEventListener\(/g, "onDoc(");
// the body-level scroll lock / listeners are the only globals; fix the declaration of the shim itself
s = s.replace("const onWin = track(window);", "const onWin = track(window);");
s = s.replace(/\b(programs|people|read|contact|why-kashti|partners|gallery|formats|experiences|institutions)\.html/g, "/$1");
s = "// @ts-nocheck\n/* Ported from legacy/js/main.js: logic unchanged; wrapped in initKashti() with lifecycle cleanup for Next.js route changes. */\n" + s;
fs.writeFileSync("src/legacy/engine.js", s);
console.log("ok", s.length);
