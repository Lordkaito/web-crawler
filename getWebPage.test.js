const puppeteer = require("puppeteer");

const URL = "https://news.ycombinator.com/";

test("gets web page", async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: "domcontentloaded" });

  expect(page.url()).toBe(URL);
  browser.close();
  return;
});
