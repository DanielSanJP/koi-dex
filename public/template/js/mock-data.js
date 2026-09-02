/* In-memory stand-in for the Express + Neon Postgres API, so the template
   runs from disk. Shapes match the real API design in the design document:
   each key is an API path, each value is the JSON that path returns. */

const KOI = [
  { slug: "chagoi",        name: "Chagoi",        number: 1,  family: "Kawarimono", img: "assets/img/chagoi.png",        blurb: "Plain tea-brown koi, famously the friendliest fish in the pond." },
  { slug: "bekko",         name: "Bekko",         number: 2,  family: "Bekko",      img: "assets/img/bekko.png",         blurb: "White koi with small black tortoiseshell markings along the back." },
  { slug: "benigoi",       name: "Benigoi",       number: 3,  family: "Kawarimono", img: "assets/img/benigoi.png",       blurb: "Solid crimson koi, red from nose to tail." },
  { slug: "karasugoi",     name: "Karasugoi",     number: 4,  family: "Kawarimono", img: "assets/img/karasugoi.png",     blurb: "The crow koi: black all over." },
  { slug: "hi-utsuri",     name: "Hi Utsuri",     number: 5,  family: "Utsurimono", img: "assets/img/hi_utsuri.png",     blurb: "Black koi with wrapping red pattern." },
  { slug: "ki-utsuri",     name: "Ki Utsuri",     number: 6,  family: "Utsurimono", img: "assets/img/ki_utsuri.png",     blurb: "Black koi with wrapping yellow pattern." },
  { slug: "hariwake",      name: "Hariwake",      number: 7,  family: "Hikarimoyo", img: "assets/img/hariwake.png",      blurb: "Metallic platinum ground with yellow or orange patterning." },
  { slug: "shiro-utsuri",  name: "Shiro Utsuri",  number: 8,  family: "Utsurimono", img: "assets/img/shiro_utsuri.png",  blurb: "Black koi with wrapping white pattern." },
  { slug: "beni-kumonryu", name: "Beni Kumonryu", number: 11, family: "Kawarimono", img: "assets/img/beni_kumonryu.png", blurb: "Kumonryu with red added to the shifting black-and-white pattern." },
  { slug: "koromo",        name: "Koromo",        number: 15, family: "Koromo",     img: "assets/img/koromo.png",        blurb: "Kohaku pattern overlaid with dark netting from Asagi ancestry." },
  { slug: "tancho",        name: "Tancho",        number: 18, family: "Tancho",     img: "assets/img/tancho.png",        blurb: "White koi with a single round red crest on the head." },
  { slug: "showa",         name: "Showa",         number: 19, family: "Gosanke",    img: "assets/img/showa.png",         blurb: "Black base carrying red and white; one of the big three." },
  { slug: "sanke",         name: "Sanke",         number: 20, family: "Gosanke",    img: "assets/img/sanke.png",         blurb: "White koi with red pattern and small black accents." },
  { slug: "kohaku",        name: "Kohaku",        number: 21, family: "Gosanke",    img: "assets/img/kohaku.png",        blurb: "Snow-white koi with a crisp crimson pattern. The classic." },
];

const PLANTS = [
  { slug: "duckweed",        name: "Duckweed",         latin: "Lemna minor",           type: "Floating",  koi: "Koi eat it",    koiClass: "warn", nz: "NZ native",             nzClass: "on",   img: "assets/img/duckweed.webp" },
  { slug: "hardy-water-lily", name: "Hardy water lily", latin: "Nymphaea hybrids",      type: "Floating",  koi: "Koi eat it",    koiClass: "warn", nz: "Sold in NZ",            nzClass: "",     img: "assets/img/water-lily.webp" },
  { slug: "anubias",         name: "Anubias",          latin: "Anubias barteri",       type: "Submerged", koi: "Koi leave it",  koiClass: "on",   nz: "Not listed, check first", nzClass: "warn", img: "assets/img/anubias.webp" },
  { slug: "water-hyacinth",  name: "Water hyacinth",   latin: "Pontederia crassipes",  type: "Floating",  koi: "Koi eat it",    koiClass: "warn", nz: "Banned in NZ",          nzClass: "bad",  img: "assets/img/water-hyacinth.webp" },
];

const PAIRINGS = [
  { a: "kohaku", b: "ki-utsuri", child: "showa",    note: "Jukichi Hoshino produced the first Showa around 1926 to 1927." },
  { a: "kohaku", b: "koromo",    child: "sanke",    note: "Sanke was fixed in the Taisho era by putting black onto Kohaku bloodlines." },
  { a: "chagoi", b: null,        child: "beni-kumonryu", note: "Red was added to the Kumonryu pattern in 1980 (shown here as an example card)." },
];

const MOCK = {
  "/api/koi": { count: KOI.length, koi: KOI },
  "/api/plants": { count: PLANTS.length, plants: PLANTS },
  "/api/breeding": { pairings: PAIRINGS },
};

for (const k of KOI) {
  MOCK[`/api/koi/${k.slug}`] = {
    ...k,
    parentOf: PAIRINGS.filter(p => p.a === k.slug || p.b === k.slug),
    producedBy: PAIRINGS.filter(p => p.child === k.slug),
  };
}
for (const p of PLANTS) {
  MOCK[`/api/plants/${p.slug}`] = p;
}
