// CodeSnippets/Documents/Websites/NodeJs/createPdfServer.js

const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const port = 3000;

//localhost:3000/pdf/softreck.com
//http://webscreen.pl:3000/pdf/softreck.com

app.get("/pdf/:domain", async(req, resp) => {
    console.log(req.params);

    if (!req.params.domain) {
        throw new Error("domain is required");
    }

    var domain = req.params.domain;
    var url = `https://${domain}`


    console.log(`Rcvd: ${url}`);

    const browser = await puppeteer.launch({
        headless: true,
        ignoreDefaultArgs: ['--disable-extensions'],
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const webPage = await browser.newPage();

    await webPage.goto(url, {
        waitUntil: "networkidle0"
    });

    const pdf = await webPage.pdf({
        printBackground: true,
        format: "Letter",
        margin: {
            top: "0px",
            bottom: "40px",
            left: "20px",
            right: "20px"
        }
    });

    await browser.close();
    resp.contentType("application/pdf");
    resp.send(pdf);
    // resp.send(`Request rcvd: ${url}`);
});

app.listen(port, () => {
    console.log(`Server started @: http://localhost:${port}`)
})
