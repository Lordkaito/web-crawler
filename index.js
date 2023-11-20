import puppeteer from "puppeteer";

const URL = "https://news.ycombinator.com/";

/**
 * The function launches a headless browser, navigates to a given URL, retrieves data from rows on the page, and returns the data.
 * @param url - The `url` parameter is the URL of the webpage that you want to scrape data from.
 * @returns the data extracted from the rows on the web page.
 */
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

  await browser.close();
  return rows;
}

/**
 * The function `getDataFromRows` retrieves data from a web page by selecting specific elements and extracting relevant information from them.
 * @param page - The `page` parameter is an instance of a web page that you can interact with using a headless browser, such as Puppeteer. It allows you to navigate to a URL, interact with elements on the page, and extract data from the page using JavaScript. In the `getDataFromRows`
 * @returns The function `getDataFromRows` returns a promise that resolves to an array of objects. Each object represents a row in a table and contains properties such as `id`, `rank`, `title`, `points`,
 * and `comments`.
 */
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

/**
 * The function `orderByCommentsWithMoreThanFiveWords` takes an array of rows, filters out the rows with titles containing more than five words, and then sorts the remaining rows in descending order based on the number of comments.
 * @param rows - An array of objects, where each object represents a row of data. Each object has a "title" property (string) and a "comments" property (number).
 * @returns an array of rows that have titles with more than five words, ordered by the number of comments in descending order.
 */
function orderByCommentsWithMoreThanFiveWords(rows) {
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

/**
 * The function takes an array of rows, filters out the rows with titles containing less than or equal to five words, and then sorts the remaining rows in descending order based on their points.
 * @param rows - An array of objects representing rows, where each object has a "title" property and a "points" property.
 * @returns an array of rows that have titles with less than or equal to five words, sorted in descending order based on their points.
 */
function orderByPointsWithLessThanFiveWords(rows) {
  const allRowsWithLessThanFiveWords = rows.filter((row) => {
    const words = row.title.split(" ");
    return words.length <= 5;
  });

  const orderedRowsWithLessThanFiveWords = allRowsWithLessThanFiveWords.sort(
    (a, b) => {
      return b.points - a.points;
    }
  );

  return orderedRowsWithLessThanFiveWords;
}

index(URL);

export {
  orderByCommentsWithMoreThanFiveWords,
  orderByPointsWithLessThanFiveWords,
  index,
  getDataFromRows,
};
