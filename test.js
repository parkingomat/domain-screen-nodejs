const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch({
        headless:false,
        userDataDir: "./user_data2",
        args: ["--no-sandbox"]
    });
    console.log(await browser.version());
    await browser.close();
})();


