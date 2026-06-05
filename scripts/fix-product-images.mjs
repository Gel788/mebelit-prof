import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import sharp from "sharp";

const ROOT = join(process.cwd(), "public", "images");

async function normalizeImage(filePath) {
  const buffer = readFileSync(filePath);
  if (buffer.length === 0) {
    console.warn("skip empty:", filePath);
    return;
  }

  const isPng = buffer[0] === 0x89 && buffer[1] === 0x50;
  const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8;

  if (isJpeg && filePath.endsWith(".jpg")) {
    return;
  }

  try {
    const output = await sharp(buffer)
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();

    writeFileSync(filePath, output);
    console.log("fixed:", filePath.replace(process.cwd(), ""));
  } catch (error) {
    console.warn("failed:", filePath, error.message);
  }
}

async function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }
    if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      await normalizeImage(fullPath);
    }
  }
}

await walk(ROOT);
console.log("Done.");
