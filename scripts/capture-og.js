const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Wait a few seconds for all hero animations to settle perfectly
  await new Promise(r => setTimeout(r, 4000));
  
  await page.screenshot({ path: 'public/images/og-hero-v2.png' });
  await browser.close();
})();
