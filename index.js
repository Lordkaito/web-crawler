/* The code is importing the `index` function from the `scrap.js` file. It then assigns the URL
"https://news.ycombinator.com/" to the constant variable `URL`. Finally, it logs the result of
calling the `index` function with the `URL` as an argument using `console.log`. The `await` keyword
suggests that the `index` function is an asynchronous function that returns a promise. */
import { index } from "./scrap.js";
const URL = "https://news.ycombinator.com/";
console.log(await index(URL))