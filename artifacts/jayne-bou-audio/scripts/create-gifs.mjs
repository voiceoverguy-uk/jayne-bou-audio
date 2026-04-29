import sharp from 'sharp';
import GIFEncoder from 'gif-encoder-2';
import { createWriteStream, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jaynePath = path.join(__dirname, '../public/jayne');
const animPath = path.join(jaynePath, 'anim');

mkdirSync(animPath, { recursive: true });

async function pngToRaw(filePath, targetW, targetH) {
  const { data } = await sharp(filePath)
    .resize(targetW, targetH, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return data;
}

async function makeGif(outputName, frames, delayMs) {
  const W = 282;
  const H = 368;

  const encoder = new GIFEncoder(W, H, 'neuquant', true);
  const outputPath = path.join(animPath, outputName);
  const stream = createWriteStream(outputPath);
  encoder.createReadStream().pipe(stream);

  encoder.start();
  encoder.setRepeat(0);
  encoder.setDelay(delayMs);
  encoder.setQuality(10);
  encoder.setTransparent(null);

  for (const framePath of frames) {
    const raw = await pngToRaw(framePath, W, H);
    encoder.addFrame(raw);
  }

  encoder.finish();

  await new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });

  console.log(`Created: ${outputName}`);
}

const p = (n) => path.join(jaynePath, `jayne-${n}.png`);

await makeGif('jayne-blink.gif', [
  p(1), p(1), p(1), p(2), p(1), p(1),
], 200);

await makeGif('jayne-point.gif', [
  p(2), p(5), p(2), p(5),
], 350);

await makeGif('jayne-listen.gif', [
  p(1), p(3), p(1), p(3),
], 400);

console.log('All GIFs created successfully.');
