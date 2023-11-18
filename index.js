import puppeteer from "puppeteer";

const URL = "https://news.ycombinator.com/";

const getWebpage = async (url) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(url);

  return url
};

export default getWebpage;