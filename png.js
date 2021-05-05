// CodeSnippets/Documents/Websites/NodeJs/createPdfServer.js

const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const port = 3000;

//localhost:3000/png/softreck.com
// http://webscreen.pl:3000/png/softreck.com

app.get("/png/:domain", async(req, resp) => {

    if (!req.params.domain) {
        throw new Error("domain is required");
    }

    var domain = req.params.domain;
    var url = `https://${domain}`


    console.log(`Rcvd: ${url}`);

    const browser = await puppeteer.launch({
        headless: true
    });

    const webPage = await browser.newPage();

    await webPage.goto(url, {
        waitUntil: "networkidle0"
    });


    var img = 'png/' + domain + '.png';

    const png = await webPage.screenshot({path: img});

    await browser.close();

    resp.contentType("image/png");
    resp.send(png);
    // resp.send(`Request rcvd: ${url}`);
});

app.listen(port, () => {
    console.log(`Server started @: http://localhost:${port}`)
})
