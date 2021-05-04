// https://github.com/ynvp/botpress_bots/blob/19e67d627bcfa7162c5a83b00efdc6717dce7596/app.js
const cors = require("cors");
const express = require("express");
const puppeteer = require("puppeteer");
const path = require('path');

// Globals

const port = 3000;
var browser;

// Initializing Express and Puppeteer Browser

const app = express();

(async () => {
    browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        args: ["--no-sandbox", "--disabled-setupid-sandbox"],
    });
    console.log(await browser.version());
    console.log("Puppeteer Browser Initiated");
})();


// Middleware

app.use(cors());

// REST Endpoint
// http://webscreen.pl:3000/create/softreck.com

app.get('/create/:domain', (req, res) => {
    try {
        if (!req.params.domain) {
            throw new Error("domain is required");
        }

        var domain = req.params.domain;

        fetch(domain, (err, img) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    error_message: err.message,
                });
            }

            // absolute path to the file
            // let p = path.join(__dirname, img);
            // console.log("absolute path to the file:" + p);

            return res.status(200).json({
                success: true,
                path: img,
                local: 'http://localhost:3000/' + img,
                url: 'https://webscreen.pl/' + img,
            });
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error_message: err.message,
        });
    }
});

// http://localhost:3000/png/softreck.com
// http://webscreen.pl:3000/png/softreck.com
/*
app.get('/png/:domain', async (req, res) => {

    var img =  'png/' + req.params.domain + '.png';

    // absolute path to the file
    let p = path.join(__dirname, img);

    console.log("absolute path to the file:" + p);

    // send a png file
    res.sendFile(p);
    // res.send('Hello World!')
})

*/

async function fetch(domain, callback) {
    try {
        const page = await browser.newPage();

        const url = `https://${domain}`

        await page
            .goto(url)
            .catch((e) => {
                return callback(e);
            });

        var img = 'png/' + domain + '.png';

        await page.screenshot({path: img})

        console.log("Webscreen for:", page.url());

        await page.close();

        return callback(null, img);
    } catch (err) {
        return callback(err);
    }
}

process.on("exit", async function () {
    await browser.close();
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
