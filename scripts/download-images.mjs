import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import http from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public", "images");

const categoryPhotos = {
  office: "1497366216548-37526070297c",
  beauty: "1560066984-138dadb4c035",
  reception: "1497366811353-6870744d04b2",
  conference: "1431545518336-93b9a4cb0ace",
  medical: "1519494029327-4f40f756c0d6",
  horeca: "1555396273-367ea4eb4db5",
};

const productPhotos = {
  "kreslo-ceo-prestige": "1580480055273-228d538d0ff8",
  "stol-executive-line": "1518455027359-f3f8164ba6bd",
  "kreslo-barber-pro-x": "1621605815971-fbc98d665033",
  "manikyurnyy-stol-aurora": "1604654894610-df63bc536371",
  "resepshn-grand-lobby": "1497366754035-f200968a6e72",
  "divan-lounge-comfort": "1555041469-a586c36ea9bc",
  "stol-peregovornyy-summit": "1431545518336-93b9a4cb0ace",
  "kreslo-konferents-elite": "1503603722526-8a4a804b8f0b",
  "kushetka-meditsinskaya-promed": "1579684385127-1ef15d508118",
  "stul-restorannyy-milano": "1501045669846-fbebe8647b22",
  "parikmaherskoe-kreslo-style-lux": "1522337360788-8b13dee7a37e",
  "stellazh-modulnyy-open-space": "1497366216548-37526070297c",
};

const testProductPhotos = {
  "test-stol-call-center": "1497366216548-37526070297c",
  "test-kreslo-personal-soft": "1592078611260-761686136695",
  "test-shkaf-archive": "1497366754035-f200968a6e72",
  "test-stellazh-loft": "1497366216548-37526070297c",
  "test-peregorodka-glass": "1497366811353-6870744d04b2",
  "test-stol-round": "1431545518336-93b9a4cb0ace",
  "test-tribuna": "1431545518336-93b9a4cb0ace",
  "test-stul-stack": "1503603722526-8a4a804b8f0b",
  "test-doska-magnit": "1431545518336-93b9a4cb0ace",
  "test-kreslo-manikyur": "1604654894610-df63bc536371",
  "test-moyka-parik": "1560066984-138dadb4c035",
  "test-telezhka-beauty": "1522337360788-8b13dee7a37e",
  "test-zerkalo-led": "1560066984-138dadb4c035",
  "test-kreslo-kosmetolog": "1604654894610-df63bc536371",
  "test-resepshn-compact": "1497366754035-f200968a6e72",
  "test-kreslo-ozhidanie": "1555041469-a586c36ea9bc",
  "test-stolik-lobby": "1555041469-a586c36ea9bc",
  "test-stoyka-broshyur": "1497366811353-6870744d04b2",
  "test-kushetka-basic": "1579684385127-1ef15d508118",
  "test-shkaf-med": "1519494029327-4f40f756c0d6",
  "test-stol-osmotr": "1579684385127-1ef15d508118",
  "test-taburet-med": "1519494029327-4f40f756c0d6",
  "test-stol-bistro": "1501045669846-fbebe8647b22",
  "test-barnaya-stoyka": "1555396273-367ea4eb4db5",
  "test-stul-bar": "1501045669846-fbebe8647b22",
  "test-divan-hotel": "1555041469-a586c36ea9bc",
  "test-stol-outdoor": "1555396273-367ea4eb4db5",
  "test-open-space-start": "1497366216548-37526070297c",
  "test-beauty-mini": "1560066984-138dadb4c035",
  "test-resepshn-standard": "1497366754035-f200968a6e72",
};

function unsplashUrl(photoId, w = 900, h = 1125) {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const getter = url.startsWith("https") ? https : http;

    const request = getter.get(url, { headers: { "User-Agent": "MebelitProf/1.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve(dest)));
    });

    request.on("error", (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });

    request.setTimeout(30000, () => {
      request.destroy(new Error(`Timeout: ${url}`));
    });
  });
}

async function saveImage(url, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  try {
    await download(url, dest);
    console.log("✓", path.relative(root, dest));
    return true;
  } catch (e) {
    console.warn("✗", path.relative(root, dest), e.message);
    return false;
  }
}

async function main() {
  fs.mkdirSync(path.join(publicDir, "categories"), { recursive: true });
  fs.mkdirSync(path.join(publicDir, "products"), { recursive: true });

  let ok = 0;
  let fail = 0;

  for (const [slug, photoId] of Object.entries(categoryPhotos)) {
    const dest = path.join(publicDir, "categories", `${slug}.jpg`);
    const success = await saveImage(unsplashUrl(photoId, 1200, 750), dest);
    success ? ok++ : fail++;
  }

  const heroDest = path.join(publicDir, "hero.jpg");
  if (await saveImage(unsplashUrl("1497366216548-37526070297c", 1600, 1000), heroDest)) ok++;
  else fail++;

  for (const [slug, photoId] of Object.entries({ ...productPhotos, ...testProductPhotos })) {
    const dest = path.join(publicDir, "products", `${slug}.jpg`);
    const success = await saveImage(unsplashUrl(photoId), dest);
    success ? ok++ : fail++;
  }

  console.log(`\nDone: ${ok} ok, ${fail} failed`);
}

main();
