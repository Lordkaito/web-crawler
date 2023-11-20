import {
  getArticlesWithLessOrEqualsToFiveWords,
  getArticlesWithMoreThanFiveWords,
  orderByCommentsWithMoreThanFiveWords,
  orderByPointsWithLessThanFiveWords,
  sortByComments,
  sortByPoints,
  index,
  getDataFromRows,
} from "../scrap.js";
import puppeteer from "puppeteer";
const URL = "https://news.ycombinator.com/";

test("index only works on the correct URL", async () => {
  const wrongURL = "https://www.google.com/";
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(wrongURL, {
    waitUntil: "domcontentloaded",
  });

  const getWebpageResult = await getDataFromRows(page);
  expect(getWebpageResult).toHaveLength(0);
  await browser.close();
  return;
});

test("index gets the 30 rows", async () => {
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

test("index returns all items with the correct properties", async () => {
  const getWebpageResult = await index(URL);
  getWebpageResult.map((item) => {
    expect(item).toHaveProperty("id");
    expect(item).toHaveProperty("rank");
    expect(item).toHaveProperty("title");
    expect(item).toHaveProperty("points");
    if (item.comments !== null) {
      // this is not ideal, but I need to do this for now in case an article has no comments just yet
      expect(item).toHaveProperty("comments");
    }
  });
  return;
});

test("getArticlesWithMoreThanFiveWords returns only items with more than five words", async () => {
  const rows = await index(URL);
  const getArticlesWithMoreThanFiveWordsResult =
    getArticlesWithMoreThanFiveWords(rows);
  getArticlesWithMoreThanFiveWordsResult.map((item) => {
    const words = item.title.split(" ").length;
    expect(words).toBeGreaterThan(5);
  });
  return;
});

test("getArticlesWithLessOrEqualsToFiveWords returns only items with less than or equal to five words", async () => {
  const rows = await index(URL);
  const getArticlesWithLessOrEqualsToFiveWordsResult =
    getArticlesWithLessOrEqualsToFiveWords(rows);
  getArticlesWithLessOrEqualsToFiveWordsResult.map((item) => {
    const words = item.title.split(" ").length;
    expect(words).toBeLessThanOrEqual(5);
  });
  return;
});

test("orderByCommentsWithMoreThanFiveWords returns items ordered by comments", async () => {
  const rows = await index(URL);
  const getArticlesWithMoreThanFiveWordsResult =
    getArticlesWithMoreThanFiveWords(rows);
  const orderByCommentsWithMoreThanFiveWordsResult =
    orderByCommentsWithMoreThanFiveWords(
      getArticlesWithMoreThanFiveWordsResult
    );
  const sortedArticles = () => {
    return getArticlesWithMoreThanFiveWordsResult.sort((a, b) => {
      return b.comments - a.comments;
    });
  };

  expect(orderByCommentsWithMoreThanFiveWordsResult).toEqual(sortedArticles());

  return;
});

test("orderByPointsWithLessThanFiveWords returns items ordered by points", async () => {
  const rows = await index(URL);
  const getArticlesWithLessOrEqualsToFiveWordsResult =
    getArticlesWithLessOrEqualsToFiveWords(rows);
  const orderByPointsWithLessThanFiveWordsResult =
    orderByPointsWithLessThanFiveWords(
      getArticlesWithLessOrEqualsToFiveWordsResult
    );
  const sortedArticles = () => {
    return getArticlesWithLessOrEqualsToFiveWordsResult.sort((a, b) => {
      return b.points - a.points;
    });
  };

  expect(orderByPointsWithLessThanFiveWordsResult).toEqual(sortedArticles());

  return;
});

test("sortByComments returns items ordered by comments", async () => {
  const rows = await index(URL);
  const randomRows = [
    {
      comments: 34,
    },
    {
      comments: 78,
    },
    {
      comments: 1,
    },
    {
      comments: 478,
    },
    {
      comments: 55,
    },
    {
      comments: 609,
    },
    {
      comments: 25,
    },
    {
      comments: 9,
    },
    {
      comments: 245,
    },
    {
      comments: 100,
    },
  ];
  const orderedRandomRows = [
    {
      comments: 1,
    },
    {
      comments: 9,
    },
    {
      comments: 25,
    },
    {
      comments: 34,
    },
    {
      comments: 55,
    },
    {
      comments: 78,
    },
    {
      comments: 100,
    },
    {
      comments: 245,
    },
    {
      comments: 478,
    },
    {
      comments: 609,
    },
  ];
  const sortByCommentsResult = sortByComments(rows);
  const sortedArticles = () => {
    return rows.sort((a, b) => {
      return b.comments - a.comments;
    });
  };

  expect(sortByCommentsResult).toEqual(sortedArticles());
  expect(sortByComments(randomRows)).not.toEqual(orderedRandomRows);

  return;
});

test("sortByPoints returns items ordered by points", async () => {
  const rows = await index(URL);
  const randomRows = [
    {
      points: 34,
    },
    {
      points: 78,
    },
    {
      points: 1,
    },
    {
      points: 478,
    },
    {
      points: 55,
    },
    {
      points: 609,
    },
    {
      points: 25,
    },
    {
      points: 9,
    },
    {
      points: 245,
    },
    {
      points: 100,
    },
  ];
  const orderedRandomRows = [
    {
      points: 1,
    },
    {
      points: 9,
    },
    {
      points: 25,
    },
    {
      points: 34,
    },
    {
      points: 55,
    },
    {
      points: 78,
    },
    {
      points: 100,
    },
    {
      points: 245,
    },
    {
      points: 478,
    },
    {
      points: 609,
    },
  ];
  const sortByPointsResult = sortByPoints(rows);
  const sortedArticles = () => {
    return rows.sort((a, b) => {
      return b.points - a.points;
    });
  };

  expect(sortByPointsResult).toEqual(sortedArticles());
  expect(sortByPoints(randomRows)).not.toEqual(orderedRandomRows);

  return;
});
