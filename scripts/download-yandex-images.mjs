#!/usr/bin/env node
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public", "images");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const categoryQueries = {
  office: "офисная мебель интерьер",
  beauty: "салон красоты оборудование",
  reception: "ресепшн стойка офис",
  conference: "конференц зал переговорная",
  medical: "медицинский кабинет мебель",
  horeca: "ресторан интерьер мебель",
};

const productQueries = {
  "kreslo-ceo-prestige": "кресло руководителя кожаное офис",
  "stol-executive-line": "executive desk office wood",
  "kreslo-barber-pro-x": "barber chair professional",
  "manikyurnyy-stol-aurora": "маникюрный стол салон",
  "resepshn-grand-lobby": "reception desk office modern",
  "divan-lounge-comfort": "диван зона ожидания офис",
  "stol-peregovornyy-summit": "конференц стол переговоры",
  "kreslo-konferents-elite": "конференц кресло офис",
  "kushetka-meditsinskaya-promed": "медицинская кушетка кабинет",
  "stul-restorannyy-milano": "ресторанный стул design",
  "parikmaherskoe-kreslo-style-lux": "парикмахерское кресло салон",
  "stellazh-modulnyy-open-space": "офисный стеллаж open space",
};

const testQueries = {
  "test-stol-call-center": "стол оператора call center",
  "test-kreslo-personal-soft": "офисное кресло для персонала",
  "test-shkaf-archive": "архивный шкаф офис",
  "test-stellazh-loft": "стеллаж офис loft",
  "test-peregorodka-glass": "офисная перегородка стекло",
  "test-stol-round": "круглый стол переговорный",
  "test-tribuna": "трибуна презентация офис",
  "test-stul-stack": "стул конференц стекируемый",
  "test-doska-magnit": "магнитная доска офис",
  "test-kreslo-manikyur": "кресло для маникюра",
  "test-moyka-parik": "мойка парикмахерская",
  "test-telezhka-beauty": "тележка инструментов салон",
  "test-zerkalo-led": "зеркало салон красоты led",
  "test-kreslo-kosmetolog": "кресло косметолога",
  "test-resepshn-compact": "стойка ресепшн",
  "test-kreslo-ozhidanie": "кресло зона ожидания",
  "test-stolik-lobby": "журнальный столик lobby",
  "test-stoyka-broshyur": "стойка для брошюр",
  "test-kushetka-basic": "медицинская кушетка",
  "test-shkaf-med": "медицинский шкаф",
  "test-stol-osmotr": "стол медицинский осмотр",
  "test-taburet-med": "медицинский табурет",
  "test-stol-bistro": "стол ресторан bistro",
  "test-barnaya-stoyka": "барная стойка ресторан",
  "test-stul-bar": "барный стул",
  "test-divan-hotel": "диван hotel lobby",
  "test-stol-outdoor": "стол кафе outdoor",
  "test-open-space-start": "open space office furniture",
  "test-beauty-mini": "оборудование салон красоты",
  "test-resepshn-standard": "ресепшн мебель",
};

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const getter = url.startsWith("https") ? https : http;
    const req = getter.get(
      url,
      {
        headers: {
          "User-Agent": UA,
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "ru-RU,ru;q=0.9",
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchText(res.headers.location).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve(data));
      }
    );
    req.on("error", reject);
    req.setTimeout(25000, () => req.destroy(new Error("timeout")));
  });
}

function downloadBinary(url, dest) {
  return new Promise((resolve, reject) => {
    const getter = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    const req = getter.get(url, { headers: { "User-Agent": UA, Referer: "https://yandex.ru/" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlink(dest, () => {});
        downloadBinary(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve(dest)));
    });
    req.on("error", reject);
    req.setTimeout(30000, () => req.destroy(new Error("timeout")));
  });
}

function extractYandexImages(html) {
  const decoded = html.replace(/&quot;/g, '"').replace(/&amp;/g, "&");
  const urls = new Set();

  const regexes = [
    /https:\/\/avatars\.mds\.yandex\.net\/get-mpic\/[^"\s]+\/orig/g,
    /https:\/\/avatars\.mds\.yandex\.net\/get-[^"\s]+\/orig/g,
    /https:\/\/avatars\.mds\.yandex\.net\/get-direct\/[^"\s]+/g,
    /https:\/\/avatars\.mds\.yandex\.net\/get-yastore\/[^"\s]+\/orig/g,
  ];

  for (const re of regexes) {
    for (const match of decoded.matchAll(re)) {
      let url = match[0];
      url = url.split('"')[0].split(",")[0];
      if (!url.includes("yabs")) urls.add(url);
    }
  }

  return [...urls];
}

async function searchYandexImage(query) {
  const url = `https://yandex.ru/images/search?text=${encodeURIComponent(query)}&isize=large`;
  const html = await fetchText(url);
  const images = extractYandexImages(html);
  return images[0] || images.find((u) => u.includes("/orig")) || images[0];
}

async function saveImageFromYandex(query, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const imageUrl = await searchYandexImage(query);
  if (!imageUrl) throw new Error("no image found");
  await downloadBinary(imageUrl, dest);
  return imageUrl;
}

async function main() {
  let ok = 0;
  let fail = 0;

  console.log("Скачиваем категории...");
  for (const [slug, query] of Object.entries(categoryQueries)) {
    const dest = path.join(publicDir, "categories", `${slug}.jpg`);
    try {
      const src = await saveImageFromYandex(query, dest);
      console.log(`✓ category/${slug}.jpg`);
      console.log(`  ${src.slice(0, 90)}...`);
      ok++;
    } catch (e) {
      console.warn(`✗ category/${slug}.jpg — ${e.message}`);
      fail++;
    }
    await new Promise((r) => setTimeout(r, 800));
  }

  console.log("\nHero...");
  try {
    await saveImageFromYandex("офис мебель интерьер премиум", path.join(publicDir, "hero.jpg"));
    console.log("✓ hero.jpg");
    ok++;
  } catch (e) {
    console.warn(`✗ hero.jpg — ${e.message}`);
    fail++;
  }

  console.log("\nТовары...");
  const allProducts = { ...productQueries, ...testQueries };
  for (const [slug, query] of Object.entries(allProducts)) {
    const dest = path.join(publicDir, "products", `${slug}.jpg`);
    try {
      await saveImageFromYandex(query, dest);
      console.log(`✓ products/${slug}.jpg`);
      ok++;
    } catch (e) {
      console.warn(`✗ products/${slug}.jpg — ${e.message}`);
      fail++;
    }
    await new Promise((r) => setTimeout(r, 800));
  }

  console.log(`\nГотово: ${ok} успешно, ${fail} ошибок`);
}

main().catch(console.error);
