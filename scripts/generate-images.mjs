import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public", "images");

const categoryMeta = {
  office: { label: "Офисная мебель", colors: ["#1a1a2e", "#9a7858"] },
  beauty: { label: "Салоны красоты", colors: ["#2d1b2e", "#c7b49a"] },
  reception: { label: "Ресепшн", colors: ["#1f2937", "#846248"] },
  conference: { label: "Конференц-залы", colors: ["#111827", "#b09474"] },
  medical: { label: "Медицина", colors: ["#0f172a", "#6b4f3c"] },
  horeca: { label: "HoReCa", colors: ["#1c1917", "#9a7858"] },
};

const products = [
  { slug: "kreslo-ceo-prestige", title: "Кресло CEO Prestige", cat: "office" },
  { slug: "stol-executive-line", title: "Стол Executive Line", cat: "office" },
  { slug: "kreslo-barber-pro-x", title: "Кресло Barber Pro X", cat: "beauty" },
  { slug: "manikyurnyy-stol-aurora", title: "Стол Aurora", cat: "beauty" },
  { slug: "resepshn-grand-lobby", title: "Ресепшн Grand Lobby", cat: "reception" },
  { slug: "divan-lounge-comfort", title: "Диван Lounge", cat: "reception" },
  { slug: "stol-peregovornyy-summit", title: "Стол Summit", cat: "conference" },
  { slug: "kreslo-konferents-elite", title: "Кресло Elite", cat: "conference" },
  { slug: "kushetka-meditsinskaya-promed", title: "Кушетка ProMed", cat: "medical" },
  { slug: "stul-restorannyy-milano", title: "Стул Milano", cat: "horeca" },
  { slug: "parikmaherskoe-kreslo-style-lux", title: "Style Lux", cat: "beauty" },
  { slug: "stellazh-modulnyy-open-space", title: "Open Space", cat: "office" },
];

const testSlugs = [
  "test-stol-call-center", "test-kreslo-personal-soft", "test-shkaf-archive",
  "test-stellazh-loft", "test-peregorodka-glass", "test-stol-round",
  "test-tribuna", "test-stul-stack", "test-doska-magnit", "test-kreslo-manikyur",
  "test-moyka-parik", "test-telezhka-beauty", "test-zerkalo-led",
  "test-kreslo-kosmetolog", "test-resepshn-compact", "test-kreslo-ozhidanie",
  "test-stolik-lobby", "test-stoyka-broshyur", "test-kushetka-basic",
  "test-shkaf-med", "test-stol-osmotr", "test-taburet-med", "test-stol-bistro",
  "test-barnaya-stoyka", "test-stul-bar", "test-divan-hotel", "test-stol-outdoor",
  "test-open-space-start", "test-beauty-mini", "test-resepshn-standard",
];

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

function wrapText(text, max = 22) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

async function renderImage({
  dest,
  width,
  height,
  title,
  subtitle,
  colors,
}) {
  if (fs.existsSync(dest)) {
    const stat = fs.statSync(dest);
    if (stat.size > 15000) {
      console.log("↷ skip (exists)", path.relative(root, dest));
      return;
    }
  }
  const lines = wrapText(title, width > height ? 28 : 20);
  const lineHeight = width > height ? 42 : 36;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;

  const textLines = lines
    .map(
      (line, i) =>
        `<text x="50%" y="${startY + i * lineHeight}" text-anchor="middle" fill="#fafafa" font-family="Georgia, serif" font-size="${width > height ? 34 : 28}" font-weight="600">${escapeXml(line)}</text>`
    )
    .join("");

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${colors[0]}"/>
          <stop offset="100%" stop-color="${colors[1]}"/>
        </linearGradient>
        <radialGradient id="glow" cx="70%" cy="20%" r="60%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect width="100%" height="100%" fill="url(#glow)"/>
      <rect x="40" y="${height - 80}" width="${width - 80}" height="1" fill="#ffffff" opacity="0.15"/>
      ${textLines}
      <text x="50%" y="${height - 40}" text-anchor="middle" fill="#d4d4d8" font-family="system-ui,sans-serif" font-size="14" letter-spacing="3">${escapeXml(subtitle.toUpperCase())}</text>
    </svg>
  `;

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(dest);
}

async function main() {
  for (const [slug, meta] of Object.entries(categoryMeta)) {
    await renderImage({
      dest: path.join(publicDir, "categories", `${slug}.jpg`),
      width: 1200,
      height: 750,
      title: meta.label,
      subtitle: "Mebelit Prof",
      colors: meta.colors,
    });
    console.log("✓ category", slug);
  }

  await renderImage({
    dest: path.join(publicDir, "hero.jpg"),
    width: 1600,
    height: 1000,
    title: "Профессиональная мебель",
    subtitle: "Mebelit Prof",
    colors: ["#0a0a0b", "#584234"],
  });
  console.log("✓ hero");

  for (const p of products) {
    const meta = categoryMeta[p.cat];
    await renderImage({
      dest: path.join(publicDir, "products", `${p.slug}.jpg`),
      width: 900,
      height: 1125,
      title: p.title,
      subtitle: meta.label,
      colors: meta.colors,
    });
    console.log("✓", p.slug);
  }

  for (const slug of testSlugs) {
    const catKeys = Object.keys(categoryMeta);
    const cat = catKeys[testSlugs.indexOf(slug) % catKeys.length];
    const meta = categoryMeta[cat];
    const title = slug.replace("test-", "").replace(/-/g, " ");
    await renderImage({
      dest: path.join(publicDir, "products", `${slug}.jpg`),
      width: 900,
      height: 1125,
      title,
      subtitle: "Тест · " + meta.label,
      colors: meta.colors,
    });
    console.log("✓", slug);
  }
}

main().catch(console.error);
