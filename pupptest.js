const puppeteer = require('puppeteer');

const pupplogin = async () => {
    console.log('puppeteer start');

    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();

    const insta_id = "ksw75811@gmail.com";
    const insta_pw = "ghshVL1!";

    await page.goto('https://www.instagram.com/accounts/login/', {waitUntil : "networkidle2"});

    await page.type('input[name="username"]', insta_id, {delay : 10});
    await page.type('input[name="password"]', insta_pw, {delay : 10});
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    await page.goto('https://www.instagram.com/web/search/topsearch/?query=sangwon_f');
    await page.screenshot({ path: 'insta.png', fullPage:true });
    await browser.close();
}

pupplogin();

