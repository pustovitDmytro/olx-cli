import { URL } from 'url';
import driver from '../driver';
import Post from '../models/Post';
import Runner from '../Runner';
import sequelize from '../sequelize';

const findPostsRunner = new Runner();

const  { By } = require('selenium-webdriver');

export default async function findPosts(url) {
    try {
        await driver.get(url);
        const items = await driver.findElements(By.css('div.offer-wrapper'));
        const transaction = await sequelize.transaction();
        const urls = await Promise.all(items.map(async i => {
            const link = await i.findElement(By.css('a.detailsLink'));
            const href = await link.getAttribute('href');
            const { pathname } = new URL(href);


            return pathname;
        }));
        const postsInDb = await Post.findAll();
        const linksInDb = postsInDb.map(p => p.link);
        const newLinks = [ ...new Set(urls) ]
            .filter(u => u && !linksInDb.find(l => l === u))
            .map(u => ({ link: u }));

        if (newLinks.length) {
            await Post.bulkCreate(newLinks);
        }
        const nextPageSpan = await driver.findElement(By.css('span.fbold.next.abs.large'));
        const nextPageLink = await nextPageSpan.findElement(By.tagName('a'));

        if (nextPageLink) {
            const nextPageUrl = await nextPageLink.getAttribute('href');

            setTimeout(() => {
                findPostsRunner.run(findPosts, nextPageUrl);
            }, 1000);
        } else {
            await driver.quit();
        }
    } catch (error) {
        await driver.quit();
        throw error;
    }
}
