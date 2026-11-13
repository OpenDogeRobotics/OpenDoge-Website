const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'] });
  const url = 'file://' + path.resolve('dist/index.html');
  // Desktop, Chinese default
  let page = await browser.newPage();
  page.on('pageerror', e => console.log('PAGE ERROR:', e.message));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: '.shots/zh-top.png' });
  await page.evaluate(() => { const el = document.getElementById('repos'); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 64); });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: '.shots/zh-repos.png' });
  // Mobile
  page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(url, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: '.shots/m-top.png' });
  await page.evaluate(() => { const el = document.getElementById('specs'); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 64); });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: '.shots/m-specs.png' });
  await page.evaluate(() => { const el = document.getElementById('pipeline'); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 64); });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: '.shots/m-pipeline.png' });
  // check horizontal overflow on mobile
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log('mobile horizontal overflow px:', overflow);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
