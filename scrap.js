import puppeteer from "puppeteer";

const URL = "https://news.ycombinator.com/";

/**
 * The function launches a headless browser, navigates to a given URL, retrieves data from rows on the
 * page, and returns the data.
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
 * The function `getDataFromRows` retrieves data from rows in a web page and returns an array of
 * objects containing the rank, title, points, and comments for each row.
 * @param page - The `page` parameter is an instance of a web page that you can interact with using a
 * headless browser, such as Puppeteer. It allows you to navigate to a URL, interact with elements on
 * the page, and extract data from the page using JavaScript code.
 * In the `getDataFromRows @returns The function `getDataFromRows` returns a promise that resolves to an array of objects. Each object represents a row in a table and contains properties such as `id`, `rank`, `title`, `points`, and `comments`.
 */
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

/**
 * The function `getArticlesWithMoreThanFiveWords` takes an array of rows and returns an array of rows
 * where the title has more than five words.
 * @param rows - An array of objects, where each object represents an article and has a "title"
 * property.
 * @returns an array of rows that have a title with more than five words.
 */
function getArticlesWithMoreThanFiveWords(rows) {
  const allRowsWithMoreThanFiveWords = rows.filter((row) => {
    const words = row.title.split(" ");
    return words.length > 5;
  });

  return allRowsWithMoreThanFiveWords;
}

/**
 * The function `orderByCommentsWithMoreThanFiveWords` sorts a list of articles based on the number of
 * comments they have, filtering out articles with less than five words.
 * @param rows - An array of objects representing articles. Each object has a "comments" property that
 * contains the comments for that article.
 * @returns a sorted array of articles that have more than five words in their comments.
 */
function orderByCommentsWithMoreThanFiveWords(rows) {
  const sorted = sortByComments(getArticlesWithMoreThanFiveWords(rows));

  return sorted;
}

/**
 * The function `getArticlesWithLessOrEqualsToFiveWords` takes an array of rows as input and returns an
 * array of rows where the title has five or fewer words.
 * @param rows - An array of objects representing articles, where each object has a "title" property
 * containing the title of the article.
 * @returns an array of rows that have a title with five or fewer words.
 */
function getArticlesWithLessOrEqualsToFiveWords(rows) {
  const allRowsWithLessThanFiveWords = rows.filter((row) => {
    const words = row.title.split(" ");
    return words.length <= 5;
  });

  return allRowsWithLessThanFiveWords;
}

/**
 * The function sorts a list of articles by their points, considering only the ones with five words or
 * less.
 * @param rows - An array of objects representing articles, where each object has properties such as
 * "title", "content", and "points".
 * @returns a sorted array of articles that have less than or equal to five words, ordered by their
 * points.
 */
function orderByPointsWithLessThanFiveWords(rows) {
  const sorted = sortByPoints(getArticlesWithLessOrEqualsToFiveWords(rows));

  return sorted;
}

/**
 * The function sorts an array of objects based on the number of comments in descending order.
 * @param rows - The `rows` parameter is an array of objects. Each object represents a row of data and
 * has a `comments` property that represents the number of comments for that row.
 * @returns the sorted array of rows, with the rows sorted in descending order based on the number of
 * comments.
 */
function sortByComments(rows) {
  return rows.sort((a, b) => {
    return b.comments - a.comments;
  });
}

/**
 * The function sorts an array of objects based on the "points" property in descending order.
 * @param rows - The `rows` parameter is an array of objects. Each object represents a row of data and
 * has a `points` property. The `points` property is a numerical value that is used to sort the rows in
 * descending order.
 * @returns the sorted array of rows, with the rows sorted in descending order based on their points
 * value.
 */
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
