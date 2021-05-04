// CodeSnippets/Documents/Websites/NodeJs/createPdfServer.js

const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const port = 3000;

app.get("/pdf", async(req, resp) => {
    const url = req.query.target;
    console.log(`Rcvd: ${url}`);

    const browser = await puppeteer.launch({
        headless: true
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
