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
// http://localhost:3000/png/www.phpfunc.com


app.get('/url/:url', async (req, res) => {

    if (!req.params.url) {
        throw new Error("domain is required");
    }

    // Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii')
    const urld = Buffer.from(req.params.url).toString('base64');
    // console.log(urld);

    var img = path.join('png',  urld + '.png');

    // var url = decodeURI(req.params.url);
    var url = req.params.url;

    try {

        status(url, function (check) {
                console.log(check); //true

                // absolute path to the file
                let p = path.join(__dirname, img);
                const fs = require("fs");
                if (fs.existsSync(p)) {
                    console.log(`HDD YES: ${url}`);

                    // send a png file
                    res.sendFile(p);
                    return true;
                } else {
                    capture(img, url, res)
                    return true;
                }

            },
            function (check) {
                console.log(check); //true
                download('', url, res);
                return false;
            }
        );

        // img = 'img/not.png';
        // download(img, url, res);

    } catch (err) {
        console.log(":::err.message:");
        console.log(err.message);
        download('', url, res);
        return false;
    }

    // img = 'img/not.png';
    // download(img, url, res);
})

// http://localhost:3000/png/softreck.com
// http://localhost:3000/png/softreck.pl

app.get('/png/:domain', async (req, res) => {

    if (!req.params.domain) {
        throw new Error("domain is required");
    }

    var domain = req.params.domain;
    var img = path.join('png',  domain + '.png');
    // var p = path.join(__dirname, 'img', 'not.png');

    var url = `https://${domain}`

    try {

        status(url, function (check) {
                console.log(check); //true
                // download(img, url, res) ||
                // absolute path to the file
                let p = path.join(__dirname, img);

                const fs = require("fs"); // Or `import fs from "fs";` with ESM
                if (fs.existsSync(p)) {
                    // send a png file
                    res.sendFile(p);
                    console.log(`HDD YES: ${url}`);
                    return true;
                } else {
                    capture(img, url, res)
                    return true;
                }
            },
            function (check) {
                console.log(check); //true
                download('', url, res);
                return false;
            }
        );


    } catch (err) {
        console.log(":::err.message:");
        console.log(err.message);
        download('', url, res);
        return false;
    }
})

/**
 * @param img
 * @param url
 * @param res
 * @returns {boolean}
 */
function download(img, url, res) {

    // absolute path to the file
    var p = path.join(__dirname, 'img', 'not.png');

    if (img.length === 0) {
        console.log(`HDD NOT: ${url}`);
    } else {
        console.log(`HDD YES: ${url}`);
        p = path.join(__dirname, img);
    }


    const fs = require("fs"); // Or `import fs from "fs";` with ESM
    if (fs.existsSync(p)) {

        // send a png file
        res.sendFile(p);
        return true;
    }
    return false;
}

/**
 *
 * @param img
 * @param url
 * @param res
 * @returns {Promise<boolean>}
 */
async function capture(img, url, res) {
// if(capture(img, url, res)){

    ///////////
    const browser = await puppeteer.launch({
        headless: false,
        ignoreDefaultArgs: ['--disable-extensions'],
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--ignore-certificate-errors'
        ]
    });

    try {
        const webPage = await browser.newPage();

        await webPage.goto(url, {
            waitUntil: "networkidle0"
        });

        const png = await webPage.screenshot({path: img});
    } catch (err) {
        console.log(err.toString());
        download('', url, res);
        await browser.close();
        return false;
    }
    await browser.close();
    ///////////


    res.contentType("image/png");
    res.send(png);
    console.log(`HTTP YES: ${url}`);

    return true;
}


app.get("/remove", async (req, resp) => {

    console.log('remove cache');
    const directory = 'png';


    const fs = require('fs');
    const path = require('path');


    fs.readdir(directory, (err, files) => {
        if (err) {
            // throw err;
            resp.send({"status": false, "message": err.message});
        }
        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) {
                    // throw err;
                    resp.send({"status": false, "message": err.message});

                }
            });
        }
    });

    resp.send({"status": true});
    // resp.send(`Request rcvd: ${url}`);
});


process.on('unhandledRejection', function (err) {
    console.log(':::unhandledRejection:');
    console.log(err);
    // sendInTheCalvary(err);

});


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})


/*
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
*/
