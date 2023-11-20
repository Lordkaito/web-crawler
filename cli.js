import {
  getArticlesWithLessOrEqualsToFiveWords,
  getArticlesWithMoreThanFiveWords,
  orderByCommentsWithMoreThanFiveWords,
  orderByPointsWithLessThanFiveWords,
  sortByComments,
  sortByPoints,
  getDataFromRows,
} from "./scrap.js";
import puppeteer from "puppeteer";
import readline from "readline";

const URL = "https://news.ycombinator.com/";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to the Hacker News Scraper!");
function showOptions() {
  console.log("Options:");
  console.log("1. Get all items");
  console.log("2. Get items with more than 5 words in the title (unordered)");
  console.log(
    "3. Get items with less or equals to 5 words in the title (unordered)"
  );
  console.log(
    "4. Get items with less than 5 words in the title (ordered by points)"
  );
  console.log(
    "5. Get items with more than 5 words in the title (ordered by comments)"
  );
  console.log("6. Get all items (ordered by points)");
  console.log("7. Get all items (ordered by comments)");
  console.log("8. Quit");
}

function askQuestion() {
  rl.question("Select an option: ", async (option) => {
    const browser = await puppeteer.launch({
      headless: "new",
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(URL, {
      waitUntil: "domcontentloaded",
    });

    const rows = await getDataFromRows(page);

    switch (option) {
      case "1":
        console.log(rows);
        await browser.close();
        showOptions();
        askQuestion();
        break;
      case "2":
        const rowsWithMoreThanFiveWords =
          getArticlesWithMoreThanFiveWords(rows);
        console.log(rowsWithMoreThanFiveWords);
        await browser.close();
        showOptions();
        askQuestion();
        break;
      case "3":
        const rowsWithLessThanFiveWords =
          getArticlesWithLessOrEqualsToFiveWords(rows);
        console.log(rowsWithLessThanFiveWords);
        await browser.close();
        showOptions();
        askQuestion();
        break;
      case "4":
        const rowsWithLessThanFiveWordsOrderedByPoints =
          orderByPointsWithLessThanFiveWords(rows);
        console.log(rowsWithLessThanFiveWordsOrderedByPoints);
        await browser.close();
        showOptions();
        askQuestion();
        break;
      case "5":
        const rowsWithMoreThanFiveWordsOrderedByComments =
          orderByCommentsWithMoreThanFiveWords(rows);
        console.log(rowsWithMoreThanFiveWordsOrderedByComments);
        await browser.close();
        showOptions();
        askQuestion();
        break;
      case "6":
        const rowsSortedByPoints = sortByPoints(rows);
        console.log(rowsSortedByPoints);
        await browser.close();
        showOptions();
        askQuestion();
        break;
      case "7":
        const rowsSortedByComments = sortByComments(rows);
        console.log(rowsSortedByComments);
        await browser.close();
        showOptions();
        askQuestion();
        break;
      case "8":
        console.log("Bye!");
        await browser.close();
        rl.close();
        break;
    }
  });
}

showOptions();
askQuestion();
