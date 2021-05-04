const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    var url = 'https://softreck.com'

    await page.goto(url);
    await page.screenshot({ path: 'page.png' });

    await browser.close();
})();
