// semgrep-rules/javascript/express/security/express-puppeteer-injection.js

const express = require('express')
const app = express()
const port = 3000
const puppeteer = require('puppeteer')
const path = require('path');

// http://localhost:3000/?name=softreck.com
// http://localhost:3000/softreck.com
// http://localhost:3000/create/softreck.com

app.get('/create/:domain', async (req, res) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
// ruleid: express-puppeteer-injection
//     const url = `https://${req.query.url}`
    const url = `https://${req.params.domain}`
    await page.goto(url)

    var img =  'img/' + req.params.domain + '.png';

    await page.screenshot({path: img})
    await browser.close()


    // absolute path to the file
    let p = path.join(__dirname, img);

    // send a png file
    res.sendFile(p);
    // res.send('Hello World!')
})

// http://localhost:3000/read/softreck.com

app.get('/read/:domain', async (req, res) => {

    var img =  'img/' + req.params.domain + '.png';

    // absolute path to the file
    let p = path.join(__dirname, img);

    // send a png file
    res.sendFile(p);
    // res.send('Hello World!')
})


/*
app.post('/test', async (req, res) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
// ruleid: express-puppeteer-injection
    await page.setContent(`${req.body.foo}`)

    await page.screenshot({path: 'example.png'})
    await browser.close()

    res.send('Hello World!')
})

const controller = async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
// ruleid: express-puppeteer-injection
    const body = req.body.foo;
    await page.setContent('<html>' + body + '</html>');

    await page.screenshot({path: 'example.png'});
    await browser.close();

    res.send('Hello World!');
}

app.post('/test2', async (req, res) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
// ruleid: express-puppeteer-injection
    await page.evaluateOnNewDocument(`${req.body.foo}`)

    await page.screenshot({path: 'example.png'})
    await browser.close()

    res.send('Hello World!')
})

const controller2 = async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
// ruleid: express-puppeteer-injection
    const body = req.body.foo;
    await page.evaluate('alert(' + body + ')');

    await page.screenshot({path: 'example.png'});
    await browser.close();

    res.send('Hello World!');
}

app.post('/test2', controller)
/*
app.post('/ok-test', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
// ok
    await page.goto('https://example.com');

    await page.screenshot({path: 'example.png'});
    await browser.close();

    res.send('Hello World!');
})

const controller = async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
// ok
    const body = '<div>123</div>';
    await page.setContent('<html>' + body + '</html>');

    await page.screenshot({path: 'example.png'});
    await browser.close();

    res.send('Hello World!');
}*/

// app.post('/ok-test2', controller)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
