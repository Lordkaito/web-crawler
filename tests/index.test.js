import {
  index,
  orderByPointsWithLessThanFiveWords,
  orderByCommentsWithMoreThanFiveWords,
  getDataFromRows,
} from "../index.js";
import puppeteer from "puppeteer";
const URL = "https://news.ycombinator.com/";

test("gets web page", async () => {
  const getWebpageResult = await index(URL);

  expect(getWebpageResult).toBeDefined();
  expect(getWebpageResult).not.toBeNull();
  return;
});

test("gets the 30 rows", async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(URL, {
    waitUntil: "domcontentloaded",
  });

  const getDataFromRowsResult = await getDataFromRows(page);

  expect(getDataFromRowsResult).toHaveLength(30);
  await browser.close();
  return;
});

test("all items have the correct properties", async () => {
  const getWebpageResult = await index(URL);
  getWebpageResult.map((item) => {
    expect(item).toHaveProperty("id");
    expect(item).toHaveProperty("rank");
    expect(item).toHaveProperty("title");
    expect(item).toHaveProperty("points");
    expect(item).toHaveProperty("comments");
  });
  return;
});

test("receives and orders items with more than 5 words in the title", async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(URL, {
    waitUntil: "domcontentloaded",
  });

  const getDataFromRowsResult = await getDataFromRows(page);
  const orderByCommentsWithMoreThanFiveWordsResult =
    orderByCommentsWithMoreThanFiveWords(getDataFromRowsResult);
  expect(orderByCommentsWithMoreThanFiveWordsResult).not.toBeNull();
  expect(orderByCommentsWithMoreThanFiveWordsResult).toHaveLength(18);

  await browser.close();
  return;
});

test("receives and orders items with less than or equals to 5 words in the title", async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(URL, {
    waitUntil: "domcontentloaded",
  });

  const getDataFromRowsResult = await getDataFromRows(page);
  const orderByPointsWithLessThanFiveWordsResult =
    orderByPointsWithLessThanFiveWords(getDataFromRowsResult);
  expect(orderByPointsWithLessThanFiveWordsResult).not.toBeNull();
  expect(orderByPointsWithLessThanFiveWordsResult).toHaveLength(12);
  await browser.close();
  return;
});
