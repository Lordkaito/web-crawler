const puppeteer = require("puppeteer");
import getWebpage from "../index";

const URL = "https://news.ycombinator.com/";

test("gets web page", async () => {

  const webpageResult = await getWebpage();
  expect(webpageResult).toBe("test");
  return;
});
