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
    }),
    orderByPointsWithMoreThanFiveWords(rows),
    orderByPointsWithLessThanFiveWords(rows)
  );
  await browser.close();
  return rows;
}

async function getDataFromRows(page) {
  return await page.evaluate(() => {
    const rows = document.querySelectorAll("tr.athing");

    return Array.from(rows).map((row) => {
      const rank = Number(row.querySelector("td span.rank").innerText);
      const title = row.querySelector("td.title span.titleline").innerText;
      const cleanTitle = title.replace(/ \([^)]*\)$/, "");
      const id = row.getAttribute("id");
      const points = Number(
        document.querySelector(`#score_${id}`).innerText.split(" ")[0]
      );
      const comment = document
        .querySelector(`#score_${id}`)
        .parentElement.lastElementChild.innerText.replace(/\u00a0/g, " ");
      let parsedComment = Number(comment.split(" ")[0]);
      if (parsedComment === "discuss") parsedComment = Number(0);
      return {
        id,
        rank,
        title: cleanTitle,
        points,
        comments: parsedComment,
      };
    });
  });
}

function orderByPointsWithMoreThanFiveWords(rows) {
  const allRowsWithMoreThanFiveWords = rows.filter((row) => {
    const words = row.title.split(" ");
    return words.length > 5;
  });

  const orderedRowsWithMoreThanFiveWords = allRowsWithMoreThanFiveWords.sort(
    (a, b) => {
      return b.comments - a.comments;
    }
  );

  return orderedRowsWithMoreThanFiveWords;
}
function orderByPointsWithLessThanFiveWords(rows) {
  const allRowsWithLessThanFiveWords = rows.filter((row) => {
    const words = row.title.split(" ");
    return words.length < 5;
  });

  const orderedRowsWithLessThanFiveWords = allRowsWithLessThanFiveWords.sort(
    (a, b) => {
      return b.points - a.points;
    }
  );

  return orderedRowsWithLessThanFiveWords;
}

index();
