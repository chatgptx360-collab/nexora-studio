// Image optimization script for Nexora Studio assets.
// Run with: node scripts/optimize-images.js
//
// Source files live in public/ as `favicon.png` (square hexagon) and
// `logo.png` (wordmark). This script overwrites them with compressed
// versions and generates additional favicon sizes for full device support.

import sharp from 'sharp'
import { readFile, writeFile, stat, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = join(__dirname, '..', 'public')

const human = (bytes) => `${(bytes / 1024).toFixed(1)} KB`

async function process(srcName, outputs) {
  const srcPath = join(PUBLIC_DIR, srcName)
  if (!existsSync(srcPath)) {
    console.warn(`⚠️  ${srcName} not found in public/ — skipping`)
    return
  }

  const srcBuf = await readFile(srcPath)
  const srcSize = (await stat(srcPath)).size
  console.log(`\n📦 ${srcName} — ${human(srcSize)} → optimizing…`)

  for (const out of outputs) {
    const pipeline = sharp(srcBuf)
    if (out.width) pipeline.resize(out.width, out.height || null, { fit: 'inside' })
    pipeline.png({ quality: 85, compressionLevel: 9, palette: true })

    const buf = await pipeline.toBuffer()
    const outPath = join(PUBLIC_DIR, out.name)
    if (out.subdir) await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, buf)
    console.log(`   ✓ ${out.name.padEnd(30)} ${human(buf.length)}`)
  }
}

await process('favicon.png', [
  { name: 'favicon.png', width: 256, height: 256 },        // browser tab + replaces the heavy source
  { name: 'favicon-32.png', width: 32, height: 32 },        // explicit small size
  { name: 'apple-touch-icon.png', width: 180, height: 180 }, // iOS home screen
])

await process('logo.png', [
  { name: 'logo.png', width: 800 }, // wordmark — width-constrained, aspect preserved
])

console.log('\n✅ Done. Run `npm run build` to verify, then `vercel --prod` to deploy.')
