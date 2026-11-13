const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'] });
  const url = 'file://' + path.resolve('dist/index.html');
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('PAGE ERROR:', e.message));
  for (const [w, h, name] of [[1440, 900, 'g-1440'], [1100, 800, 'g-1100'], [360, 740, 'g-360']]) {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: w < 500 ? 2 : 1, isMobile: w < 500 });
    await page.goto(url, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1300));
    const h1 = await page.evaluate(() => {
      const el = document.querySelector('h1');
      const r = el.getBoundingClientRect();
      const lines = Math.round(r.height / parseFloat(getComputedStyle(el).lineHeight));
      // compute visual lines by group tops
      const tops = [...el.querySelectorAll('.inline-block')].map(s => Math.round(s.getBoundingClientRect().top));
      const grouped = {}; [...el.querySelectorAll('.inline-block')].forEach((s, i) => { (grouped[tops[i]] ||= []).push(s.innerText); });
      return { lines, visual: Object.values(grouped).map(a => a.join('·')).join(' | ') , overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth };
    });
    console.log(name, JSON.stringify(h1));
    if (w === 1440) await page.screenshot({ path: `.shots/${name}.png`, clip: { x: 0, y: 0, width: w, height: 620 } });
  }
  // EN at 1440
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false });
  await page.goto(url, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  const enBtn = await page.$$('header [role=group] button');
  await enBtn[1].click();
  await new Promise(r => setTimeout(r, 700));
  const en = await page.evaluate(() => {
    const el = document.querySelector('h1');
    const grouped = {}; [...el.querySelectorAll('.inline-block')].forEach(s => { const k = Math.round(s.getBoundingClientRect().top); (grouped[k] ||= []).push(s.innerText); });
    return Object.values(grouped).map(a => a.join(' ')).join(' | ');
  });
  console.log('EN 1440:', en);
  await page.screenshot({ path: `.shots/g-1440-en.png`, clip: { x: 0, y: 0, width: 1440, height: 620 } });
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
