// CodeSnippets/Documents/Websites/NodeJs/createPdfServer.js
// TODO: sqlite
const cors = require("cors");
const express = require("express");
const puppeteer = require("puppeteer");
const path = require('path');

// Globals
const port = 3000;
var browser;

// Initializing Express and Puppeteer Browser

const app = express();

// Middleware

app.use(cors());


//localhost:3000/png/softreck.com
// http://webscreen.pl:3000/png/softreck.com

app.get("/http/:domain", async (req, resp) => {

    if (!req.params.domain) {
        throw new Error("domain is required");
    }

    var domain = req.params.domain;
    var url = `https://${domain}`


    console.log(`Rcvd: ${url}`);


    ///////////
    const browser = await puppeteer.launch({
        headless: true,
        ignoreDefaultArgs: ['--disable-extensions'],
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const webPage = await browser.newPage();

    await webPage.goto(url, {
        waitUntil: "networkidle0"
    });


    var img = 'png/' + domain + '.png';

    const png = await webPage.screenshot({path: img});

    await browser.close();
    ///////////


    resp.contentType("image/png");
    resp.send(png);
    // resp.send(`Request rcvd: ${url}`);
});


// http://localhost:3000/png/softreck.com
// http://localhost:3000/png/softreck.pl

app.get('/png/:domain', async (req, res) => {


    if (!req.params.domain) {
        throw new Error("domain is required");
    }

    var domain = req.params.domain;
    var img = 'png/' + domain + '.png';
    var url = `https://${domain}`

    // absolute path to the file
    let p = path.join(__dirname, img);

    const fs = require("fs"); // Or `import fs from "fs";` with ESM
    if (fs.existsSync(p)) {
        console.log(`HDD: ${url}`);

        // send a png file
        res.sendFile(p);
        return true;
    }

    console.log(`HTTP: ${url}`);

    ///////////
    const browser = await puppeteer.launch({
        headless: true,
        ignoreDefaultArgs: ['--disable-extensions'],
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const webPage = await browser.newPage();

    await webPage.goto(url, {
        waitUntil: "networkidle0"
    });

    const png = await webPage.screenshot({path: img});
    await browser.close();
    ///////////


    res.contentType("image/png");
    res.send(png);

})


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
