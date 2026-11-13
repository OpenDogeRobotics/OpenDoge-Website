const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'] });
  const url = 'file://' + path.resolve('dist/index.html');
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('PAGE ERROR:', e.message));
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(url, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  const info = await page.evaluate(() => {
    const d = document.documentElement;
    const header = document.querySelector('header');
    const toggle = document.querySelector('header [role=group]');
    const burger = document.querySelector('header button[aria-label]');
    const r = el => el ? JSON.stringify(el.getBoundingClientRect().toJSON()) : 'null';
    // find widest elements
    const wide = [...document.querySelectorAll('body *')].filter(el => el.getBoundingClientRect().right > d.clientWidth + 1).slice(0,6).map(el => el.tagName + '.' + (el.className && el.className.baseVal === undefined ? String(el.className).slice(0,60) : 'svg') + ' right=' + Math.round(el.getBoundingClientRect().right));
    return { clientWidth: d.clientWidth, scrollWidth: d.scrollWidth, innerWidth: window.innerWidth, header: r(header), toggle: r(toggle), burger: r(burger), wide };
  });
  console.log(JSON.stringify(info, null, 1));
  await page.screenshot({ path: '.shots/m-top2.png' });
  // open mobile menu and screenshot
  await page.click('header button[aria-label]');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: '.shots/m-menu.png' });
  // Also check the deploy tab of quickstart (longest code line)
  await page.evaluate(() => { const el = document.getElementById('quickstart'); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 64); });
  await new Promise(r => setTimeout(r, 800));
  const tabs = await page.$$('#quickstart [role=tab]');
  await tabs[3].click();
  await new Promise(r => setTimeout(r, 800));
  const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log('overflow after deploy tab:', ov);
  await page.screenshot({ path: '.shots/m-quickstart.png' });
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
