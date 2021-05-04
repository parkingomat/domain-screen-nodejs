const puppeteer = require('puppeteer');

async function getScreenShot() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://mytypings.com');
    await page.setViewport({width: 1000, height: 500})
    await page.screenshot({path: 'mytypings.png'});

    await browser.close();
}

getScreenShot();