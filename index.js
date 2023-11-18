import puppeteer from "puppeteer";

const URL = "https://news.ycombinator.com/";

async function index() {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(URL, {
    waitUntil: "domcontentloaded",
  });
  const rows = await getRows(page);
  const points = await getPoints(page);
  const comments = await getComments(page);

  console.log(
    rows,
    points,
    comments,
    rows.map((row) => {
      return row.rank;
    })
  );
  return rows;
}

async function getRows(page) {
  return await page.evaluate(() => {
    const rows = document.querySelectorAll("tr.athing");

    return Array.from(rows).map((row) => {
      const rank = row.querySelector("td span.rank").innerText;
      const title = row.querySelector("td.title span.titleline").innerText;
      const id = row.getAttribute("id");
      return {
        rank,
        title,
        id,
      };
    });
  });
}

async function getPoints(page) {
  return await page.evaluate(() => {
    const points = document.querySelectorAll("td.subtext span.score");

    return Array.from(points).map((point) => {
      return point.innerText;
    });
  });
}

async function getComments(page) {
  return await page.evaluate(() => {
    const comments = document.querySelectorAll("td.subtext a:last-child");

    return Array.from(comments).map((comment) => {
      return comment.innerText;
    });
  });
}

index();
