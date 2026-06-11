import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const brandDir = path.join(root, 'assets', 'brand');
const appIconDir = path.join(root, 'ios', 'App', 'App', 'Assets.xcassets', 'AppIcon.appiconset');
const brandIconFiles = new Set([
  'app-store-1024.png',
  'iphone-180@3x.png',
  'iphone-120@2x.png',
  'ipad-pro-167.png',
  'ipad-152@2x.png',
]);

const iconFiles = [];

for (const entry of await fs.readdir(brandDir)) {
  if (brandIconFiles.has(entry)) {
    iconFiles.push(path.join(brandDir, entry));
  }
}

for (const entry of await fs.readdir(appIconDir)) {
  if (entry.toLowerCase().endsWith('.png')) {
    iconFiles.push(path.join(appIconDir, entry));
  }
}

let failed = false;

for (const file of iconFiles.sort()) {
  const metadata = await sharp(file).metadata();
  const relative = path.relative(root, file);
  console.log(`${relative}: ${metadata.width}x${metadata.height}, channels=${metadata.channels}, hasAlpha=${metadata.hasAlpha}`);

  if (metadata.hasAlpha || metadata.channels === 4) {
    failed = true;
    console.error(`Alpha channel is not allowed for iOS app icons: ${relative}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log(`Verified ${iconFiles.length} app icon PNGs without alpha channels.`);
