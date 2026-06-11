import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const brandDir = path.join(root, 'assets', 'brand');
const screenshotDir = path.join(root, 'assets', 'app-store-screenshots');
const appIconDir = path.join(root, 'ios', 'App', 'App', 'Assets.xcassets', 'AppIcon.appiconset');
const splashDir = path.join(root, 'ios', 'App', 'App', 'Assets.xcassets', 'Splash.imageset');

const cream = '#F5EFE0';
const charcoal = '#1C1C1A';
const gold = '#C8A050';
const mutedGold = '#A67C2E';
const wine = '#3A0E0E';
const font = 'Cormorant Garamond, Cormorant, Georgia, serif';

async function ensureDirs() {
  await fs.mkdir(brandDir, { recursive: true });
  await fs.mkdir(screenshotDir, { recursive: true });
  await fs.mkdir(appIconDir, { recursive: true });
  await fs.mkdir(splashDir, { recursive: true });
}

function quillSvg(x, y, scale = 1, color = gold) {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round">
      <path d="M110 8 C64 19 31 55 12 112 C65 94 101 60 110 8 Z" fill="${color}" opacity="0.88" stroke="none"/>
      <path d="M98 21 C70 49 43 77 16 107" stroke="${cream}" stroke-width="5" opacity="0.9"/>
      <path d="M65 52 L90 45" stroke="${cream}" stroke-width="4" opacity="0.65"/>
      <path d="M51 67 L76 60" stroke="${cream}" stroke-width="4" opacity="0.65"/>
      <path d="M38 82 L63 75" stroke="${cream}" stroke-width="4" opacity="0.65"/>
      <path d="M18 111 L-36 165" stroke="${color}" stroke-width="9"/>
      <path d="M-39 168 L-57 186" stroke="${mutedGold}" stroke-width="5"/>
    </g>
  `;
}

function iconSvg(size) {
  const s = size;
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 1024 1024">
    <rect width="1024" height="1024" rx="220" fill="${cream}"/>
    <circle cx="512" cy="512" r="402" fill="none" stroke="${gold}" stroke-width="10" opacity="0.34"/>
    ${quillSvg(435, 245, 1.35)}
    <text x="512" y="610" text-anchor="middle" font-family="${font}" font-size="142" font-weight="600" letter-spacing="26" fill="${charcoal}">SILSILA</text>
    <text x="512" y="684" text-anchor="middle" font-family="${font}" font-size="34" letter-spacing="7" fill="${mutedGold}">URDU POETRY</text>
  </svg>`;
}

function splashSvg(size = 2732) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 2732 2732">
    <rect width="2732" height="2732" fill="${cream}"/>
    <circle cx="1366" cy="1366" r="690" fill="none" stroke="${gold}" stroke-width="8" opacity="0.18"/>
    ${quillSvg(1260, 1040, 1.65)}
    <text x="1366" y="1448" text-anchor="middle" font-family="${font}" font-size="218" font-weight="600" letter-spacing="40" fill="${charcoal}">SILSILA</text>
    <text x="1366" y="1548" text-anchor="middle" font-family="${font}" font-size="54" letter-spacing="12" fill="${mutedGold}">URDU POETRY FOR THE DIASPORA</text>
  </svg>`;
}

async function pngFromSvg(svg, outPath, size) {
  await sharp(Buffer.from(svg))
    .resize(size.width, size.height, { fit: 'fill' })
    .png()
    .toFile(outPath);
}

async function generateIcons() {
  const source = iconSvg(1024);
  await fs.writeFile(path.join(brandDir, 'silsila-app-icon.svg'), source);

  const requested = [
    ['app-store-1024.png', 1024],
    ['iphone-180@3x.png', 180],
    ['iphone-120@2x.png', 120],
    ['ipad-pro-167.png', 167],
    ['ipad-152@2x.png', 152],
  ];

  for (const [name, size] of requested) {
    await pngFromSvg(source, path.join(brandDir, name), { width: size, height: size });
  }

  const catalog = [
    ['Icon-App-20x20@1x.png', 'ipad', '20x20', '1x', 20],
    ['Icon-App-20x20@2x.png', 'iphone', '20x20', '2x', 40],
    ['Icon-App-20x20@2x~ipad.png', 'ipad', '20x20', '2x', 40],
    ['Icon-App-20x20@3x.png', 'iphone', '20x20', '3x', 60],
    ['Icon-App-29x29@1x.png', 'ipad', '29x29', '1x', 29],
    ['Icon-App-29x29@2x.png', 'iphone', '29x29', '2x', 58],
    ['Icon-App-29x29@2x~ipad.png', 'ipad', '29x29', '2x', 58],
    ['Icon-App-29x29@3x.png', 'iphone', '29x29', '3x', 87],
    ['Icon-App-40x40@1x.png', 'ipad', '40x40', '1x', 40],
    ['Icon-App-40x40@2x.png', 'iphone', '40x40', '2x', 80],
    ['Icon-App-40x40@2x~ipad.png', 'ipad', '40x40', '2x', 80],
    ['Icon-App-40x40@3x.png', 'iphone', '40x40', '3x', 120],
    ['Icon-App-60x60@2x.png', 'iphone', '60x60', '2x', 120],
    ['Icon-App-60x60@3x.png', 'iphone', '60x60', '3x', 180],
    ['Icon-App-76x76@1x.png', 'ipad', '76x76', '1x', 76],
    ['Icon-App-76x76@2x.png', 'ipad', '76x76', '2x', 152],
    ['Icon-App-83.5x83.5@2x.png', 'ipad', '83.5x83.5', '2x', 167],
    ['AppIcon-512@2x.png', 'ios-marketing', '1024x1024', '1x', 1024],
  ];

  for (const [name, , , , px] of catalog) {
    await pngFromSvg(source, path.join(appIconDir, name), { width: px, height: px });
  }

  const contents = {
    images: catalog.map(([filename, idiom, size, scale]) => ({ filename, idiom, size, scale })),
    info: { author: 'xcode', version: 1 },
  };
  await fs.writeFile(path.join(appIconDir, 'Contents.json'), `${JSON.stringify(contents, null, 2)}\n`);
}

async function generateSplash() {
  const source = splashSvg();
  await fs.writeFile(path.join(brandDir, 'silsila-splash.svg'), source);
  for (const name of ['splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png']) {
    await pngFromSvg(source, path.join(splashDir, name), { width: 2732, height: 2732 });
  }
  await pngFromSvg(source, path.join(brandDir, 'silsila-splash-2732.png'), { width: 2732, height: 2732 });
}

function poemCard({ x, y, w, h, title, urdu, roman, english, poet }) {
  return `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="38" fill="#fffaf0" stroke="${gold}" stroke-opacity="0.35"/>
      <text x="${x + w - 44}" y="${y + 92}" text-anchor="end" font-family="Noto Nastaliq Urdu, Georgia, serif" font-size="48" fill="${charcoal}">${escapeXml(urdu)}</text>
      <text x="${x + 48}" y="${y + 170}" font-family="${font}" font-size="35" font-weight="600" fill="${wine}">${escapeXml(title)}</text>
      <text x="${x + 48}" y="${y + 232}" font-family="Inter, Arial, sans-serif" font-size="25" fill="#4A4335">${escapeXml(roman)}</text>
      <text x="${x + 48}" y="${y + 284}" font-family="Inter, Arial, sans-serif" font-size="25" fill="#6D5D3F">${escapeXml(english)}</text>
      <text x="${x + 48}" y="${y + h - 52}" font-family="Inter, Arial, sans-serif" font-size="22" fill="${mutedGold}">${escapeXml(poet)}</text>
    </g>
  `;
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function screenshotSvg({ width, height, caption, kind }) {
  const scale = width / 1320;
  const top = 210 * scale;
  const side = 90 * scale;
  const cardW = width - side * 2;
  const titleSize = Math.max(62, 78 * scale);
  const bodySize = Math.max(30, 38 * scale);
  const appTop = top + 210 * scale;

  const moods = ['longing', 'grief', 'resilience', 'dreams', 'joy', 'loyalty'];
  const moodPills = moods.map((mood, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = side + col * (cardW / 2 + 18 * scale);
    const y = appTop + 250 * scale + row * 106 * scale;
    const w = cardW / 2 - 18 * scale;
    return `<rect x="${x}" y="${y}" width="${w}" height="${74 * scale}" rx="${37 * scale}" fill="#FFF8E8" stroke="${gold}" stroke-opacity="0.42"/>
      <text x="${x + w / 2}" y="${y + 48 * scale}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${26 * scale}" fill="${charcoal}">${mood}</text>`;
  }).join('');

  const profile = `
    <circle cx="${width / 2}" cy="${appTop + 330 * scale}" r="${92 * scale}" fill="${wine}"/>
    <text x="${width / 2}" y="${appTop + 354 * scale}" text-anchor="middle" font-family="${font}" font-size="${58 * scale}" fill="${cream}">MG</text>
    <text x="${width / 2}" y="${appTop + 500 * scale}" text-anchor="middle" font-family="${font}" font-size="${58 * scale}" font-weight="600" fill="${charcoal}">Mirza Ghalib</text>
    <text x="${width / 2}" y="${appTop + 560 * scale}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${28 * scale}" fill="${mutedGold}">1797-1869 · Ghazal</text>
    ${poemCard({ x: side, y: appTop + 650 * scale, w: cardW, h: 350 * scale, title: 'Selected verse', urdu: 'ہزاروں خواہشیں ایسی', roman: 'Hazaron khwahishen aisi...', english: 'A thousand desires, each bright enough to spend a life on.', poet: 'Mirza Ghalib' })}
  `;

  const saved = `
    ${poemCard({ x: side, y: appTop + 250 * scale, w: cardW, h: 350 * scale, title: 'Saved poem', urdu: 'دل ناداں تجھے ہوا کیا ہے', roman: 'Dil-e-naadan tujhe hua kya hai', english: 'O unwise heart, what has come over you?', poet: 'Mirza Ghalib' })}
    ${poemCard({ x: side, y: appTop + 650 * scale, w: cardW, h: 350 * scale, title: 'Saved poem', urdu: 'بول کہ لب آزاد ہیں تیرے', roman: 'Bol ke lab azaad hain tere', english: 'Speak, your lips are still free.', poet: 'Faiz Ahmed Faiz' })}
  `;

  const poem = `
    ${poemCard({ x: side, y: appTop + 250 * scale, w: cardW, h: 560 * scale, title: 'Poem view', urdu: 'نقش فریادی ہے کس کی شوخیٔ تحریر کا', roman: 'Naqsh fariyadi hai kiske shokhi-e-tehreer ka', english: 'Whose playful writing makes even the image plead?', poet: 'Mirza Ghalib' })}
    <rect x="${side}" y="${appTop + 870 * scale}" width="${cardW}" height="${140 * scale}" rx="${30 * scale}" fill="#FFF8E8" stroke="${gold}" stroke-opacity="0.35"/>
    <text x="${side + 48 * scale}" y="${appTop + 930 * scale}" font-family="${font}" font-size="${34 * scale}" font-weight="600" fill="${wine}">Context</text>
    <text x="${side + 48 * scale}" y="${appTop + 978 * scale}" font-family="Inter, Arial, sans-serif" font-size="${24 * scale}" fill="#4A4335">A compact ghazal opening where image, paper, and longing become one.</text>
  `;

  const explore = `
    <rect x="${side}" y="${appTop + 230 * scale}" width="${cardW}" height="${120 * scale}" rx="${34 * scale}" fill="${wine}"/>
    <text x="${side + 48 * scale}" y="${appTop + 305 * scale}" font-family="${font}" font-size="${44 * scale}" fill="${cream}">Explore by feeling</text>
    ${moodPills}
    ${poemCard({ x: side, y: appTop + 680 * scale, w: cardW, h: 360 * scale, title: 'Poem of the Day', urdu: 'ستاروں سے آگے جہاں اور بھی ہیں', roman: 'Sitaron se aage jahan aur bhi hain', english: 'Beyond the stars, more worlds are waiting.', poet: 'Allama Iqbal' })}
  `;

  const browse = `
    <text x="${side}" y="${appTop + 255 * scale}" font-family="${font}" font-size="${48 * scale}" font-weight="600" fill="${charcoal}">Browse by mood</text>
    ${moodPills}
    <rect x="${side}" y="${appTop + 650 * scale}" width="${cardW}" height="${320 * scale}" rx="${38 * scale}" fill="#FFF8E8" stroke="${gold}" stroke-opacity="0.35"/>
    <text x="${side + 48 * scale}" y="${appTop + 735 * scale}" font-family="${font}" font-size="${46 * scale}" fill="${wine}">Longing</text>
    <text x="${side + 48 * scale}" y="${appTop + 795 * scale}" font-family="Inter, Arial, sans-serif" font-size="${26 * scale}" fill="#4A4335">Verses for distance, memory, and the ache of almost-reaching.</text>
    <text x="${side + 48 * scale}" y="${appTop + 890 * scale}" font-family="Inter, Arial, sans-serif" font-size="${24 * scale}" fill="${mutedGold}">42 poems</text>
  `;

  const content = { explore, poem, profile, saved, browse }[kind];

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${cream}"/>
    <circle cx="${width * 0.82}" cy="${height * 0.08}" r="${260 * scale}" fill="${gold}" opacity="0.08"/>
    <circle cx="${width * 0.12}" cy="${height * 0.94}" r="${320 * scale}" fill="${wine}" opacity="0.06"/>
    ${quillSvg(side, top - 30 * scale, 0.42 * scale)}
    <text x="${side}" y="${top + 130 * scale}" font-family="${font}" font-size="${titleSize}" font-weight="600" letter-spacing="${8 * scale}" fill="${charcoal}">SILSILA</text>
    <text x="${side}" y="${top + 195 * scale}" font-family="${font}" font-size="${bodySize}" fill="${mutedGold}">${escapeXml(caption)}</text>
    <rect x="${side * 0.55}" y="${appTop}" width="${width - side * 1.1}" height="${height - appTop - 140 * scale}" rx="${70 * scale}" fill="#FAF2DF" stroke="${gold}" stroke-opacity="0.2"/>
    ${content}
  </svg>`;
}

async function generateScreenshots() {
  const devices = [
    ['iphone-6-9', 1320, 2868],
    ['iphone-6-5', 1242, 2688],
    ['iphone-5-5', 1242, 2208],
    ['ipad-13', 2064, 2752],
    ['ipad-12-9', 2048, 2732],
  ];
  const shots = [
    ['01-explore', 'Find poetry by feeling', 'explore'],
    ['02-poem', 'Urdu, romanized, and English together', 'poem'],
    ['03-poet-profile', 'Meet the poets behind the verses', 'profile'],
    ['04-saved-library', 'Keep a private divan of favorites', 'saved'],
    ['05-browse-mood', 'Browse every mood with ease', 'browse'],
  ];

  for (const [device, width, height] of devices) {
    for (const [name, caption, kind] of shots) {
      const svg = screenshotSvg({ width, height, caption, kind });
      await sharp(Buffer.from(svg)).png().toFile(path.join(screenshotDir, `${device}-${name}.png`));
    }
  }
}

await ensureDirs();
await generateIcons();
await generateSplash();
await generateScreenshots();

console.log('Generated Silsila icons, splash assets, and App Store screenshots.');
