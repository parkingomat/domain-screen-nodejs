const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch({
        headless:false,
        args: ["--no-sandbox"]
    });
    console.log(await browser.version());
    await browser.close();
})();


