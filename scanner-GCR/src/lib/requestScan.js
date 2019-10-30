const { AxePuppeteer } = require('axe-puppeteer');
const puppeteer = require('puppeteer');
const Apify = require('apify');

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

export const crawlScan = async (url) => {
  const requestQueue = await Apify.openRequestQueue();
  await requestQueue.addRequest({ url: url });

  const crawler =  new Apify.PuppeteerCrawler({
    requestQueue,
    launchPuppeteerOptions: {
      headless:true,
      args: ["--disable-setuid-sandbox"]
    },
    maxConcurrency: 1,
    handlePageFunction: async ({request, page}) => {
      console.log("Processing " + page.url);

      await Apify.pushData({
        title: await page.title(),
        url: request.url,
        succeeded: true,
      });

      const links = await Apify.utils.enqueueLinks({
        page,
        requestQueue
      });
      if (links.length === 0)
        console.log(`${request.url} is the last page!`);
    },
    handleFailedRequestFunction: async ({request}) => {
      await Apify.pushData({
        url: request.url,
        succeeded: false,
        errors: request.errorMessages,
      });
    }
  });
  if (!crawler) {
    console.error("NO CRAWLER")
  }

  await crawler.run();
  console.log("crawler finished");
};