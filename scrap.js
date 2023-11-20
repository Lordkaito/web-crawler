import puppeteer from "puppeteer";

const URL = "https://news.ycombinator.com/";

async function index(url) {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });
  const rows = await getDataFromRows(page);
  console.log(rows);
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
      const pointsElement = document.querySelector("#score_" + `${id}`);
      let comment = document
        .querySelector(`#score_${id}`)?.parentElement.lastElementChild.innerText.replace(/\u00a0/g, " ");
      if (!comment) {
        parsedComment = Number(0);
      } else {
        parsedComment = Number(comment.split(" ")[0]);
      }
      let points;
      if (!pointsElement) {
        points = 0;
      } else {
        points = Number(
          document.querySelector("#score_" + `${id}`).innerText.split(" ")[0]
        );
      }
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

function getArticlesWithMoreThanFiveWords(rows) {
  const allRowsWithMoreThanFiveWords = rows.filter((row) => {
    const words = row.title.split(" ");
    return words.length > 5;
  });

  return allRowsWithMoreThanFiveWords;
}

function orderByCommentsWithMoreThanFiveWords(rows) {
  const sorted = sortByComments(getArticlesWithMoreThanFiveWords(rows));

  return sorted;
}

function getArticlesWithLessOrEqualsToFiveWords(rows) {
  const allRowsWithLessThanFiveWords = rows.filter((row) => {
    const words = row.title.split(" ");
    return words.length <= 5;
  });

  return allRowsWithLessThanFiveWords;
}

function orderByPointsWithLessThanFiveWords(rows) {
  const sorted = sortByPoints(getArticlesWithLessOrEqualsToFiveWords(rows));

  return sorted;
}

function sortByComments(rows) {
  return rows.sort((a, b) => {
    return b.comments - a.comments;
  });
}

function sortByPoints(rows) {
  return rows.sort((a, b) => {
    return b.points - a.points;
  });
}

export {
  getArticlesWithLessOrEqualsToFiveWords,
  getArticlesWithMoreThanFiveWords,
  orderByCommentsWithMoreThanFiveWords,
  orderByPointsWithLessThanFiveWords,
  sortByComments,
  sortByPoints,
  index,
  getDataFromRows,
};
