const  { Capabilities, Builder, By, Key, until } = require('selenium-webdriver');
// import webdriver, {Builder, By, Key, until} from 'selenium-webdriver';
const chrome = require('selenium-webdriver/chrome');

const jobs = [];
// var path = require('chromedriver').path;

console.log(0);
const url = 'https://www.olx.ua/uk/nedvizhimost/kvartiry-komnaty/prodazha-kvartir-komnat/kvartira/kiev/?search%5Bfilter_float_price%3Afrom%5D=500000&search%5Bfilter_float_price%3Ato%5D=800000';

const service = new chrome.ServiceBuilder('/mnt/e/work/olx-cli/bin/ChromeDriver.exe').build();

chrome.setDefaultService(service);
console.log(1);

const driver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

console.log(2);
(async function example() {

    try {
        await driver.get(url);
        const items = await driver.findElements(By.css('div.offer-wrapper'));

        await Promise.all(items.map(async i => {
            const link = await i.findElement(By.css('a.detailsLink'));
            const href = await link.getAttribute('href');

            jobs.push(href);
        }));
        console.log('items: ', items.length);
    } finally {
        // await driver.quit();
    }
}());

async function doJob() {
    if (!jobs.length) return;
    console.log('job', jobs[0]);
    try {
        await driver.get(jobs[0]);
        const title = await driver.findElement(By.css('div.offer-titlebox > h1'));

        console.log('title: ', await title.getText());
        const text = await driver.findElement(By.id('textContent'));

        console.log('text: ', await text.getText());
    } finally {
        jobs.shift();
    }
}

function run() {
    setTimeout(async () => {
        try {
            await doJob();
            run();
        } catch (e) {
            console.error(e);
            run();
        }
    }, 1000);
}

run();
