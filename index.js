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
  const rows = await getDataFromRows(page);

  console.log(
    rows.map((row) => {
      return row;
    })
  );
  return rows;
}

async function getDataFromRows(page) {
  return await page.evaluate(() => {
    const rows = document.querySelectorAll("tr.athing");

    return Array.from(rows).map((row) => {
      const rank = row.querySelector("td span.rank").innerText;
      const title = row.querySelector("td.title span.titleline").innerText;
      const id = row.getAttribute("id");
      const points = document
        .querySelector(`#score_${id}`)
        .innerText.split(" ")[0];
      const comment = document
        .querySelector(`#score_${id}`)
        .parentElement.lastElementChild.innerText.replace(/\u00a0/g, " ");
      const parsedComment = comment.split(" ")[0];
      return {
        id,
        rank,
        title,
        points,
        comments: parsedComment,
      };
    });
  });
}

index();
