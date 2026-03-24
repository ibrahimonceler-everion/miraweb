import { createServer } from 'http'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const distDir = join(__dirname, '..', 'dist')

const ROUTES = ['/', '/yazilar', '/siirler', '/serbest']

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
  '.webmanifest': 'application/manifest+json',
}

function startServer(port) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(distDir, req.url === '/' ? 'index.html' : req.url)

      if (!existsSync(filePath) || !extname(filePath)) {
        filePath = join(distDir, 'index.html')
      }

      try {
        const content = readFileSync(filePath)
        const ext = extname(filePath)
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' })
        res.end(content)
      } catch {
        res.writeHead(404)
        res.end('Not found')
      }
    })

    server.listen(port, () => {
      console.log(`  Static server running on http://localhost:${port}`)
      resolve(server)
    })
  })
}

async function prerender() {
  console.log('\n🔍 Pre-rendering pages for SEO...\n')

  const port = 4567
  const server = await startServer(port)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  for (const route of ROUTES) {
    const url = `http://localhost:${port}${route}`
    console.log(`  Rendering: ${route}`)

    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })

    // Wait for React to render
    await page.waitForSelector('#root > *', { timeout: 10000 })
    // Extra wait for animations/dynamic content
    await page.evaluate(() => new Promise((r) => setTimeout(r, 1500)))

    const html = await page.content()

    // Determine output path
    const outputDir = route === '/'
      ? distDir
      : join(distDir, route.slice(1))

    if (route !== '/') {
      mkdirSync(outputDir, { recursive: true })
    }

    writeFileSync(join(outputDir, 'index.html'), html, 'utf-8')
    console.log(`  ✓ Saved: ${route === '/' ? '/index.html' : `${route}/index.html`}`)

    await page.close()
  }

  await browser.close()
  server.close()

  console.log(`\n✅ Pre-rendered ${ROUTES.length} pages successfully!\n`)
}

prerender().catch((err) => {
  console.error('Pre-rendering failed:', err)
  process.exit(1)
})
