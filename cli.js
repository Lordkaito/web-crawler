import {
  orderByCommentsWithMoreThanFiveWords,
  orderByPointsWithLessThanFiveWords,
  index,
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
  console.log("2. Get items with more than 5 words in the title (ordered by comments)");
  console.log("3. Get items with less than 5 words in the title (ordered by points)");
  console.log("4. Quit");
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

    switch (option) {
      case "1":
        const rows = await getDataFromRows(page);
        console.log(rows);
        await browser.close();
        showOptions();
        askQuestion();
        break;
      case "2":
        const rowsWithMoreThanFiveWords = orderByCommentsWithMoreThanFiveWords(
          await getDataFromRows(page)
        );
        console.log(rowsWithMoreThanFiveWords);
        await browser.close();
        showOptions();
        askQuestion();
        break;
      case "3":
        const rowsWithLessThanFiveWords = orderByPointsWithLessThanFiveWords(
          await getDataFromRows(page)
        );
        console.log(rowsWithLessThanFiveWords);
        await browser.close();
        showOptions();
        askQuestion();
        break;
      case "4":
        console.log("Bye!");
        await browser.close();
        rl.close();
        break;
    }
  });
}

showOptions();
askQuestion();