// CodeSnippets/Documents/Websites/NodeJs/createPdfServer.js
// TODO: sqlite
const cors = require("cors");
const express = require("express");
const puppeteer = require("puppeteer");
const path = require('path');
const status = require('./status');

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

    // status(url);

    status(url, function (check) {
        console.log(check); //true
        if (check) {
            download(img, url, res) || capture(img, url, res)
        } else {
            domain = 'not'
            img = 'img/' + domain + '.png';
            download(img, url, res)
        }
    })


    /*
        try {


    } catch (err) {
        return res.status(500).json({
            success: false,
            error_message: err.message,
        });
    }*/


})

function download(img, url, res) {

    // absolute path to the file
    let p = path.join(__dirname, img);

    const fs = require("fs"); // Or `import fs from "fs";` with ESM
    if (fs.existsSync(p)) {
        console.log(`HDD: ${url}`);

        // send a png file
        res.sendFile(p);
        return true;
    }
    return false;
}

async function capture(img, url, res) {
// if(capture(img, url, res)){
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

    return true;
}


app.get("/remove", async (req, resp) => {

    console.log('remove cache');
    const fs = require("fs"); // Or `import fs from "fs";` with ESM

    //
    resp.send({});
    // resp.send(`Request rcvd: ${url}`);
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
