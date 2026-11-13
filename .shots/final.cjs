const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'] });
  const url = 'file://' + path.resolve('dist/index.html');
  const shots = [[1440, 900, 'f-1440'], [1100, 800, 'f-1100']];
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('PAGE ERROR:', e.message));
  for (const [w, h, name] of shots) {
    await page.setViewport({ width: w, height: h });
    await page.goto(url, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1300));
    const h1 = await page.evaluate(() => { const el = document.querySelector('h1'); const r = el.getBoundingClientRect(); return { lines: Math.round(r.height / parseFloat(getComputedStyle(el).lineHeight)), text: el.innerText.replace(/\n/g, ' | ') }; });
    console.log(name, JSON.stringify(h1));
    await page.screenshot({ path: `.shots/${name}.png`, clip: { x: 0, y: 0, width: w, height: 620 } });
  }
  // English check at 1440
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  const enBtn = await page.$$('header [role=group] button');
  await enBtn[1].click();
  await new Promise(r => setTimeout(r, 600));
  const en = await page.evaluate(() => document.querySelector('h1').innerText.replace(/\n/g, ' | '));
  console.log('EN h1:', en);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
