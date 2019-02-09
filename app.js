import findPosts from './lib/services/findPosts';
import Runner from './lib/Runner';

(new Runner()).run(findPosts,'https://www.olx.ua/uk/nedvizhimost/kvartiry-komnaty/prodazha-kvartir-komnat/kvartira/kiev/?search%5Bfilter_float_price%3Afrom%5D=500000&search%5Bfilter_float_price%3Ato%5D=800000');

// async function doJob() {
//     if (!jobs.length) return;
//     console.log('job', jobs[0]);
//     try {
//         await driver.get(jobs[0]);
//         const title = await driver.findElement(By.css('div.offer-titlebox > h1'));

//         console.log('title: ', await title.getText());
//         const text = await driver.findElement(By.id('textContent'));

//         console.log('text: ', await text.getText());
//     } finally {
//         jobs.shift();
//     }
// }

// function run() {
//     setTimeout(async () => {
//         try {
//             await doJob();
//             run();
//         } catch (e) {
//             console.error(e);
//             run();
//         }
//     }, 1000);
// }

// run();
