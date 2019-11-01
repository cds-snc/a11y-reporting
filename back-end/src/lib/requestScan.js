const { AxePuppeteer } = require('axe-puppeteer');
const puppeteer = require('puppeteer');

export const requestScan = async (url, useGlobalPuppeteer = false) => {
  try {
    const browser = !useGlobalPuppeteer
      ? await puppeteer.launch({
          headless:true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"]
        })
      : useGlobalPuppeteer.browser;

    const page = !useGlobalPuppeteer
      ? await browser.newPage()
      : useGlobalPuppeteer.page;

    await page.setBypassCSP(true);
    await page.goto(url);
    const results = await new AxePuppeteer(page).analyze();

    await page.close();
    await browser.close();

    // log results to database
    return {violations: results.violations};
  } catch (e) {
    console.log("something happened");
    console.log(e.message);
    return false;
  }
};