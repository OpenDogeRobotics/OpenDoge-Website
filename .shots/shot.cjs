const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'] });
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('PAGE ERROR:', e.message));
  page.on('console', m => { if (m.type() === 'error') console.log('CONSOLE ERROR:', m.text()); });
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve('dist/index.html'), { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 1200));
  // Force all reveals visible by scrolling through the page
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 600) { await page.evaluate(v => window.scrollTo(0, v), y); await new Promise(r => setTimeout(r, 120)); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 900));
  const sections = ['top','pipeline','features','repos','specs','stack','quickstart','roadmap','community'];
  for (const id of sections) {
    await page.evaluate(i => { const el = document.getElementById(i); if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 64); }, id);
    await new Promise(r => setTimeout(r, 900));
    await page.screenshot({ path: `.shots/${id}.png` });
  }
  console.log('page height', h);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
