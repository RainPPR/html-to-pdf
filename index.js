'use strict'
const path = require('path');
const puppeteer = require('puppeteer');

async function convertHtmlToPdf(htmlPath, pdfPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  if (!htmlPath.startsWith('http') && !path.isAbsolute(htmlPath)) {
    htmlPath = join('file://', path.resolve(__dirname, htmlPath));
  }

  // console.log(htmlPath);

  await page.goto(htmlPath, {
    waitUntil: 'networkidle0',
  });

  await page.pdf({
    format: 'A4',
    margin: {
      top: '25mm',
      bottom: '25mm',
      left: '19mm',
      right: '19mm',
    },
    path: pdfPath,
    printBackground: true,
  });

  await browser.close();
}

(async () => {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Usage: Fuck');
    process.exit(1);
  }

  const source = args[0];
  const target = args[1];

  convertHtmlToPdf(source, target)
   .then(() => console.log(`Success: Convert ${source} to ${target}`))
   .catch(error => console.error(`${error}`));
})();
