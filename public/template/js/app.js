/* Koi-dex SPA - client-side router and views.

   Pattern: MV* with unidirectional flow. Each view is a function that
   (1) renders a loading skeleton into #app, (2) asks the api layer for JSON,
   (3) re-renders with the data. The api layer is the single place where the
   client talks to the server. */

/* ---- api layer -------------------------------------------------------- */
/* In the full MERN-style build this is a real network call to Express:
     async function apiGet(path) {
       const res = await fetch(path);
       if (!res.ok) throw new Error(`${res.status} for ${path}`);
       return res.json();
     }
   The template uses the in-memory mock (js/mock-data.js) with a small delay
   so the asynchronous states are visible. */
function apiGet(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path in MOCK) resolve(MOCK[path]);
      else reject(new Error(`404 for ${path}`));
    }, 350);
  });
}

const app = document.getElementById("app");
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const koiBySlug = (slug) => KOI.find(k => k.slug === slug);

/* ---- views ------------------------------------------------------------ */

async function homeView() {
  app.innerHTML = `<div class="hero"><div class="copy">
      <h1>Every koi in the pond,<br>in one encyclopedia.</h1>
      <p class="lede">Real koi varieties: what they look like, where they came from, how to
      care for them, and what their pairings produce. Plus a care guide and the pond
      plants that go with them.</p>
      <a class="btn" href="#/koi">Browse the koi-dex</a>
    </div>
    <figure class="featured card"><div class="skeleton" style="height:280px"></div></figure></div>`;

  /* AJAX component: featured koi. GET /api/koi, pick the classic. */
  try {
    const { koi } = await apiGet("/api/koi");
    const featured = koi.find(k => k.slug === "kohaku") ?? koi[0];
    document.querySelector(".featured").innerHTML =
      `<img src="${featured.img}" alt="${esc(featured.name)}">
       <figcaption>${esc(featured.name)}, the classic</figcaption>`;
  } catch (e) {
    document.querySelector(".featured").innerHTML = `<p class="error">Could not load the featured koi.</p>`;
  }

  app.insertAdjacentHTML("beforeend", `<div class="section-cards">
    <a class="card" href="#/koi"><img src="assets/img/kohaku.png" alt=""><span class="name">Koi-dex</span><span class="blurb">Every variety, drawn and explained.</span></a>
    <a class="card" href="#/breeding"><img src="assets/img/showa.png" alt=""><span class="name">Breeding</span><span class="blurb">Lineage, pairings, and outcomes.</span></a>
    <a class="card" href="#/care"><img src="assets/img/chagoi.png" alt=""><span class="name">Care</span><span class="blurb">Water, feeding, seasons, health.</span></a>
    <a class="card" href="#/plants"><img src="assets/img/water-lily.webp" alt="" style="object-fit:cover;border-radius:10px"><span class="name">Plants</span><span class="blurb">Pond plants and how to keep them.</span></a>
  </div>`);
}

async function dexView() {
  app.innerHTML = `<h1>Koi-dex</h1>
    <p class="lede">Koi varieties, drawn the way the Koi app draws them. Pick one to see its
    pattern, its history, and what it produces in breeding.</p>
    <div class="toolbar" id="dex-toolbar"></div>
    <div class="grid" id="dex-grid"><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div></div>`;

  /* AJAX component: dex grid. GET /api/koi once; the family chips and the
     header search then filter client-side over the loaded list. */
  let list = [];
  try {
    ({ koi: list } = await apiGet("/api/koi"));
  } catch (e) {
    document.getElementById("dex-grid").innerHTML = `<p class="error">Could not load the dex.</p>`;
    return;
  }

  const families = ["all", ...new Set(list.map(k => k.family))];
  let active = "all";
  const toolbar = document.getElementById("dex-toolbar");

  const renderChips = () => {
    toolbar.innerHTML = families.map(f =>
      `<button class="chip ${f === active ? "on" : ""}" data-f="${esc(f)}">${esc(f)}</button>`).join("");
  };
  const renderGrid = () => {
    const rows = list.filter(k => active === "all" || k.family === active);
    document.getElementById("dex-grid").innerHTML = rows.map(k =>
      `<a class="card" href="#/koi/${k.slug}">
         <span class="num">#${String(k.number).padStart(3, "0")}</span>
         <img src="${k.img}" alt="${esc(k.name)}">
         <span class="name">${esc(k.name)}</span></a>`).join("");
  };
  toolbar.addEventListener("click", (e) => {
    const f = e.target.dataset.f;
    if (!f) return;
    active = f;
    renderChips();
    renderGrid();
  });
  renderChips();
  renderGrid();
}

async function koiDetailView(slug) {
  app.innerHTML = `<div class="skeleton" style="height:360px"></div>`;

  /* AJAX component: variety detail. GET /api/koi/:slug returns the variety
     plus the documented pairings it appears in. */
  let k;
  try {
    k = await apiGet(`/api/koi/${slug}`);
  } catch (e) {
    return notFoundView();
  }
  const ordered = [...KOI].sort((a, b) => a.number - b.number);
  const i = ordered.findIndex(x => x.slug === slug);
  const prev = ordered[i - 1], next = ordered[i + 1];

  const cross = (p) => {
    const a = koiBySlug(p.a), b = p.b ? koiBySlug(p.b) : null, c = koiBySlug(p.child);
    return `<div class="cross">
      <img src="${a.img}" alt="${esc(a.name)}"> ×
      ${b ? `<img src="${b.img}" alt="${esc(b.name)}">` : `<span class="chip">line-bred</span>`} →
      <img src="${c.img}" alt="${esc(c.name)}">
      <span>${esc(p.note)}</span></div>`;
  };

  app.innerHTML = `
    <div class="pills">
      ${prev ? `<a class="chip" href="#/koi/${prev.slug}">← ${esc(prev.name)}</a>` : "<span></span>"}
      ${next ? `<a class="chip" href="#/koi/${next.slug}">${esc(next.name)} →</a>` : "<span></span>"}
    </div>
    <div class="detail">
      <figure class="art card"><img src="${k.img}" alt="${esc(k.name)}"></figure>
      <div class="info">
        <h1>${esc(k.name)}</h1>
        <div class="chips">
          <span class="chip">#${String(k.number).padStart(3, "0")}</span>
          <span class="chip on">${esc(k.family)}</span>
        </div>
        <p>${esc(k.blurb)}</p>
      </div>
    </div>
    <div class="two-col">
      <div class="card"><h3>Caring for a ${esc(k.name)}</h3>
        <li>Water quality first: stable, filtered, tested.</li>
        <li>Feed to the water temperature, not the calendar.</li>
        <li>Variety-specific care notes come from the care guide.</li>
        <a class="chip" href="#/care">Full care guide →</a></div>
      <div class="card"><h3>Breeding</h3>
        ${k.parentOf.length || k.producedBy.length
          ? [...k.parentOf, ...k.producedBy].map(cross).join("")
          : `<p class="lede">No documented pairings for this variety.</p>`}
        <a class="chip" href="#/breeding">See the family tree →</a></div>
    </div>`;
}

async function plantsView() {
  app.innerHTML = `<h1>Pond plants</h1>
    <p class="lede">Pond plants by where they grow, whether the koi will leave them alone,
    and their legal status in New Zealand.</p>
    <div class="grid" id="plant-grid"><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div></div>`;

  /* AJAX component: plant grid. GET /api/plants. */
  try {
    const { plants } = await apiGet("/api/plants");
    document.getElementById("plant-grid").innerHTML = plants.map(p =>
      `<a class="card" href="#/plants/${p.slug}">
         <img src="${p.img}" alt="${esc(p.name)}" style="object-fit:cover;border-radius:10px">
         <span class="name">${esc(p.name)}</span>
         <span class="latin">${esc(p.latin)}</span>
         <span class="chips"><span class="chip">${esc(p.type)}</span>
           <span class="chip ${p.koiClass}">${esc(p.koi)}</span>
           <span class="chip ${p.nzClass}">${esc(p.nz)}</span></span></a>`).join("");
  } catch (e) {
    document.getElementById("plant-grid").innerHTML = `<p class="error">Could not load plants.</p>`;
  }
}

async function plantDetailView(slug) {
  app.innerHTML = `<div class="skeleton" style="height:300px"></div>`;
  /* AJAX component: plant detail. GET /api/plants/:slug. */
  let p;
  try {
    p = await apiGet(`/api/plants/${slug}`);
  } catch (e) {
    return notFoundView();
  }
  app.innerHTML = `
    <div class="detail">
      <figure class="art card"><img src="${p.img}" alt="${esc(p.name)}" style="object-fit:cover;border-radius:10px"></figure>
      <div class="info">
        <h1>${esc(p.name)}</h1>
        <p class="latin" style="font-style:italic">${esc(p.latin)}</p>
        <div class="chips"><span class="chip">${esc(p.type)}</span>
          <span class="chip ${p.koiClass}">${esc(p.koi)}</span>
          <span class="chip ${p.nzClass}">${esc(p.nz)}</span></div>
        <p>Planting notes, light needs, and koi-proofing advice for ${esc(p.name)}.</p>
        <a class="chip" href="#/plants">← All plants</a>
      </div>
    </div>`;
}

async function breedingView() {
  app.innerHTML = `<h1>Breeding guide</h1>
    <p class="lede">Every koi variety came from somewhere. Here are the documented pairings
    and what a spawn really produces.</p>
    <div id="pairings"><div class="skeleton"></div></div>`;

  /* AJAX component: documented pairings. GET /api/breeding. */
  try {
    const { pairings } = await apiGet("/api/breeding");
    document.getElementById("pairings").innerHTML =
      `<div class="card wide" style="padding:1.2rem"><h3>Documented pairings</h3>` +
      pairings.map(p => {
        const a = koiBySlug(p.a), b = p.b ? koiBySlug(p.b) : null, c = koiBySlug(p.child);
        return `<div class="cross">
          <img src="${a.img}" alt="${esc(a.name)}"> ×
          ${b ? `<img src="${b.img}" alt="${esc(b.name)}">` : `<span class="chip">line-bred</span>`} →
          <img src="${c.img}" alt="${esc(c.name)}"><span>${esc(p.note)}</span></div>`;
      }).join("") + `</div>`;
  } catch (e) {
    document.getElementById("pairings").innerHTML = `<p class="error">Could not load pairings.</p>`;
  }
}

function careView() {
  /* Static informational view: bundled content, no fetch. */
  app.innerHTML = `<div class="prose">
    <h1>Care guide</h1>
    <p class="lede">Practical koi husbandry, checked against two sources.</p>
    <h2>Water quality comes first</h2>
    <p>Most koi disease is a water problem before it is a pathogen problem. Ammonia and
    nitrite should read zero at all times; a cycled biological filter is what holds them there.</p>
    <h2>Feeding by water temperature</h2>
    <p>Koi are comfortable between about 15 and 25 °C. Feed to the temperature, not the
    calendar: wheatgerm sparingly below 15 °C, growth food in the low twenties, and stop
    feeding entirely below 10 °C.</p>
    <h2>Keeping koi in New Zealand</h2>
    <p>Koi carp are classified as a pest fish in New Zealand, which shapes what a local
    keeper may buy, keep, and move. Check the current rules before starting a pond.</p>
  </div>`;
}

function notFoundView() {
  /* Router fallback: unknown route, no fetch. */
  app.innerHTML = `<div class="prose">
    <h1>Not found</h1>
    <p class="lede">That page does not exist. The pond, however, does.</p>
    <a class="btn" href="#/">Back to home</a>
  </div>`;
}

/* ---- router ----------------------------------------------------------- */
/* Resolves the URL hash to a view. Clicking a nav link changes the hash;
   the browser fires hashchange; the matching view renders into #app and
   fetches its own data. No full page loads. */
const routes = [
  { re: /^$|^\/$/, view: homeView, nav: null },
  { re: /^\/koi$/, view: dexView, nav: "koi" },
  { re: /^\/koi\/([\w-]+)$/, view: koiDetailView, nav: "koi" },
  { re: /^\/plants$/, view: plantsView, nav: "plants" },
  { re: /^\/plants\/([\w-]+)$/, view: plantDetailView, nav: "plants" },
  { re: /^\/breeding$/, view: breedingView, nav: "breeding" },
  { re: /^\/care$/, view: careView, nav: "care" },
];

function router() {
  const path = location.hash.replace(/^#/, "");
  const route = routes.find(r => r.re.test(path));
  document.querySelectorAll("#main-nav a").forEach(a =>
    a.classList.toggle("active", !!route && a.dataset.nav === route.nav));
  hideSearch();
  if (route) route.view(path.match(route.re)[1]);
  else notFoundView();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);

/* ---- global search ---------------------------------------------------- */
/* AJAX component: debounced search-as-you-type. In the full build each
   keystroke (debounced) calls GET /api/search?q=...; here the mock filters
   the loaded koi and plant names the same way. */
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
let searchTimer = null;

function hideSearch() {
  searchResults.hidden = true;
  searchInput.value = "";
}

searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(async () => {
    const q = searchInput.value.trim().toLowerCase();
    if (q.length < 2) { searchResults.hidden = true; return; }
    /* real build: const { hits } = await apiGet(`/api/search?q=${encodeURIComponent(q)}`); */
    const hits = [
      ...KOI.filter(k => k.name.toLowerCase().includes(q)).map(k =>
        ({ href: `#/koi/${k.slug}`, img: k.img, label: k.name, sub: "koi" })),
      ...PLANTS.filter(p => p.name.toLowerCase().includes(q)).map(p =>
        ({ href: `#/plants/${p.slug}`, img: p.img, label: p.name, sub: "plant" })),
    ].slice(0, 8);
    searchResults.innerHTML = hits.length
      ? hits.map(h => `<a href="${h.href}"><img src="${h.img}" alt="">${esc(h.label)}
          <span class="chip" style="margin-left:auto">${h.sub}</span></a>`).join("")
      : `<div class="empty">No matches for "${esc(q)}".</div>`;
    searchResults.hidden = false;
  }, 250);
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search")) searchResults.hidden = true;
});
