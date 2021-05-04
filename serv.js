// https://github.com/ynvp/botpress_bots/blob/19e67d627bcfa7162c5a83b00efdc6717dce7596/app.js
const cors = require("cors");
const express = require("express");
const puppeteer = require("puppeteer");

// Globals

const port = 3000;
var browser;

// Initializing Express and Puppeteer Browser

const app = express();

(async () => {
    browser = await puppeteer.launch();
    console.log("Puppeteer Browser Initiated");
})();

// Middleware

app.use(cors());

// REST Endpoint

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

            return res.status(200).json({
                success: true,
                path: img,
                local: 'http://localhost:3000' + img,
                url: 'https://webportfolio.pl/' + img,
            });
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error_message: err.message,
        });
    }
});

// Student Fetcher Function

async function fetch(domain, callback) {
    try {
        const page = await browser.newPage();

        const url = `https://${domain}`

        await page
            .goto(url)
            .catch((e) => {
                return callback(e);
            });

        var img = 'img/' + domain + '.png';

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
